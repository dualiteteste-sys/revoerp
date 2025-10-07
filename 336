import { VendedorRepository } from '../../repositories/VendedorRepository';
import { VendedorService } from '../VendedorService';
import { IVendedorService } from '../interfaces';

export const createVendedorService = (): IVendedorService => {
  const repository = new VendedorRepository();
  return new VendedorService(repository);
};
