import { useState, useCallback, useEffect } from 'react';

/**
 * Um hook genérico para gerenciar o estado de formulários.
 * @param getInitialData Uma função que retorna o estado inicial do formulário.
 */
export const useFormState = <T extends object>(getInitialData: () => Partial<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(getInitialData);

  // Redefine o estado do formulário se a função de dados iniciais mudar (ex: ao editar um item diferente)
  useEffect(() => {
    setFormData(getInitialData());
  }, [getInitialData]);

  const handleChange = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
  };
};
