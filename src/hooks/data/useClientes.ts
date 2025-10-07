import { useCrud } from '../useCrud';
import { Cliente } from '../../types';

export const useClientes = () => {
  const { 
    items: clientes, 
    loading, 
    error, 
    createItem: createCliente, 
    updateItem: updateCliente, 
    deleteItem: deleteCliente,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<Cliente>({ entityName: 'cliente' });

  return {
    clientes,
    loading,
    error,
    createCliente,
    updateCliente,
    deleteCliente,
    currentPage,
    totalPages,
    goToPage
  };
};
