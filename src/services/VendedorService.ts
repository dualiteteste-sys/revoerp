import { Vendedor } from '../types';
import { IVendedorService } from './interfaces';
import { IVendedorRepository } from '../repositories/interfaces';

export class VendedorService implements IVendedorService {
  public repository: IVendedorRepository;

  constructor(repository: IVendedorRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Vendedor[]; count: number }> {
    return this.repository.findAll(options);
  }

  async search(query: string): Promise<Pick<Vendedor, 'id' | 'nome'>[]> {
    return this.repository.search(query);
  }

  async create(data: Omit<Vendedor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vendedor> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<Vendedor>): Promise<Vendedor> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async getPermissions(userId: string): Promise<string[]> {
    return this.repository.getPermissions(userId);
  }

  async setPermissions(userId: string, permissions: string[]): Promise<void> {
    return this.repository.setPermissions(userId, permissions);
  }
}
