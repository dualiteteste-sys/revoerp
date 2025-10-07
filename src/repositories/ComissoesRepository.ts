import { supabase } from '../lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import { snakeToCamel } from '../lib/utils';
import { Comissao } from '../types';

export class ComissoesRepository {
  protected supabase = supabase;
  protected viewName: string = 'comissoes_view';

  protected handleError(error: PostgrestError | null, context?: string): void {
    if (error) {
      console.error(`Error in ComissoesRepository${context ? ` (${context})` : ''}:`, error);
      throw new Error(error.message);
    }
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Comissao[]; count: number }> {
    const { page = 1, pageSize = 15 } = options;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Otimizado: Seleciona apenas os campos necessários para a listagem.
    const selectString = 'id, vendedor_nome, cliente_nome, data_venda, valor_venda, valor_comissao, status';

    const { data, error, count } = await this.supabase
      .from(this.viewName)
      .select(selectString, { count: 'exact' })
      .order('data_venda', { ascending: false })
      .range(from, to);

    this.handleError(error, 'findAll');
    
    return {
      data: (snakeToCamel(data || []) as Comissao[]),
      count: count || 0,
    };
  }
}
