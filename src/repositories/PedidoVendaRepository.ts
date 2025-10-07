import { BaseRepository } from './BaseRepository';
import { PedidoVenda, PedidoVendaItem, PedidoVendaAnexo } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class PedidoVendaRepository extends BaseRepository<PedidoVenda> {
  constructor() {
    super('pedidos_venda');
  }

  protected createEntity(data: any): PedidoVenda {
    return data as PedidoVenda;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: PedidoVenda[]; count: number }> {
    // Otimizado: Carrega apenas os campos necessários para a listagem.
    const selectString = `
      id, numero, data_venda, valor_total, status,
      cliente:clientes!cliente_id ( id, nome )
    `;
    const { data: pedidosData, count } = await super.findAll(options, selectString);

    if (!pedidosData || pedidosData.length === 0) return { data: [], count: 0 };
    
    // Inicializa 'itens' como array vazio para evitar erros na UI
    pedidosData.forEach(p => {
      p.itens = [];
    });
    
    return {
      data: pedidosData,
      count: count || 0,
    };
  }

  async createWithItems(
    pedidoData: Partial<Omit<PedidoVenda, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<PedidoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]
  ): Promise<PedidoVenda> {
    const pedidoParaInserir = camelToSnake(pedidoData);

    const { data: newPedido, error: pedidoError } = await this.supabase
      .from(this.tableName)
      .insert(pedidoParaInserir)
      .select()
      .single();

    this.handleError('createWithItems (pedido)', pedidoError);
    if (!newPedido) throw new Error('Falha ao criar o cabeçalho do pedido.');

    if (itensData && itensData.length > 0) {
      const itensParaInserir = itensData.map(item => ({
        ...camelToSnake(item),
        pedido_id: newPedido.id,
      }));

      const { error: itensError } = await this.supabase
        .from('pedido_venda_itens')
        .insert(itensParaInserir);

      this.handleError('createWithItems (itens)', itensError);
    }

    const createdPedido = await this.findById(newPedido.id);
    if (!createdPedido) throw new Error('Não foi possível recarregar o pedido após a criação.');

    return createdPedido;
  }

  async findById(id: string): Promise<PedidoVenda | null> {
    const { data: pedidoData, error: pedidoError } = await this.supabase
      .from(this.tableName)
      .select('*, cliente:clientes!cliente_id(id, nome), vendedor:vendedores!vendedor_id(id, nome)')
      .eq('id', id)
      .single();

    if (pedidoError && pedidoError.code !== 'PGRST116') {
      this.handleError('findById (pedido)', pedidoError);
    }
    if (!pedidoData) return null;

    const pedido = snakeToCamel(pedidoData) as PedidoVenda;

    const { data: itensData, error: itensError } = await this.supabase
      .from('pedido_venda_itens')
      .select('*')
      .eq('pedido_id', id);
    this.handleError('findById (itens)', itensError);
    pedido.itens = snakeToCamel(itensData || []) as PedidoVendaItem[];

    const { data: anexosData, error: anexosError } = await this.supabase
      .from('pedido_venda_anexos')
      .select('*')
      .eq('pedido_id', id);
    this.handleError('findById (anexos)', anexosError);
    pedido.anexos = snakeToCamel(anexosData || []) as PedidoVendaAnexo[];
    
    return pedido;
  }
}
