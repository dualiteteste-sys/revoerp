import { BaseRepository } from './BaseRepository';
import { Embalagem } from '../types';

export class EmbalagemRepository extends BaseRepository<Embalagem> {
  constructor() {
    super('embalagens');
  }

  protected createEntity(data: Omit<Embalagem, 'id' | 'createdAt' | 'updatedAt'>): Embalagem {
    return {
      ...data,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Embalagem[]; count: number }> {
    const selectString = 'id, descricao, tipo, largura_cm, altura_cm, comprimento_cm, diametro_cm, peso_kg';
    return super.findAll(options, selectString);
  }
}
