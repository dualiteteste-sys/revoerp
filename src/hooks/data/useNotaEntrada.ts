import { useState, useCallback, useEffect } from 'react';
import { NotaEntrada, NotaEntradaItem } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

export const useNotaEntrada = () => {
  const [notasEntrada, setNotasEntrada] = useState<NotaEntrada[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const service = useService('notaEntrada');
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadNotasEntrada = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getAll({ page, pageSize: PAGE_SIZE });
      setNotasEntrada(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar notas de entrada';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createNotaEntrada = async (
    notaData: Omit<NotaEntrada, 'id' | 'createdAt' | 'updatedAt' | 'itens' | 'status'>,
    itensData: Omit<NotaEntradaItem, 'id' | 'createdAt' | 'updatedAt' | 'notaEntradaId'>[]
  ) => {
    const promise = service.create(notaData, itensData);
    toast.promise(promise, {
      loading: 'Registrando nota de entrada...',
      success: () => {
        loadNotasEntrada(1);
        return 'Nota de entrada registrada com sucesso!';
      },
      error: (err) => `Falha ao registrar nota: ${err.message}`,
    });
    await promise;
  };

  const finalizarNota = async (notaId: string) => {
    const promise = service.finalizarNota(notaId);
    toast.promise(promise, {
      loading: 'Finalizando nota e atualizando estoque...',
      success: () => {
        loadNotasEntrada(currentPage);
        return 'Nota finalizada com sucesso!';
      },
      error: (err) => `Falha ao finalizar nota: ${err.message}`,
    });
    await promise;
  };

  useEffect(() => {
    loadNotasEntrada(1);
  }, [loadNotasEntrada]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadNotasEntrada(page);
    }
  };

  return { notasEntrada, loading, error, createNotaEntrada, finalizarNota, loadNotasEntrada, currentPage, totalPages, goToPage };
};
