import { PapelRepository } from '../../repositories/PapelRepository';
import { PapelService } from '../PapelService';
import { IPapelService } from '../interfaces';

export const createPapelService = (): IPapelService => {
  const repository = new PapelRepository();
  return new PapelService(repository);
};
