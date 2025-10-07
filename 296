import { ProdutoComEstoque, EstoqueMovimento } from '../types';
import { IEstoqueService } from './interfaces';
import { IEstoqueRepository } from '../repositories/interfaces';

export class EstoqueService implements IEstoqueService {
  private repository: IEstoqueRepository;

  constructor(repository: IEstoqueRepository) {
    this.repository = repository;
  }

  async getProdutosComEstoque(options: { page?: number; pageSize?: number } = {}): Promise<{ data: ProdutoComEstoque[]; count: number }> {
    return this.repository.findAll(options);
  }

  async getHistoricoProduto(produtoId: string): Promise<EstoqueMovimento[]> {
    return this.repository.findHistoryByProductId(produtoId);
  }

  async createMovimento(movimento: Omit<EstoqueMovimento, 'id' | 'createdAt' | 'updatedAt'>): Promise<EstoqueMovimento> {
    return this.repository.createMovimento(movimento);
  }
}
