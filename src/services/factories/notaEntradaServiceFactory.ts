import { NotaEntradaRepository } from '../../repositories/NotaEntradaRepository';
import { NotaEntradaService } from '../NotaEntradaService';
import { INotaEntradaService } from '../interfaces';
import { createEstoqueService } from './estoqueServiceFactory';

export const createNotaEntradaService = (): INotaEntradaService => {
  const repository = new NotaEntradaRepository();
  const estoqueService = createEstoqueService();
  return new NotaEntradaService(repository, estoqueService);
};
