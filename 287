import { Comissao } from '../types';
import { IComissoesService } from './interfaces';
import { IComissoesRepository } from '../repositories/interfaces';

export class ComissoesService implements IComissoesService {
  public repository: IComissoesRepository;

  constructor(repository: IComissoesRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Comissao[]; count: number }> {
    return this.repository.findAll(options);
  }
}
