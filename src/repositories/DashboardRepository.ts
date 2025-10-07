import { supabase } from '../lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import { snakeToCamel } from '../lib/utils';
import { DashboardStats, FaturamentoMensal } from '../types';
import { IDashboardRepository } from './interfaces';
import { generateMockDashboardStats, generateMockFaturamentoMensal } from './mocks/dashboardMock';

export class DashboardRepository implements IDashboardRepository {
  protected supabase = supabase;

  protected handleError(error: PostgrestError | null, context?: string): void {
    if (error) {
      console.error(`Error in DashboardRepository${context ? ` (${context})` : ''}:`, error);
      throw new Error(error.message);
    }
  }

  async getDashboardStats(empresaId: string): Promise<DashboardStats> {
    // --- MOCK IMPLEMENTATION ---
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return generateMockDashboardStats();

    /* --- REAL IMPLEMENTATION ---
    const { data, error } = await this.supabase.rpc('get_dashboard_stats', { p_empresa_id: empresaId });
    this.handleError(error, 'getDashboardStats');
    if (!data || data.length === 0) {
      // Retorna um objeto zerado se não houver dados
      return {
        faturamentoTotalMesAtual: 0,
        faturamentoTotalMesAnterior: 0,
        novosClientesMesAtual: 0,
        novosClientesMesAnterior: 0,
        pedidosRealizadosMesAtual: 0,
        pedidosRealizadosMesAnterior: 0,
      };
    }
    return snakeToCamel(data[0]) as DashboardStats;
    */
  }

  async getFaturamentoMensal(empresaId: string): Promise<FaturamentoMensal[]> {
    // --- MOCK IMPLEMENTATION ---
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return generateMockFaturamentoMensal();

    /* --- REAL IMPLEMENTATION ---
    const { data, error } = await this.supabase.rpc('get_faturamento_ultimos_12_meses', { p_empresa_id: empresaId });
    this.handleError(error, 'getFaturamentoMensal');
    return (snakeToCamel(data) as FaturamentoMensal[]) || [];
    */
  }
}
