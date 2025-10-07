import { DevolucaoVendaRepository } from '../../repositories/DevolucaoVendaRepository';
import { DevolucaoVendaService } from '../DevolucaoVendaService';
import { IDevolucaoVendaService } from '../interfaces';

export const createDevolucaoVendaService = (): IDevolucaoVendaService => {
  const repository = new DevolucaoVendaRepository();
  return new DevolucaoVendaService(repository);
};
