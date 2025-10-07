import { Papel } from '../types';
import { IPapelService, IPapelRepository } from './interfaces';

export class PapelService implements IPapelService {
  public repository: IPapelRepository;

  constructor(repository: IPapelRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Papel[]; count: number }> {
    return this.repository.findAll(options);
  }

  async findById(id: string): Promise<Papel | null> {
    return this.repository.findById(id);
  }

  async create(data: Omit<Papel, 'id' | 'createdAt' | 'updatedAt'>): Promise<Papel> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<Papel>): Promise<Papel> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async getPermissions(papelId: string): Promise<string[]> {
    return this.repository.getPermissions(papelId);
  }

  async setPermissions(papelId: string, permissionIds: string[]): Promise<void> {
    return this.repository.setPermissions(papelId, permissionIds);
  }
}
