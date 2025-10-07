import { ServicoRepository } from '../../repositories/ServicoRepository';
import { ServicoService } from '../ServicoService';
import { IServicoService } from '../interfaces';

export const createServicoService = (): IServicoService => {
  const repository = new ServicoRepository();
  return new ServicoService(repository);
};
