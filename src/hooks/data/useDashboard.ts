import { useState, useEffect, useCallback } from 'react';
import { DashboardStats, FaturamentoMensal } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [faturamentoMensal, setFaturamentoMensal] = useState<FaturamentoMensal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const service = useService('dashboard');

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, faturamentoData] = await Promise.all([
        service.getDashboardStats('mock-empresa-id'),
        service.getFaturamentoMensal('mock-empresa-id'),
      ]);
      setStats(statsData);
      setFaturamentoMensal(faturamentoData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  return {
    stats,
    faturamentoMensal,
    loading,
    error,
    loadDashboardData,
  };
};
