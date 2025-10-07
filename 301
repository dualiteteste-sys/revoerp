import { NotaEntrada, NotaEntradaItem, StatusNotaEntrada } from '../types';
import { INotaEntradaService, IEstoqueService } from './interfaces';
import { INotaEntradaRepository } from '../repositories/interfaces';

export class NotaEntradaService implements INotaEntradaService {
  public repository: INotaEntradaRepository;
  private estoqueService: IEstoqueService;

  constructor(repository: INotaEntradaRepository, estoqueService: IEstoqueService) {
    this.repository = repository;
    this.estoqueService = estoqueService;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: NotaEntrada[]; count: number }> {
    return this.repository.findAll(options);
  }

  async create(
    notaData: Omit<NotaEntrada, 'id' | 'createdAt' | 'updatedAt' | 'itens' | 'status'>,
    itensData: Omit<NotaEntradaItem, 'id' | 'createdAt' | 'updatedAt' | 'notaEntradaId'>[]
  ): Promise<NotaEntrada> {
    const notaCompleta = {
      ...notaData,
      status: StatusNotaEntrada.EM_DIGITACAO,
    };
    return (this.repository as any).createWithItems(notaCompleta, itensData);
  }

  async finalizarNota(notaId: string): Promise<void> {
    const nota = await this.repository.findById(notaId);
    if (!nota) {
      throw new Error('Nota de entrada não encontrada.');
    }
    if (nota.status !== StatusNotaEntrada.EM_DIGITACAO) {
      throw new Error('Apenas notas "EM DIGITAÇÃO" podem ser finalizadas.');
    }

    await this.repository.update(notaId, { status: StatusNotaEntrada.FINALIZADA });

    for (const item of nota.itens) {
      if (item.produto?.controlarEstoque) {
        await this.estoqueService.createMovimento({
          produtoId: item.produtoId,
          tipo: 'ENTRADA',
          quantidade: item.quantidade,
          data: new Date(),
          origem: `Nota de Entrada ${nota.numero}`,
        });
      }
    }
  }
}
