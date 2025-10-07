import { useState, useCallback, useEffect } from 'react';
import { ProdutoComEstoque, EstoqueMovimento } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

const PAGE_SIZE = 15;

export const useEstoque = () => {
  const [produtos, setProdutos] = useState<ProdutoComEstoque[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const service = useService('estoque');

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadProdutos = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getProdutosComEstoque({ page, pageSize: PAGE_SIZE });
      setProdutos(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar estoque';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const getHistorico = async (produtoId: string): Promise<EstoqueMovimento[]> => {
    try {
      return await service.getHistoricoProduto(produtoId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar histórico';
      toast.error(errorMessage);
      return [];
    }
  };

  useEffect(() => {
    loadProdutos(1);
  }, [loadProdutos]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadProdutos(page);
    }
  };

  return { produtos, loading, error, loadProdutos, getHistorico, currentPage, totalPages, goToPage };
};
