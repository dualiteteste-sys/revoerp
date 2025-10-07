import { useCrud } from '../useCrud';
import { Contrato } from '../../types';

export const useContratos = () => {
  const { 
    items: contratos, 
    loading, 
    error, 
    createItem: createContrato, 
    updateItem: updateContrato, 
    deleteItem: deleteContrato,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<Contrato>({ entityName: 'contrato' });

  return {
    contratos,
    loading,
    error,
    createContrato,
    updateContrato,
    deleteContrato,
    currentPage,
    totalPages,
    goToPage
  };
};
