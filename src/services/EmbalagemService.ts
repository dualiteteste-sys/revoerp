import { Embalagem } from '../types';
import { IEmbalagemService } from './interfaces';
import { IEmbalagemRepository } from '../repositories/interfaces';

export class EmbalagemService implements IEmbalagemService {
  public repository: IEmbalagemRepository;

  constructor(repository: IEmbalagemRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Embalagem[]; count: number }> {
    return this.repository.findAll(options);
  }

  async create(data: Omit<Embalagem, 'id' | 'createdAt' | 'updatedAt'>): Promise<Embalagem> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<Embalagem>): Promise<Embalagem> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
