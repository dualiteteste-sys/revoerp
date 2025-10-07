import { ContaReceber, StatusContaReceber, ContaReceberAnexo, TipoMovimentoCaixa } from '../types';
import { IContasReceberService } from './interfaces';
import { IContasReceberRepository, IFluxoCaixaRepository } from '../repositories/interfaces';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class ContasReceberService implements IContasReceberService {
  private repository: IContasReceberRepository;
  private fluxoCaixaRepository: IFluxoCaixaRepository;

  constructor(repository: IContasReceberRepository, fluxoCaixaRepository: IFluxoCaixaRepository) {
    this.repository = repository;
    this.fluxoCaixaRepository = fluxoCaixaRepository;
  }

  async getAllContasReceber(options: { page?: number; pageSize?: number } = {}): Promise<{ data: ContaReceber[]; count: number }> {
    return this.repository.findAll(options);
  }

  async createContaReceber(data: Partial<Omit<ContaReceber, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ContaReceber> {
    const contaParaCriar = {
      ...data,
      clienteId: data.clienteId || null,
      status: StatusContaReceber.A_RECEBER,
    };
    return this.repository.create(contaParaCriar as any);
  }

  async updateContaReceber(id: string, data: Partial<ContaReceber>): Promise<ContaReceber> {
    return this.repository.update(id, data);
  }

  async liquidarConta(id: string): Promise<ContaReceber> {
    const conta = await this.repository.findById(id);
    if (!conta) throw new Error('Conta a receber não encontrada.');
    if (conta.status === StatusContaReceber.RECEBIDO) throw new Error('Esta conta já foi recebida.');

    const updatedConta = await this.repository.update(id, {
      status: StatusContaReceber.RECEBIDO,
      dataPagamento: new Date(),
    });

    await this.fluxoCaixaRepository.create({
      data: new Date(),
      descricao: `Recebimento: ${conta.descricao || `Fatura de ${conta.cliente?.nome}`}`,
      valor: conta.valor,
      tipo: TipoMovimentoCaixa.ENTRADA,
      contaReceberId: conta.id,
    } as any);

    return updatedConta;
  }
  
  async uploadAnexo(contaId: string, file: File): Promise<ContaReceberAnexo> {
    const filePath = await this.repository.uploadAnexo(contaId, file);
    
    const anexoData = {
      contaReceberId: contaId,
      nomeArquivo: file.name,
      path: filePath,
      tamanho: file.size,
      tipo: file.type,
    };
    const { data: newAnexo, error } = await this.repository.supabase
      .from('contas_receber_anexos')
      .insert(camelToSnake(anexoData))
      .select()
      .single();

    if (error) {
      await this.repository.supabase.storage.from('anexos-financeiro').remove([filePath]);
      throw new Error(error.message);
    }
    
    return snakeToCamel(newAnexo) as ContaReceberAnexo;
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
