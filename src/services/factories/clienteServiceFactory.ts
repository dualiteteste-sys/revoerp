import { ClienteRepository } from '../../repositories/ClienteRepository';
import { ClienteService } from '../ClienteService';
import { IClienteService } from '../interfaces';

export const createClienteService = (): IClienteService => {
  const repository = new ClienteRepository();
  return new ClienteService(repository);
};
