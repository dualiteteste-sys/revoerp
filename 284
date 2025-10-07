import { CategoriaFinanceira } from '../types';
import { ICategoriaFinanceiraService } from './interfaces';
import { ICategoriaFinanceiraRepository } from '../repositories/interfaces';

export class CategoriaFinanceiraService implements ICategoriaFinanceiraService {
  public repository: ICategoriaFinanceiraRepository;

  constructor(repository: ICategoriaFinanceiraRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: CategoriaFinanceira[]; count: number }> {
    return this.repository.findAll(options);
  }

  async findById(id: string): Promise<CategoriaFinanceira | null> {
    return this.repository.findById(id);
  }

  async create(data: Omit<CategoriaFinanceira, 'id' | 'createdAt' | 'updatedAt'>): Promise<CategoriaFinanceira> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<CategoriaFinanceira>): Promise<CategoriaFinanceira> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
