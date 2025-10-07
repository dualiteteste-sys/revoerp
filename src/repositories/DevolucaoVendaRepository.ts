import { BaseRepository } from './BaseRepository';
import { DevolucaoVenda, DevolucaoVendaItem } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class DevolucaoVendaRepository extends BaseRepository<DevolucaoVenda> {
  constructor() {
    super('devolucoes_venda');
  }

  protected createEntity(data: any): DevolucaoVenda {
    return data as DevolucaoVenda;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: DevolucaoVenda[]; count: number }> {
    const selectString = `
      id, numero, data_devolucao, valor_total_devolvido,
      cliente:clientes!cliente_id ( id, nome ),
      pedidoVenda:pedidos_venda!pedido_venda_id ( id, numero )
    `;
    return super.findAll(options, selectString);
  }

  async createWithItems(
    devolucaoData: Omit<DevolucaoVenda, 'id' | 'createdAt' | 'updatedAt' | 'itens'>,
    itensData: Omit<DevolucaoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'devolucaoVendaId'>[]
  ): Promise<DevolucaoVenda> {
    const devolucaoParaInserir = camelToSnake(devolucaoData);

    const { data: newDevolucao, error: devolucaoError } = await this.supabase
      .from(this.tableName)
      .insert(devolucaoParaInserir)
      .select()
      .single();

    this.handleError('createWithItems (devolucao)', devolucaoError);
    if (!newDevolucao) throw new Error('Falha ao criar o cabeçalho da devolução.');

    if (itensData && itensData.length > 0) {
      const itensParaInserir = itensData.map(item => ({
        ...camelToSnake(item),
        devolucao_venda_id: newDevolucao.id,
      }));

      const { error: itensError } = await this.supabase
        .from('devolucao_venda_itens')
        .insert(itensParaInserir);

      this.handleError('createWithItems (itens)', itensError);
    }

    return snakeToCamel(newDevolucao) as DevolucaoVenda;
  }
}
