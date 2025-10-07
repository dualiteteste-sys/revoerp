import { RelatorioRepository } from '../../repositories/RelatorioRepository';
import { RelatorioService } from '../RelatorioService';
import { IRelatorioService } from '../interfaces';

export const createRelatorioService = (): IRelatorioService => {
  const repository = new RelatorioRepository();
  return new RelatorioService(repository);
};
