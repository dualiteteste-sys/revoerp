import { NotaFiscalRepository } from '../../repositories/NotaFiscalRepository';
import { NotaFiscalService } from '../NotaFiscalService';
import { INotaFiscalService } from '../interfaces';

export const createNotaFiscalService = (): INotaFiscalService => {
  const repository = new NotaFiscalRepository();
  return new NotaFiscalService(repository);
};
