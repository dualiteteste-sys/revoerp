import { DevolucaoVenda, DevolucaoVendaItem } from '../types';
import { IDevolucaoVendaService } from './interfaces';
import { IDevolucaoVendaRepository } from '../repositories/interfaces';

export class DevolucaoVendaService implements IDevolucaoVendaService {
  public repository: IDevolucaoVendaRepository;

  constructor(repository: IDevolucaoVendaRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: DevolucaoVenda[]; count: number }> {
    return this.repository.findAll(options);
  }

  async create(
    devolucaoData: Omit<DevolucaoVenda, 'id' | 'createdAt' | 'updatedAt' | 'itens'>,
    itensData: Omit<DevolucaoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'devolucaoVendaId'>[]
  ): Promise<DevolucaoVenda> {
    // Aqui você poderia adicionar lógica de negócio, como gerar um movimento de estoque
    return (this.repository as any).createWithItems(devolucaoData, itensData);
  }
}
