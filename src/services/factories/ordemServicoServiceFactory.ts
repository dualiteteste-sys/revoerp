import { OrdemServicoRepository } from '../../repositories/OrdemServicoRepository';
import { OrdemServicoService } from '../OrdemServicoService';
import { IOrdemServicoService } from '../interfaces';

export const createOrdemServicoService = (): IOrdemServicoService => {
  const repository = new OrdemServicoRepository();
  return new OrdemServicoService(repository);
};
