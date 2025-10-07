import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { VendedorFormData } from '../../../schemas/vendedorSchema';
import { InputWrapper } from '../../ui/InputWrapper';

interface ObservacoesSectionProps {
  control: Control<VendedorFormData>;
}

export const ObservacoesSection: React.FC<ObservacoesSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Observações</h3>
      <Controller
        name="observacoes"
        control={control}
        render={({ field }) => (
          <InputWrapper label="Observações Gerais">
            <textarea
              {...field}
              value={field.value || ''}
              className="glass-input w-full h-32 resize-y"
              placeholder="Adicione qualquer observação relevante sobre este vendedor..."
            />
          </InputWrapper>
        )}
      />
    </section>
  );
};
