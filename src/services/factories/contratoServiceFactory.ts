import { ContratoRepository } from '../../repositories/ContratoRepository';
import { ContratoService } from '../ContratoService';
import { IContratoService } from '../interfaces';

export const createContratoService = (): IContratoService => {
  const repository = new ContratoRepository();
  return new ContratoService(repository);
};
