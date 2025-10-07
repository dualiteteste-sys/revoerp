import { PedidoVenda, PedidoVendaItem } from '../types';
import { IPedidoVendaService } from './interfaces';
import { IPedidoVendaRepository } from '../repositories/interfaces';

export class PedidoVendaService implements IPedidoVendaService {
  public repository: IPedidoVendaRepository;

  constructor(repository: IPedidoVendaRepository) {
    this.repository = repository;
  }

  static calculateTotals(pedido: Partial<PedidoVenda>): Pick<PedidoVenda, 'totalProdutos' | 'valorTotal' | 'pesoBruto' | 'pesoLiquido'> {
    const itens = pedido.itens || [];
    const totalProdutos = itens.reduce((acc, item) => acc + (item.valorTotal || 0), 0);
    
    const descontoValor = pedido.desconto?.includes('%')
      ? totalProdutos * (parseFloat(pedido.desconto) / 100)
      : parseFloat(pedido.desconto || '0');
      
    const valorTotal = totalProdutos - descontoValor + (pedido.freteCliente || 0) + (pedido.despesas || 0);

    const pesoBruto = itens.reduce((acc, item) => acc + ((item as any).produto?.pesoBruto || 0) * item.quantidade, 0);
    const pesoLiquido = itens.reduce((acc, item) => acc + ((item as any).produto?.pesoLiquido || 0) * item.quantidade, 0);

    return {
      totalProdutos,
      valorTotal,
      pesoBruto,
      pesoLiquido,
    };
  }

  async getAllPedidosVenda(options: { page?: number; pageSize?: number } = {}): Promise<{ data: PedidoVenda[]; count: number }> {
    return this.repository.findAll(options);
  }

  async createPedidoVenda(
    pedidoData: Partial<Omit<PedidoVenda, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<PedidoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]
  ): Promise<PedidoVenda> {
    return (this.repository as any).createWithItems(pedidoData, itensData);
  }
}
