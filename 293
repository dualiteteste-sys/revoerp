import { DashboardStats, FaturamentoMensal } from '../types';
import { IDashboardService } from './interfaces';
import { IDashboardRepository } from '../repositories/interfaces';

export class DashboardService implements IDashboardService {
  public repository: IDashboardRepository;

  constructor(repository: IDashboardRepository) {
    this.repository = repository;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    return this.repository.getDashboardStats();
  }

  async getFaturamentoMensal(): Promise<FaturamentoMensal[]> {
    return this.repository.getFaturamentoMensal();
  }
}
