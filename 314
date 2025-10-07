import { ComissoesRepository } from '../../repositories/ComissoesRepository';
import { ComissoesService } from '../ComissoesService';
import { IComissoesService } from '../interfaces';

export const createComissoesService = (): IComissoesService => {
  const repository = new ComissoesRepository();
  return new ComissoesService(repository);
};
