import { EstoqueRepository } from '../../repositories/EstoqueRepository';
import { EstoqueService } from '../EstoqueService';
import { IEstoqueService } from '../interfaces';

export const createEstoqueService = (): IEstoqueService => {
  const repository = new EstoqueRepository();
  return new EstoqueService(repository);
};
