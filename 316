import { ContasPagarRepository } from '../../repositories/ContasPagarRepository';
import { FluxoCaixaRepository } from '../../repositories/FluxoCaixaRepository';
import { ContasPagarService } from '../ContasPagarService';
import { IContasPagarService } from '../interfaces';

export const createContasPagarService = (): IContasPagarService => {
  const repository = new ContasPagarRepository();
  const fluxoCaixaRepository = new FluxoCaixaRepository();
  return new ContasPagarService(repository, fluxoCaixaRepository);
};
