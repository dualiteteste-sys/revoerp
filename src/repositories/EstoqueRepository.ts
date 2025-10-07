import { supabase } from '../lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import { snakeToCamel, camelToSnake } from '../lib/utils';
import { ProdutoComEstoque, EstoqueMovimento } from '../types';
import { IEstoqueRepository } from './interfaces';

export class EstoqueRepository implements IEstoqueRepository {
  protected supabase = supabase;
  protected viewName: string = 'produtos_com_estoque';
  protected tableName: string = 'estoque_movimentos';

  protected handleError(error: PostgrestError | null, context?: string): void {
    if (error) {
      console.error(`Error in EstoqueRepository${context ? ` (${context})` : ''}:`, error);
      throw new Error(error.message);
    }
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: ProdutoComEstoque[]; count: number }> {
    const { page = 1, pageSize = 15 } = options;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Otimizado: Seleciona apenas os campos necessários para a listagem de estoque.
    const selectString = 'id, nome, codigo, controlar_estoque, estoque_minimo, estoque_maximo, unidade, situacao, estoque_atual, imagens';

    const { data, error, count } = await this.supabase
      .from(this.viewName)
      .select(selectString, { count: 'exact' })
      .order('nome', { ascending: true })
      .range(from, to);

    this.handleError(error, 'findAll');
    
    const produtos = (snakeToCamel(data || []) as ProdutoComEstoque[]).map(p => ({
      ...p,
      imagens: p.imagens?.map(img => ({
        ...img,
        url: this.supabase.storage.from('produto-imagens').getPublicUrl(img.path).data.publicUrl
      })) || []
    }));
    
    return {
      data: produtos,
      count: count || 0,
    };
  }

  async findHistoryByProductId(produtoId: string): Promise<EstoqueMovimento[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('produto_id', produtoId)
      .order('data', { ascending: false });

    this.handleError(`findHistoryByProductId`, error);
    return (snakeToCamel(data || []) as EstoqueMovimento[]) || [];
  }

  async createMovimento(movimento: Omit<EstoqueMovimento, 'id' | 'createdAt' | 'updatedAt'>): Promise<EstoqueMovimento> {
    const movimentoToInsert = camelToSnake(movimento);
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(movimentoToInsert)
      .select()
      .single();
    
    this.handleError('createMovimento', error);
    if (!data) throw new Error('Falha ao criar movimento de estoque.');
    
    return snakeToCamel(data) as EstoqueMovimento;
  }
}
