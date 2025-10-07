import { CrmRepository } from '../../repositories/CrmRepository';
import { CrmService } from '../CrmService';
import { ICrmService } from '../interfaces';

export const createCrmService = (): ICrmService => {
  const repository = new CrmRepository();
  return new CrmService(repository);
};
