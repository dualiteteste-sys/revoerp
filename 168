import { useState, useCallback, useEffect } from 'react';
import { ContaReceber } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

const PAGE_SIZE = 10;

export const useContasReceber = () => {
  const [contas, setContas] = useState<ContaReceber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const service = useService('contasReceber');

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadContas = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getAllContasReceber({ page, pageSize: PAGE_SIZE });
      setContas(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar contas a receber';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const liquidarConta = async (id: string) => {
    const promise = service.liquidarConta(id);
    toast.promise(promise, {
      loading: 'Liquidando conta...',
      success: 'Conta liquidada com sucesso!',
      error: (err) => `Falha ao liquidar: ${err.message}`,
    });
    await promise;
    await loadContas(currentPage);
  };

  const createConta = async (data: Partial<Omit<ContaReceber, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const promise = service.createContaReceber(data);
    toast.promise(promise, {
        loading: 'Criando conta...',
        success: 'Conta criada com sucesso!',
        error: (err) => `Falha ao criar: ${err.message}`,
    });
    await promise;
    await loadContas(1);
  };
  
  const updateConta = async (id: string, data: Partial<ContaReceber>) => {
    const promise = service.updateContaReceber(id, data);
    toast.promise(promise, {
        loading: 'Atualizando conta...',
        success: 'Conta atualizada com sucesso!',
        error: (err) => `Falha ao atualizar: ${err.message}`,
    });
    await promise;
    await loadContas(currentPage);
  };

  useEffect(() => {
    loadContas(1);
  }, [loadContas]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadContas(page);
    }
  };

  return { contas, loading, error, loadContas, liquidarConta, createConta, updateConta, currentPage, totalPages, goToPage };
};
