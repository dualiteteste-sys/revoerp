import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { VendedorFormData } from '../../../schemas/vendedorSchema';
import { SituacaoVendedor } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface SituacaoSectionProps {
  control: Control<VendedorFormData>;
}

export const SituacaoSection: React.FC<SituacaoSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Situação / Depósito / E-mail para comunicações</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          name="situacao"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Situação">
              <select className="glass-input" {...field}>
                {Object.values(SituacaoVendedor).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </InputWrapper>
          )}
        />
        <Controller
          name="deposito"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Depósito">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="emailComunicacoes"
          control={control}
          render={({ field, fieldState }) => (
            <InputWrapper label="E-mail para comunicações" helpIcon error={fieldState.error?.message}>
              <GlassInput type="email" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
