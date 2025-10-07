import { BaseRepository } from './BaseRepository';
import { Servico } from '../types';

export class ServicoRepository extends BaseRepository<Servico> {
  constructor() {
    super('servicos');
  }

  protected createEntity(data: Omit<Servico, 'id' | 'createdAt' | 'updatedAt'>): Servico {
    return {
      ...data,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Servico[]; count: number }> {
    const selectString = 'id, descricao, codigo, preco, situacao';
    return super.findAll(options, selectString);
  }
}
