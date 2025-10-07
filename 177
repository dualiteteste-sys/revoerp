import { useState, useCallback, useEffect } from 'react';
import { FaturaVenda } from '../../types';
import { useService } from '../useService';

const PAGE_SIZE = 10;

export const useNotaFiscal = () => {
  const [faturas, setFaturas] = useState<FaturaVenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const service = useService('notaFiscal');
  
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadFaturas = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getAllFaturas({ page, pageSize: PAGE_SIZE });
      setFaturas(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar notas fiscais';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [service]);
  
  useEffect(() => {
    loadFaturas(1);
  }, [loadFaturas]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadFaturas(page);
    }
  };

  return { faturas, loading, error, loadFaturas, currentPage, totalPages, goToPage };
};
