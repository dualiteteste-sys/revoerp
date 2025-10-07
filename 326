import { FluxoCaixaRepository } from '../../repositories/FluxoCaixaRepository';
import { FluxoCaixaService } from '../FluxoCaixaService';
import { IFluxoCaixaService } from '../interfaces';

export const createFluxoCaixaService = (): IFluxoCaixaService => {
  const repository = new FluxoCaixaRepository();
  return new FluxoCaixaService(repository);
};
