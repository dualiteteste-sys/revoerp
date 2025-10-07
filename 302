import { FaturaVenda } from '../types';
import { INotaFiscalService } from './interfaces';
import { INotaFiscalRepository } from '../repositories/interfaces';

export class NotaFiscalService implements INotaFiscalService {
  private faturaRepository: INotaFiscalRepository;

  constructor(faturaRepository: INotaFiscalRepository) {
    this.faturaRepository = faturaRepository;
  }

  async getAllFaturas(options: { page?: number; pageSize?: number } = {}): Promise<{ data: FaturaVenda[]; count: number }> {
    return this.faturaRepository.findAll(options);
  }
}
