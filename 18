import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ClienteFormData } from '../../../schemas/clienteSchema';

interface ObservacoesTabProps {
  register: UseFormRegister<ClienteFormData>;
}

export const ObservacoesTab: React.FC<ObservacoesTabProps> = ({ register }) => {
  return (
    <div>
      <label htmlFor="observacoes-gerais" className="text-sm text-gray-600 mb-1 block">Observações Gerais</label>
      <textarea
        id="observacoes-gerais"
        {...register('observacoes')}
        className="glass-input w-full h-64 resize-y"
        placeholder="Adicione qualquer observação relevante sobre este contato..."
      />
    </div>
  );
};
