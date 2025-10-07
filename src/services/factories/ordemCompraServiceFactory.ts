import { OrdemCompraRepository } from '../../repositories/OrdemCompraRepository';
import { OrdemCompraService } from '../OrdemCompraService';
import { IOrdemCompraService } from '../interfaces';

export const createOrdemCompraService = (): IOrdemCompraService => {
  const repository = new OrdemCompraRepository();
  return new OrdemCompraService(repository);
};
