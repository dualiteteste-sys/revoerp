import { FluxoCaixa } from '../types';
import { IFluxoCaixaService } from './interfaces';
import { IFluxoCaixaRepository } from '../repositories/interfaces';

export class FluxoCaixaService implements IFluxoCaixaService {
  private repository: IFluxoCaixaRepository;

  constructor(repository: IFluxoCaixaRepository) {
    this.repository = repository;
  }

  async getAllMovimentacoes(): Promise<FluxoCaixa[]> {
    return this.repository.findAll();
  }
}
