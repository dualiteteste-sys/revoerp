import { ExpedicaoRepository } from '../../repositories/ExpedicaoRepository';
import { ExpedicaoService } from '../ExpedicaoService';
import { IExpedicaoService } from '../interfaces';

export const createExpedicaoService = (): IExpedicaoService => {
  const repository = new ExpedicaoRepository();
  return new ExpedicaoService(repository);
};
