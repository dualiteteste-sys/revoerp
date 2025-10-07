import { CobrancasRepository } from '../../repositories/CobrancasRepository';
import { ContasReceberRepository } from '../../repositories/ContasReceberRepository';
import { CobrancasService } from '../CobrancasService';
import { ICobrancasService } from '../interfaces';

export const createCobrancasService = (): ICobrancasService => {
  const cobrancasRepository = new CobrancasRepository();
  const contasReceberRepository = new ContasReceberRepository();
  return new CobrancasService(cobrancasRepository, contasReceberRepository);
};
