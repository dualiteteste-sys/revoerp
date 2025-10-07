import { ConfiguracoesRepository } from '../../repositories/ConfiguracoesRepository';
import { ConfiguracoesService } from '../ConfiguracoesService';
import { IConfiguracoesService } from '../interfaces';

export const createConfiguracoesService = (): IConfiguracoesService => {
  const repository = new ConfiguracoesRepository();
  return new ConfiguracoesService(repository);
};
