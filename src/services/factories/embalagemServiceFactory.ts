import { EmbalagemRepository } from '../../repositories/EmbalagemRepository';
import { EmbalagemService } from '../EmbalagemService';
import { IEmbalagemService } from '../interfaces';

export const createEmbalagemService = (): IEmbalagemService => {
  const repository = new EmbalagemRepository();
  return new EmbalagemService(repository);
};
