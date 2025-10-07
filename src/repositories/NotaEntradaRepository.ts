import { BaseRepository } from './BaseRepository';
import { NotaEntrada, NotaEntradaItem } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class NotaEntradaRepository extends BaseRepository<NotaEntrada> {
  constructor() {
    super('notas_entrada');
  }

  protected createEntity(data: any): NotaEntrada {
    return data as NotaEntrada;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: NotaEntrada[]; count: number }> {
    const selectString = `
      id, numero, data_entrada, valor_total, status,
      fornecedor:clientes!fornecedor_id ( id, nome )
    `;
    return super.findAll(options, selectString);
  }

  async findById(id: string): Promise<NotaEntrada | null> {
    const { data: notaData, error: notaError } = await this.supabase
      .from(this.tableName)
      .select('*, fornecedor:clientes!fornecedor_id ( id, nome )')
      .eq('id', id)
      .single();

    this.handleError('findById (nota)', notaError);
    if (!notaData) return null;

    const nota = snakeToCamel(notaData) as NotaEntrada;

    const { data: itensData, error: itensError } = await this.supabase
      .from('nota_entrada_itens')
      .select('*, produto:produtos(*)')
      .eq('nota_entrada_id', id);
    this.handleError('findById (itens)', itensError);
    nota.itens = snakeToCamel(itensData || []) as NotaEntradaItem[];
    
    return nota;
  }

  async createWithItems(
    notaData: Omit<NotaEntrada, 'id' | 'createdAt' | 'updatedAt' | 'itens'>,
    itensData: Omit<NotaEntradaItem, 'id' | 'createdAt' | 'updatedAt' | 'notaEntradaId'>[]
  ): Promise<NotaEntrada> {
    const notaParaInserir = camelToSnake(notaData);

    const { data: newNota, error: notaError } = await this.supabase
      .from(this.tableName)
      .insert(notaParaInserir)
      .select()
      .single();

    this.handleError('createWithItems (nota)', notaError);
    if (!newNota) throw new Error('Falha ao criar o cabeçalho da nota de entrada.');

    if (itensData && itensData.length > 0) {
      const itensParaInserir = itensData.map(item => ({
        ...camelToSnake(item),
        nota_entrada_id: newNota.id,
      }));

      const { error: itensError } = await this.supabase
        .from('nota_entrada_itens')
        .insert(itensParaInserir);

      this.handleError('createWithItems (itens)', itensError);
    }

    const createdNota = await this.findById(newNota.id);
    if (!createdNota) throw new Error('Não foi possível recarregar a nota de entrada após a criação.');

    return createdNota;
  }
}
