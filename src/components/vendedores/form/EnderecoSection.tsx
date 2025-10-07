import React from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { VendedorFormData } from '../../../schemas/vendedorSchema';
import { useCep } from '../../../hooks/useCep';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface EnderecoSectionProps {
  control: Control<VendedorFormData>;
  setValue: UseFormSetValue<VendedorFormData>;
}

export const EnderecoSection: React.FC<EnderecoSectionProps> = ({ control, setValue }) => {
  const { handleBuscaCep } = useCep(setValue);

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Endereço</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <InputWrapper label="CEP">
              <IMaskInput
                mask="00000-000"
                value={field.value || ''}
                onAccept={(v) => { field.onChange(v); if ((v as string).replace(/\D/g, '').length === 8) handleBuscaCep(v as string); }}
                className="glass-input"
              />
            </InputWrapper>
          )}
        />
        <Controller
          name="cidade"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Cidade" className="md:col-span-2">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="uf"
          control={control}
          render={({ field }) => (
            <InputWrapper label="UF">
              <GlassInput {...field} value={field.value || ''} maxLength={2} />
            </InputWrapper>
          )}
        />
        <Controller
          name="logradouro"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Endereço" className="md:col-span-3">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Número">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="bairro"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Bairro" className="md:col-span-2">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="complemento"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Complemento">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
