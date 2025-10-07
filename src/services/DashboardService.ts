import { DashboardStats, FaturamentoMensal } from '../types';
import { IDashboardService } from './interfaces';
import { IDashboardRepository } from '../repositories/interfaces';

export class DashboardService implements IDashboardService {
  public repository: IDashboardRepository;

  constructor(repository: IDashboardRepository) {
    this.repository = repository;
  }

  async getDashboardStats(empresaId: string): Promise<DashboardStats> {
    return this.repository.getDashboardStats(empresaId);
  }

  async getFaturamentoMensal(empresaId: string): Promise<FaturamentoMensal[]> {
    return this.repository.getFaturamentoMensal(empresaId);
  }
}
