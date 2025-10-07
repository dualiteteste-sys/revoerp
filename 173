import { useCrud } from '../useCrud';
import { Embalagem } from '../../types';

export const useEmbalagens = () => {
  const { 
    items: embalagens, 
    loading, 
    error, 
    createItem: createEmbalagem, 
    updateItem: updateEmbalagem, 
    deleteItem: deleteEmbalagem,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<Embalagem>({ entityName: 'embalagem', initialPageSize: 25 });

  return {
    embalagens,
    loading,
    error,
    createEmbalagem,
    updateEmbalagem,
    deleteEmbalagem,
    currentPage,
    totalPages,
    goToPage
  };
};
