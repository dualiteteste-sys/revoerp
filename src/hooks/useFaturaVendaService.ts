import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaturaVenda } from '../types';
import { FaturaVendaService } from '../services/FaturaVendaService';

export const useFaturaVendaService = () => {
  const [faturas, setFaturas] = useState<FaturaVenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const service = useMemo(() => new FaturaVendaService(), []);

  const loadFaturas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAllFaturas();
      setFaturas(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar faturas';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadFaturas();
  }, [loadFaturas]);

  return {
    faturas,
    loading,
    error,
    loadFaturas,
  };
};
