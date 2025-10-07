import { ICobrancasService } from './interfaces';
import { ICobrancasRepository, IContasReceberRepository } from '../repositories/interfaces';
import { VisaoCobranca } from '../repositories/CobrancasRepository';
import { StatusContaReceber, OcorrenciaConta } from '../types';
import { camelToSnake } from '../lib/utils';

export class CobrancasService implements ICobrancasService {
  private cobrancasRepository: ICobrancasRepository;
  private contasReceberRepository: IContasReceberRepository;

  constructor(cobrancasRepository: ICobrancasRepository, contasReceberRepository: IContasReceberRepository) {
    this.cobrancasRepository = cobrancasRepository;
    this.contasReceberRepository = contasReceberRepository;
  }

  async getVisaoCobrancas(competencia: string): Promise<VisaoCobranca[]> {
    // Otimizado: Chama a função RPC do banco de dados que já faz o trabalho pesado.
    return this.cobrancasRepository.getVisaoCobrancas(competencia);
  }

  async gerarCobrancas(competencia: string): Promise<{ geradas: number; existentes: number }> {
    const [ano, mes] = competencia.split('-').map(Number);
    
    // Otimizado: Busca apenas contratos e contas relevantes para a competência.
    const contratosAtivos = await this.cobrancasRepository.getContratosParaFaturar(competencia);
    const contasExistentes = await this.contasReceberRepository.findByCompetencia(competencia);
    const contasExistentesSet = new Set(contasExistentes.map(c => c.contratoId));

    const novasContas = [];
    let existentesCount = 0;

    for (const contrato of contratosAtivos) {
      if (contasExistentesSet.has(contrato.id)) {
        existentesCount++;
        continue;
      }

      let diaVencimento = contrato.diaVencimento;
      const ultimoDiaDoMes = new Date(ano, mes, 0).getDate();
      if (diaVencimento > ultimoDiaDoMes) {
        diaVencimento = ultimoDiaDoMes;
      }

      const dataVencimento = new Date(ano, mes - 1, diaVencimento);

      const novaConta = {
        clienteId: contrato.clienteId,
        contratoId: contrato.id,
        descricao: `Mensalidade Contrato: ${contrato.descricao}`,
        valor: contrato.valor,
        dataVencimento: dataVencimento,
        status: StatusContaReceber.A_RECEBER,
        ocorrencia: OcorrenciaConta.RECORRENTE,
        formaRecebimento: contrato.formaRecebimento || 'Boleto',
        categoriaId: contrato.categoriaId,
      };
      novasContas.push(novaConta);
    }

    if (novasContas.length > 0) {
      // Usando a propriedade `supabase` do repositório para inserir em lote.
      const { error } = await this.contasReceberRepository.supabase
        .from('contas_receber')
        .insert(novasContas.map(c => camelToSnake(c)));
      
      if (error) {
        console.error("Erro ao inserir novas contas: ", error);
        throw new Error(error.message);
      }
    }

    return { geradas: novasContas.length, existentes: existentesCount };
  }

  async enviarBoletos(cobrancasIds: string[]): Promise<void> {
    // Lógica para enviar boletos (simulada)
    console.log('Enviando boletos para as cobranças:', cobrancasIds);
    // Simula um processo demorado
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}
