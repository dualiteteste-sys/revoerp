import { BaseRepository } from './BaseRepository';
import { CategoriaFinanceira } from '../types';
import { ICategoriaFinanceiraRepository } from './interfaces';

export class CategoriaFinanceiraRepository extends BaseRepository<CategoriaFinanceira> implements ICategoriaFinanceiraRepository {
  constructor() {
    super('categorias_financeiras');
  }

  protected createEntity(data: Omit<CategoriaFinanceira, 'id' | 'createdAt' | 'updatedAt'>): CategoriaFinanceira {
    return {
      ...data,
      id: '',
      ativo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
