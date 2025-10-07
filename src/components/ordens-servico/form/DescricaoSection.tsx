import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { OrdemServicoFormData } from '../../../schemas/ordemServicoSchema';
import { InputWrapper } from '../../ui/InputWrapper';

interface DescricaoSectionProps {
  control: Control<OrdemServicoFormData>;
}

export const DescricaoSection: React.FC<DescricaoSectionProps> = ({ control }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="descricaoServico"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Descrição do serviço">
              <textarea className="glass-input h-24 resize-y" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="consideracoesFinais"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Considerações finais">
              <textarea className="glass-input h-24 resize-y" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
