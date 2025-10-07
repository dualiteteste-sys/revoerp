import { OrdemServico } from '../types';
import { IOrdemServicoService } from './interfaces';
import { IOrdemServicoRepository } from '../repositories/interfaces';

export class OrdemServicoService implements IOrdemServicoService {
  private repository: IOrdemServicoRepository;

  constructor(repository: IOrdemServicoRepository) {
    this.repository = repository;
  }

  async getAllOrdensServico(): Promise<OrdemServico[]> {
    return this.repository.findAll();
  }

  async createOrdemServico(data: Partial<Omit<OrdemServico, 'id' | 'createdAt' | 'updatedAt'>>): Promise<OrdemServico> {
    return this.repository.create(data as any);
  }

  async updateOrdemServico(id: string, data: Partial<OrdemServico>): Promise<OrdemServico> {
    return this.repository.update(id, { ...data, updatedAt: new Date() });
  }
}
