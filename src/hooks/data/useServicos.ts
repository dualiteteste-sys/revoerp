import { useCrud } from '../useCrud';
import { Servico } from '../../types';

export const useServicos = () => {
  const { 
    items: servicos, 
    loading, 
    error, 
    createItem: createServico, 
    updateItem: updateServico, 
    deleteItem: deleteServico,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<Servico>({ entityName: 'servico' });

  return {
    servicos,
    loading,
    error,
    createServico,
    updateServico,
    deleteServico,
    currentPage,
    totalPages,
    goToPage
  };
};
