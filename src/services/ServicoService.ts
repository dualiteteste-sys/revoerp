import { Servico, SituacaoServico } from '../types';
import { IServicoService } from './interfaces';
import { IServicoRepository } from '../repositories/interfaces';

export class ServicoService implements IServicoService {
  public repository: IServicoRepository;

  constructor(repository: IServicoRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Servico[]; count: number }> {
    return this.repository.findAll(options);
  }

  async create(data: Omit<Servico, 'id' | 'createdAt' | 'updatedAt'>): Promise<Servico> {
    // Garante que o preço seja um número
    const dataToCreate = {
      ...data,
      preco: Number(data.preco) || 0,
    };
    return this.repository.create(dataToCreate);
  }

  async update(id: string, data: Partial<Servico>): Promise<Servico> {
    const dataToUpdate = { ...data };
    if (data.preco !== undefined) {
      dataToUpdate.preco = Number(data.preco) || 0;
    }
    return this.repository.update(id, dataToUpdate);
  }

  async delete(id: string): Promise<void> {
    // Em vez de deletar, inativamos o serviço para manter a integridade dos dados históricos.
    await this.repository.update(id, { situacao: SituacaoServico.INATIVO });
  }
}
