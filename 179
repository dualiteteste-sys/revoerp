import { useState, useCallback, useEffect } from 'react';
import { PedidoVenda, PedidoVendaItem } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

export const usePedidoVenda = () => {
  const [pedidosVenda, setPedidosVenda] = useState<PedidoVenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const pedidoVendaService = useService('pedidoVenda');
  const faturaVendaService = useService('faturaVenda');

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadPedidosVenda = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await pedidoVendaService.getAllPedidosVenda({ page, pageSize: PAGE_SIZE });
      setPedidosVenda(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar pedidos de venda';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [pedidoVendaService]);

  const createPedidoVenda = async (
    pedidoData: Partial<Omit<PedidoVenda, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<PedidoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]
  ) => {
    const promise = pedidoVendaService.createPedidoVenda(pedidoData, itensData);
    toast.promise(promise, {
      loading: 'Criando pedido de venda...',
      success: () => {
        loadPedidosVenda(1);
        return 'Pedido de venda criado com sucesso!';
      },
      error: (err) => `Falha ao criar pedido: ${err.message}`,
    });
    return promise;
  };
  
  const faturarPedido = async (pedidoId: string) => {
    const promise = faturaVendaService.faturarPedido(pedidoId);
    toast.promise(promise, {
        loading: 'Faturando pedido...',
        success: () => {
            loadPedidosVenda(currentPage);
            return 'Pedido faturado com sucesso!';
        },
        error: (err) => `Falha ao faturar: ${err.message}`,
    });
    await promise;
  };

  useEffect(() => {
    loadPedidosVenda(1);
  }, [loadPedidosVenda]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadPedidosVenda(page);
    }
  };

  return { pedidosVenda, loading, error, createPedidoVenda, faturarPedido, loadPedidosVenda, currentPage, totalPages, goToPage };
};
