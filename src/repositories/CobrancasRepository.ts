import { BaseRepository } from './BaseRepository';
import { ContaReceber, Contrato } from '../types';
import { snakeToCamel } from '../lib/utils';

export interface VisaoCobranca {
  clienteId: string;
  clienteNome: string;
  clienteTelefone: string;
  valorTotal: number;
  contratosCount: number;
  dataVencimento: Date;
  statusIntegracao: 'pendente' | 'enviado' | 'erro'; // Simplificado
}

export class CobrancasRepository extends BaseRepository<ContaReceber> {
  constructor() {
    super('contas_receber');
  }

  protected createEntity(data: any): ContaReceber {
    return data as ContaReceber;
  }

  async getVisaoCobrancas(competencia: string): Promise<VisaoCobranca[]> {
    const [ano, mes] = competencia.split('-').map(Number);

    const { data, error } = await this.supabase.rpc('get_visao_cobrancas', {
      p_ano: ano,
      p_mes: mes,
    });

    this.handleError('getVisaoCobrancas', error);
    return (snakeToCamel(data) as VisaoCobranca[]) || [];
  }

  async getContratosParaFaturar(competencia: string): Promise<Contrato[]> {
    const [ano, mes] = competencia.split('-').map(Number);
    
    // Otimizado: Chama a função RPC que filtra os contratos diretamente no banco de dados.
    const { data, error } = await this.supabase.rpc('get_contratos_para_faturar', {
      p_ano: ano,
      p_mes: mes,
    });
    
    this.handleError('getContratosParaFaturar', error);
    return (snakeToCamel(data) as Contrato[]) || [];
  }
}
