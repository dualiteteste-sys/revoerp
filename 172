import { useState, useCallback, useEffect } from 'react';
import { DevolucaoVenda, DevolucaoVendaItem } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

export const useDevolucaoVenda = () => {
  const [devolucoes, setDevolucoes] = useState<DevolucaoVenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const service = useService('devolucaoVenda');
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadDevolucoes = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getAll({ page, pageSize: PAGE_SIZE });
      setDevolucoes(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar devoluções';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createDevolucao = async (
    devolucaoData: Omit<DevolucaoVenda, 'id' | 'createdAt' | 'updatedAt' | 'itens'>,
    itensData: Omit<DevolucaoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'devolucaoVendaId'>[]
  ) => {
    const promise = service.create(devolucaoData, itensData);
    toast.promise(promise, {
      loading: 'Registrando devolução...',
      success: () => {
        loadDevolucoes(1);
        return 'Devolução registrada com sucesso!';
      },
      error: (err) => `Falha ao registrar devolução: ${err.message}`,
    });
    await promise;
  };

  useEffect(() => {
    loadDevolucoes(1);
  }, [loadDevolucoes]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadDevolucoes(page);
    }
  };

  return { devolucoes, loading, error, createDevolucao, loadDevolucoes, currentPage, totalPages, goToPage };
};
