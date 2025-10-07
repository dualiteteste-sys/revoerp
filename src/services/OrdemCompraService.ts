import { OrdemCompra, OrdemCompraItem } from '../types';
import { IOrdemCompraService } from './interfaces';
import { IOrdemCompraRepository } from '../repositories/interfaces';

export class OrdemCompraService implements IOrdemCompraService {
  public repository: IOrdemCompraRepository;

  constructor(repository: IOrdemCompraRepository) {
    this.repository = repository;
  }

  static calculateTotals(ordem: Partial<OrdemCompra>): Pick<OrdemCompra, 'totalProdutos' | 'totalIpi' | 'totalGeral'> {
    const itens = ordem.itens || [];
    const totalProdutos = itens.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario), 0);
    const totalIpi = itens.reduce((acc, item) => acc + (item.quantidade * item.precoUnitario * ((item.ipi || 0) / 100)), 0);
    
    const descontoValor = ordem.desconto?.includes('%') 
      ? totalProdutos * (parseFloat(ordem.desconto) / 100)
      : parseFloat(ordem.desconto || '0');
      
    const totalGeral = totalProdutos - descontoValor + (ordem.frete || 0) + totalIpi + (ordem.totalIcmsSt || 0);

    return {
      totalProdutos,
      totalIpi,
      totalGeral,
    };
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: OrdemCompra[]; count: number }> {
    return this.repository.findAll(options);
  }

  async createWithItems(
    ordemData: Partial<Omit<OrdemCompra, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<OrdemCompraItem, 'id' | 'createdAt' | 'updatedAt' | 'ordemCompraId'>[]
  ): Promise<OrdemCompra> {
    return (this.repository as any).createWithItems(ordemData, itensData);
  }
}
