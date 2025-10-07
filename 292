import { CrmOportunidade } from '../types';
import { ICrmService } from './interfaces';
import { ICrmRepository } from '../repositories/interfaces';

export class CrmService implements ICrmService {
  public repository: ICrmRepository;

  constructor(repository: ICrmRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<CrmOportunidade[]> {
    return this.repository.findAll();
  }

  async create(data: Omit<CrmOportunidade, 'id' | 'createdAt' | 'updatedAt'>): Promise<CrmOportunidade> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<CrmOportunidade>): Promise<CrmOportunidade> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
