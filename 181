import { useState, useEffect, useCallback } from 'react';
import { DREMensal } from '../../types';
import { useService } from '../useService';

export const useRelatorioService = () => {
  const [dreMensal, setDreMensal] = useState<DREMensal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const service = useService('relatorio');

  const loadDRE = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getDREMensal();
      setDreMensal(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar relatório DRE';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadDRE();
  }, [loadDRE]);

  return {
    dreMensal,
    loading,
    error,
    loadDRE,
  };
};
