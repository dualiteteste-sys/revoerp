import { ContaPagar, StatusContaPagar, ContaPagarAnexo, TipoMovimentoCaixa } from '../types';
import { IContasPagarService } from './interfaces';
import { IContasPagarRepository, IFluxoCaixaRepository } from '../repositories/interfaces';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class ContasPagarService implements IContasPagarService {
  private repository: IContasPagarRepository;
  private fluxoCaixaRepository: IFluxoCaixaRepository;

  constructor(repository: IContasPagarRepository, fluxoCaixaRepository: IFluxoCaixaRepository) {
    this.repository = repository;
    this.fluxoCaixaRepository = fluxoCaixaRepository;
  }

  async getAllContasPagar(): Promise<ContaPagar[]> {
    return this.repository.findAll();
  }
  
  async createContaPagar(data: Partial<Omit<ContaPagar, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ContaPagar> {
    const contaParaCriar = {
      ...data,
      fornecedorId: data.fornecedorId || null,
      status: StatusContaPagar.A_PAGAR,
    };
    return this.repository.create(contaParaCriar as any);
  }

  async updateContaPagar(id: string, data: Partial<ContaPagar>): Promise<ContaPagar> {
    return this.repository.update(id, data);
  }

  async liquidarConta(id: string): Promise<ContaPagar> {
    const conta = await this.repository.findById(id);
    if (!conta) throw new Error('Conta a pagar não encontrada.');
    if (conta.status === StatusContaPagar.PAGO) throw new Error('Esta conta já foi paga.');

    const updatedConta = await this.repository.update(id, {
      status: StatusContaPagar.PAGO,
      dataPagamento: new Date(),
    });

    await this.fluxoCaixaRepository.create({
      data: new Date(),
      descricao: `Pagamento: ${conta.descricao || `Conta para ${conta.fornecedor?.nome}`}`,
      valor: conta.valor,
      tipo: TipoMovimentoCaixa.SAIDA,
      contaPagarId: conta.id,
    } as any);

    return updatedConta;
  }

  async uploadAnexo(contaId: string, file: File): Promise<ContaPagarAnexo> {
    const filePath = await this.repository.uploadAnexo(contaId, file);
    
    const anexoData = {
      contaPagarId: contaId,
      nomeArquivo: file.name,
      path: filePath,
      tamanho: file.size,
      tipo: file.type,
    };
    const { data: newAnexo, error } = await this.repository.supabase
      .from('contas_pagar_anexos')
      .insert(camelToSnake(anexoData))
      .select()
      .single();

    if (error) {
      await this.repository.supabase.storage.from('anexos-financeiro').remove([filePath]);
      throw new Error(error.message);
    }
    
    return snakeToCamel(newAnexo) as ContaPagarAnexo;
  }

  async deleteAnexo(anexoId: string, filePath: string): Promise<void> {
    return this.repository.deleteAnexo(anexoId, filePath);
  }

  getAnexoPublicUrl(filePath: string): string {
    const { data } = this.repository.supabase.storage
      .from('anexos-financeiro')
      .getPublicUrl(filePath);
    return data.publicUrl;
  }
}
