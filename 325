import { FaturaVendaRepository } from '../../repositories/FaturaVendaRepository';
import { PedidoVendaRepository } from '../../repositories/PedidoVendaRepository';
import { ContasReceberRepository } from '../../repositories/ContasReceberRepository';
import { FaturaVendaService } from '../FaturaVendaService';
import { IFaturaVendaService } from '../interfaces';

export const createFaturaVendaService = (): IFaturaVendaService => {
  const faturaRepository = new FaturaVendaRepository();
  const pedidoRepository = new PedidoVendaRepository();
  const contasReceberRepository = new ContasReceberRepository();
  return new FaturaVendaService(faturaRepository, pedidoRepository, contasReceberRepository);
};
