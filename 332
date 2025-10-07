import { PedidoVendaRepository } from '../../repositories/PedidoVendaRepository';
import { PedidoVendaService } from '../PedidoVendaService';
import { IPedidoVendaService } from '../interfaces';

export const createPedidoVendaService = (): IPedidoVendaService => {
  const repository = new PedidoVendaRepository();
  return new PedidoVendaService(repository);
};
