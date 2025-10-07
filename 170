import { useState, useCallback, useEffect } from 'react';
import { CrmOportunidade } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

export const useCrm = () => {
  const [oportunidades, setOportunidades] = useState<CrmOportunidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const service = useService('crm');

  const loadOportunidades = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAll();
      setOportunidades(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar oportunidades';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const createOportunidade = async (data: Partial<Omit<CrmOportunidade, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const promise = service.create(data as any);
    toast.promise(promise, {
      loading: 'Criando oportunidade...',
      success: () => {
        loadOportunidades();
        return 'Oportunidade criada com sucesso!';
      },
      error: (err) => `Falha ao criar: ${err.message}`,
    });
    await promise;
  };
  
  const updateOportunidade = async (id: string, data: Partial<CrmOportunidade>) => {
    const isStatusUpdateOnly = Object.keys(data).length === 1 && 'etapa' in data;
    
    const originalOportunidades = oportunidades;
    
    setOportunidades(prev => prev.map(op => op.id === id ? { ...op, ...data } as CrmOportunidade : op));

    try {
      const updated = await service.update(id, data);
      setOportunidades(prev => prev.map(op => op.id === id ? updated : op));
      if (!isStatusUpdateOnly) {
        toast.success('Oportunidade atualizada com sucesso!');
      }
    } catch (err) {
      setOportunidades(originalOportunidades);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar oportunidade';
      toast.error(`Falha ao atualizar: ${errorMessage}`);
      throw err;
    }
  };

  useEffect(() => {
    loadOportunidades();
  }, [loadOportunidades]);

  return { oportunidades, loading, error, loadOportunidades, createOportunidade, updateOportunidade };
};
