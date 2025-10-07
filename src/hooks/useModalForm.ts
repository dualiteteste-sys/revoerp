import { useState, useCallback } from 'react';

/**
 * Hook para gerenciar o estado de um formulário em um modal.
 * Encapsula a lógica de abrir, fechar e rastrear o item em edição.
 */
export const useModalForm = <T>() => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | undefined>();

  const handleOpenCreateForm = useCallback(() => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  }, []);

  const handleOpenEditForm = useCallback((item: T) => {
    setEditingItem(item);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    // Atraso para permitir a animação de saída antes de limpar os dados
    setTimeout(() => setEditingItem(undefined), 300);
  }, []);

  return {
    isFormOpen,
    editingItem,
    handleOpenCreateForm,
    handleOpenEditForm,
    handleCloseForm,
  };
};
