import { useState, useEffect, useCallback } from 'react';
import { IEntity } from '../types';
import toast from 'react-hot-toast';
import { useService } from './useService';
import { ServiceContainer } from '../contexts/ServiceContext';

interface ICrudService<T extends IEntity> {
  getAll(options?: { page?: number; pageSize?: number }): Promise<{ data: T[]; count: number }>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

type ServiceName = keyof Pick<ServiceContainer, 'cliente' | 'produto' | 'servico' | 'vendedor' | 'embalagem' | 'contrato'>;

interface UseCrudOptions {
  entityName: ServiceName;
  initialPageSize?: number;
}

export const useCrud = <T extends IEntity>({ entityName, initialPageSize = 10 }: UseCrudOptions) => {
  const service = useService(entityName) as ICrudService<T>;
  
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / pageSize);

  const loadItems = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getAll({ page, pageSize });
      setItems(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Erro ao carregar ${entityName}(s)`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service, entityName, pageSize]);

  const createItem = async (data: Partial<T>) => {
    const promise = service.create(data);
    toast.promise(promise, {
      loading: `Criando ${entityName}...`,
      success: () => {
        loadItems(1);
        return `${entityName} criado com sucesso!`;
      },
      error: (err) => `Falha ao criar ${entityName}: ${err.message}`,
    });
    return promise;
  };

  const updateItem = async (id: string, data: Partial<T>) => {
    const promise = service.update(id, data);
    toast.promise(promise, {
      loading: `Atualizando ${entityName}...`,
      success: (updatedItem) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
        return `${entityName} atualizado com sucesso!`;
      },
      error: (err) => `Falha ao atualizar ${entityName}: ${err.message}`,
    });
    return promise;
  };

  const deleteItem = async (id: string) => {
    const promise = service.delete(id);
    toast.promise(promise, {
      loading: `Excluindo ${entityName}...`,
      success: () => {
        if (items.length === 1 && currentPage > 1) {
          loadItems(currentPage - 1);
        } else {
          loadItems(currentPage);
        }
        return `${entityName} excluído com sucesso!`;
      },
      error: (err) => `Falha ao excluir ${entityName}: ${err.message}`,
    });
    return promise;
  };

  useEffect(() => {
    loadItems(1);
  }, [loadItems]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadItems(page);
    }
  };

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    loadItems,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
  };
};
