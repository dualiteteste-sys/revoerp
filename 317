import { ContasReceberRepository } from '../../repositories/ContasReceberRepository';
import { FluxoCaixaRepository } from '../../repositories/FluxoCaixaRepository';
import { ContasReceberService } from '../ContasReceberService';
import { IContasReceberService } from '../interfaces';

export const createContasReceberService = (): IContasReceberService => {
  const repository = new ContasReceberRepository();
  const fluxoCaixaRepository = new FluxoCaixaRepository();
  return new ContasReceberService(repository, fluxoCaixaRepository);
};
