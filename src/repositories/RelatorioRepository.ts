import { supabase } from '../lib/supabaseClient';
import { DREMensal } from '../types';
import { snakeToCamel } from '../lib/utils';

export class RelatorioRepository {
  protected supabase = supabase;

  async getDREMensal(): Promise<DREMensal[]> {
    const { data, error } = await this.supabase
      .from('dre_mensal')
      .select('*')
      .order('ano', { ascending: true })
      .order('mes', { ascending: true });

    if (error) {
      console.error('Error fetching DRE Mensal:', error);
      throw new Error(error.message);
    }
    
    if (!data) return [];
    return snakeToCamel(data) as DREMensal[];
  }
}
