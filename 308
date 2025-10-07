import { DREMensal } from '../types';
import { IRelatorioService } from './interfaces';
import { IRelatorioRepository } from '../repositories/interfaces';

export class RelatorioService implements IRelatorioService {
  private repository: IRelatorioRepository;

  constructor(repository: IRelatorioRepository) {
    this.repository = repository;
  }

  async getDREMensal(): Promise<DREMensal[]> {
    return this.repository.getDREMensal();
  }
}
