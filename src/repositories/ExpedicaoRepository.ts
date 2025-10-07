import { BaseRepository } from './BaseRepository';
import { Expedicao, ExpedicaoPedido, PedidoVenda, StatusPedidoVenda } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class ExpedicaoRepository extends BaseRepository<Expedicao> {
  constructor() {
    super('expedicoes');
  }

  protected createEntity(data: any): Expedicao {
    return data as Expedicao;
  }

  async findPedidosParaExpedir(formaEnvio: string, incluirSemForma: boolean): Promise<PedidoVenda[]> {
    let query = this.supabase
      .from('pedidos_venda')
      .select('*, cliente:clientes(id, nome)')
      .eq('status', StatusPedidoVenda.ABERTO)
      .eq('expedido', false);

    if (!incluirSemForma) {
      query = query.eq('forma_envio', formaEnvio);
    } else {
      query = query.or(`forma_envio.eq.${formaEnvio},forma_envio.is.null,forma_envio.eq.Não definida`);
    }

    const { data, error } = await query.order('created_at', { ascending: true });
    
    this.handleError('findPedidosParaExpedir', error);
    return snakeToCamel(data || []) as PedidoVenda[];
  }

  async createExpedicao(expedicaoData: Omit<Expedicao, 'id' | 'createdAt' | 'updatedAt'>, pedidoIds: string[]): Promise<Expedicao> {
    const newExpedicao = await super.create(expedicaoData);

    if (pedidoIds.length > 0) {
      const expedicaoPedidos = pedidoIds.map(pedidoId => ({
        expedicao_id: newExpedicao.id,
        pedido_venda_id: pedidoId,
      }));

      const { error: linkError } = await this.supabase
        .from('expedicao_pedidos')
        .insert(expedicaoPedidos);
      
      this.handleError('createExpedicao (link pedidos)', linkError);
      
      // Marcar pedidos como expedidos
      const { error: updateError } = await this.supabase
        .from('pedidos_venda')
        .update({ expedido: true })
        .in('id', pedidoIds);

      this.handleError('createExpedicao (update pedidos)', updateError);
    }

    return newExpedicao;
  }
}
