import { useCrud } from '../useCrud';
import { Produto } from '../../types';

export const useProdutos = () => {
  const { 
    items: produtos, 
    loading, 
    error, 
    createItem: createProduto, 
    updateItem: updateProduto, 
    deleteItem: deleteProduto,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<Produto>({ entityName: 'produto' });

  return {
    produtos,
    loading,
    error,
    createProduto,
    updateProduto,
    deleteProduto,
    currentPage,
    totalPages,
    goToPage
  };
};
