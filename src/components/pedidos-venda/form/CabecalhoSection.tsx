import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface CabecalhoSectionProps {
  control: Control<PedidoVendaFormData>;
}

export const CabecalhoSection: React.FC<CabecalhoSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Dados Gerais</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          name="naturezaOperacao"
          control={control}
          render={({ field, fieldState }) => (
            <InputWrapper label="Natureza da operação *" error={fieldState.error?.message}>
              <GlassInput {...field} />
            </InputWrapper>
          )}
        />
        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Número">
              <GlassInput {...field} value={field.value || ''} disabled />
            </InputWrapper>
          )}
        />
        <Controller
          name="dataVenda"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Data da venda *">
              <GlassInput
                type="date"
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : new Date())}
              />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
