import { useState, useEffect, useCallback } from 'react';
import { OrdemServico } from '../types';
import toast from 'react-hot-toast';
import { useService } from './useService';

export const useOrdemServicoService = () => {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const service = useService('ordemServico');

  const loadOrdensServico = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAllOrdensServico();
      setOrdensServico(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar ordens de serviço';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createOrdemServico = async (data: Partial<Omit<OrdemServico, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const promise = service.createOrdemServico(data);
    toast.promise(promise, {
      loading: 'Criando Ordem de Serviço...',
      success: () => {
        loadOrdensServico();
        return 'OS criada com sucesso!';
      },
      error: (err) => `Falha ao criar OS: ${err.message}`,
    });
    return promise;
  };

  const updateOrdemServico = async (id: string, data: Partial<OrdemServico>) => {
    // Não mostra toast para atualizações de status via drag-and-drop, apenas para erros.
    try {
      const osAtualizada = await service.updateOrdemServico(id, data);
      // Atualiza o estado local com os dados completos retornados pelo backend
      setOrdensServico(prev => prev.map(os => os.id === id ? osAtualizada : os));
      return osAtualizada;
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar ordem de serviço';
        toast.error(`Falha ao atualizar: ${errorMessage}`);
        throw err;
    }
  };

  useEffect(() => {
    loadOrdensServico();
  }, [loadOrdensServico]);

  return {
    ordensServico,
    setOrdensServico,
    loading,
    error,
    updateOrdemServico,
    createOrdemServico,
  };
};
