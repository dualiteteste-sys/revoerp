import { useState, useEffect, useCallback } from 'react';
import { PedidoVenda, PedidoVendaItem } from '../types';
import { useService } from './useService';

export const usePedidoVendaService = () => {
  const [pedidosVenda, setPedidosVenda] = useState<PedidoVenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const service = useService('pedidoVenda');

  const loadPedidosVenda = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAllPedidosVenda();
      setPedidosVenda(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar pedidos de venda';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createPedidoVenda = async (
    pedidoData: Omit<PedidoVenda, 'id' | 'createdAt' | 'updatedAt' | 'itens'>,
    itensData: Omit<PedidoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]
  ) => {
    try {
      setError(null);
      const novoPedido = await service.createPedidoVenda(pedidoData, itensData);
      setPedidosVenda(prev => [novoPedido, ...prev]);
      return novoPedido;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar pedido de venda';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    loadPedidosVenda();
  }, [loadPedidosVenda]);

  return {
    pedidosVenda,
    loading,
    error,
    createPedidoVenda,
    loadPedidosVenda,
  };
};
