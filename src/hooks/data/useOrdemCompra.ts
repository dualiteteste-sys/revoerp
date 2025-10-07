import { useState, useCallback, useEffect } from 'react';
import { OrdemCompra, OrdemCompraItem } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

export const useOrdemCompra = () => {
  const [ordensCompra, setOrdensCompra] = useState<OrdemCompra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const service = useService('ordemCompra');

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadOrdensCompra = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getAll({ page, pageSize: PAGE_SIZE });
      setOrdensCompra(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar ordens de compra';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createOrdemCompra = async (
    ordemData: Partial<Omit<OrdemCompra, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<OrdemCompraItem, 'id' | 'createdAt' | 'updatedAt' | 'ordemCompraId'>[]
  ) => {
    const promise = service.createWithItems(ordemData, itensData);
    toast.promise(promise, {
      loading: 'Criando ordem de compra...',
      success: () => {
        loadOrdensCompra(1);
        return 'Ordem de compra criada com sucesso!';
      },
      error: (err) => `Falha ao criar ordem: ${err.message}`,
    });
    return promise;
  };
  
  useEffect(() => {
    loadOrdensCompra(1);
  }, [loadOrdensCompra]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadOrdensCompra(page);
    }
  };

  return { ordensCompra, loading, error, createOrdemCompra, loadOrdensCompra, currentPage, totalPages, goToPage };
};
