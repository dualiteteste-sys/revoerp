import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { VendedorFormData } from '../../../schemas/vendedorSchema';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface ContatoSectionProps {
  control: Control<VendedorFormData>;
}

export const ContatoSection: React.FC<ContatoSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Contatos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Telefone">
              <IMaskInput mask="(00) 0000-0000" value={field.value || ''} onAccept={field.onChange} className="glass-input" />
            </InputWrapper>
          )}
        />
        <Controller
          name="celular"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Celular">
              <IMaskInput mask="(00) 00000-0000" value={field.value || ''} onAccept={field.onChange} className="glass-input" />
            </InputWrapper>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <InputWrapper label="Email *" error={fieldState.error?.message}>
              <GlassInput type="email" {...field} />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
