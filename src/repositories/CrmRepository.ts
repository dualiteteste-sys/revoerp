import { BaseRepository } from './BaseRepository';
import { CrmOportunidade } from '../types';
import { snakeToCamel } from '../lib/utils';

export class CrmRepository extends BaseRepository<CrmOportunidade> {
  constructor() {
    super('crm_oportunidades');
  }

  protected createEntity(data: any): CrmOportunidade {
    return data as CrmOportunidade;
  }

  async findAll(): Promise<CrmOportunidade[]> {
    const selectString = `
      id, titulo, etapa, valor_estimado,
      cliente:clientes ( id, nome )
    `;
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(selectString)
      .order('created_at', { ascending: false });

    this.handleError(`findAll`, error);
    
    // Mapeia `titulo` para `nome` para compatibilidade com o frontend
    const oportunidades = (snakeToCamel(data) || []).map((op: any) => ({
      ...op,
      nome: op.titulo,
    }));

    return oportunidades as CrmOportunidade[];
  }
}
