import { BaseRepository } from './BaseRepository';
import { FaturaVenda } from '../types';

export class FaturaVendaRepository extends BaseRepository<FaturaVenda> {
  constructor() {
    super('faturas_venda');
  }

  protected createEntity(data: any): FaturaVenda {
    return data as FaturaVenda;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: FaturaVenda[]; count: number }> {
    const selectString = `
      id, numero_fatura, data_emissao, data_vencimento, valor_total, status,
      pedido:pedidos_venda!pedido_id (
        id,
        numero,
        cliente:clientes!cliente_id ( id, nome )
      )
    `;
    return super.findAll(options, selectString);
  }
}
