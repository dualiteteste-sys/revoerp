import { CategoriaFinanceiraRepository } from '../../repositories/CategoriaFinanceiraRepository';
import { CategoriaFinanceiraService } from '../CategoriaFinanceiraService';
import { ICategoriaFinanceiraService } from '../interfaces';

export const createCategoriaFinanceiraService = (): ICategoriaFinanceiraService => {
  const repository = new CategoriaFinanceiraRepository();
  return new CategoriaFinanceiraService(repository);
};
