import { useState, useCallback, useEffect } from 'react';
import { ContaPagar } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

export const useContasPagar = () => {
  const service = useService('contasPagar');
  const [contas, setContas] = useState<ContaPagar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAllContasPagar();
      setContas(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar contas a pagar';
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
    await loadContas();
  };

  const createConta = async (data: Partial<Omit<ContaPagar, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const promise = service.createContaPagar(data);
    toast.promise(promise, {
        loading: 'Criando conta...',
        success: 'Conta criada com sucesso!',
        error: (err) => `Falha ao criar: ${err.message}`,
    });
    await promise;
    await loadContas();
  };
  
  const updateConta = async (id: string, data: Partial<ContaPagar>) => {
    const promise = service.updateContaPagar(id, data);
    toast.promise(promise, {
        loading: 'Atualizando conta...',
        success: 'Conta atualizada com sucesso!',
        error: (err) => `Falha ao atualizar: ${err.message}`,
    });
    await promise;
    await loadContas();
  };

  useEffect(() => {
    loadContas();
  }, [loadContas]);

  return { contas, loading, error, loadContas, liquidarConta, createConta, updateConta };
};
