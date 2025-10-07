import { DashboardRepository } from '../../repositories/DashboardRepository';
import { DashboardService } from '../DashboardService';
import { IDashboardService } from '../interfaces';

export const createDashboardService = (): IDashboardService => {
  const repository = new DashboardRepository();
  return new DashboardService(repository);
};
