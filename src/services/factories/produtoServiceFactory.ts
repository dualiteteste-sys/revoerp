import { ProdutoRepository } from '../../repositories/ProdutoRepository';
import { ProdutoService } from '../ProdutoService';
import { IProdutoService } from '../interfaces';

export const createProdutoService = (): IProdutoService => {
  const repository = new ProdutoRepository();
  return new ProdutoService(repository);
};
