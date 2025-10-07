import { useCrud } from '../useCrud';
import { Vendedor } from '../../types';

export const useVendedores = () => {
  const { 
    items: vendedores, 
    loading, 
    error, 
    createItem: createVendedor, 
    updateItem: updateVendedor, 
    deleteItem: deleteVendedor,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<Vendedor>({ entityName: 'vendedor' });

  return {
    vendedores,
    loading,
    error,
    createVendedor,
    updateVendedor,
    deleteVendedor,
    currentPage,
    totalPages,
    goToPage
  };
};
