import { BaseRepository } from './BaseRepository';
import { FluxoCaixa } from '../types';

export class FluxoCaixaRepository extends BaseRepository<FluxoCaixa> {
  constructor() {
    super('fluxo_caixa');
  }

  protected createEntity(data: any): FluxoCaixa {
    return data as FluxoCaixa;
  }

  async findAll(): Promise<FluxoCaixa[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('id, data, descricao, valor, tipo')
      .order('data', { ascending: false });
      
    this.handleError('findAll', error);
    return (data as FluxoCaixa[]) || [];
  }
}
