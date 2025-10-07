import { useState, useEffect, useCallback } from 'react';
import { Papel } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

export const usePapeis = () => {
  const service = useService('papel');
  const [papeis, setPapeis] = useState<Papel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPapeis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await service.getAll();
      setPapeis(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar papéis';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadPapeis();
  }, [loadPapeis]);

  const createPapel = async (data: Partial<Papel>) => {
    await toast.promise(service.create(data as any), {
      loading: 'Criando papel...',
      success: 'Papel criado com sucesso!',
      error: (err) => `Falha ao criar: ${err.message}`,
    });
    await loadPapeis();
  };

  const updatePapel = async (id: string, data: Partial<Papel>) => {
    await toast.promise(service.update(id, data), {
      loading: 'Atualizando papel...',
      success: 'Papel atualizado com sucesso!',
      error: (err) => `Falha ao atualizar: ${err.message}`,
    });
    await loadPapeis();
  };

  const deletePapel = async (id: string) => {
    await toast.promise(service.delete(id), {
      loading: 'Excluindo papel...',
      success: 'Papel excluído com sucesso!',
      error: (err) => `Falha ao excluir: ${err.message}`,
    });
    await loadPapeis();
  };

  const setPermissions = async (papelId: string, permissionIds: string[]) => {
    await toast.promise(service.setPermissions(papelId, permissionIds), {
      loading: 'Salvando permissões...',
      success: 'Permissões salvas com sucesso!',
      error: (err) => `Falha ao salvar permissões: ${err.message}`,
    });
  };

  return { papeis, loading, error, loadPapeis, createPapel, updatePapel, deletePapel, setPermissions };
};
