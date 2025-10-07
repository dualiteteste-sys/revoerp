import { BaseRepository } from './BaseRepository';
import { OrdemCompra, OrdemCompraItem } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class OrdemCompraRepository extends BaseRepository<OrdemCompra> {
  constructor() {
    super('ordens_compra');
  }

  protected createEntity(data: any): OrdemCompra {
    return data as OrdemCompra;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: OrdemCompra[]; count: number }> {
    const selectString = 'id, numero, data_compra, total_geral, status, fornecedor:clientes!fornecedor_id(id, nome)';
    return super.findAll(options, selectString);
  }

  async createWithItems(
    ordemData: Partial<Omit<OrdemCompra, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<OrdemCompraItem, 'id' | 'createdAt' | 'updatedAt' | 'ordemCompraId'>[]
  ): Promise<OrdemCompra> {
    const ordemParaInserir = camelToSnake(ordemData);

    const { data: newOrdem, error: ordemError } = await this.supabase
      .from(this.tableName)
      .insert(ordemParaInserir)
      .select()
      .single();

    this.handleError('createWithItems (ordem)', ordemError);
    if (!newOrdem) throw new Error('Falha ao criar o cabeçalho da ordem de compra.');

    if (itensData && itensData.length > 0) {
      const itensParaInserir = itensData.map(item => ({
        ...camelToSnake(item),
        ordem_compra_id: newOrdem.id,
      }));

      const { error: itensError } = await this.supabase
        .from('ordem_compra_itens')
        .insert(itensParaInserir);

      this.handleError('createWithItems (itens)', itensError);
    }

    const createdOrdem = await this.findById(newOrdem.id);
    if (!createdOrdem) throw new Error('Não foi possível recarregar a ordem de compra após a criação.');

    return createdOrdem;
  }

  async findById(id: string): Promise<OrdemCompra | null> {
    const { data: ordemData, error: ordemError } = await this.supabase
      .from(this.tableName)
      .select('*, fornecedor:clientes!fornecedor_id(id, nome)')
      .eq('id', id)
      .single();

    if (ordemError && ordemError.code !== 'PGRST116') {
      this.handleError('findById (ordem)', ordemError);
    }
    if (!ordemData) return null;

    const ordem = snakeToCamel(ordemData) as OrdemCompra;

    const { data: itensData, error: itensError } = await this.supabase
      .from('ordem_compra_itens')
      .select('*')
      .eq('ordem_compra_id', id);
    this.handleError('findById (itens)', itensError);
    ordem.itens = snakeToCamel(itensData || []) as OrdemCompraItem[];
    
    return ordem;
  }
}
