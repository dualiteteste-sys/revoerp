import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { DadosEmpresaFormData } from '../../../schemas/dadosEmpresaSchema';

interface DadosEmpresaSectionProps {
  control: Control<DadosEmpresaFormData>;
}

export const DadosEmpresaSection: React.FC<DadosEmpresaSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-white/30 pb-3">Dados da empresa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="razaoSocial"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Razão social" helpText="Nome jurídico conforme CNPJ." error={error?.message}>
              <GlassInput {...field} maxLength={120} required />
            </InputWrapper>
          )}
        />
        <Controller
          name="nomeCompleto"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Nome completo da empresa" helpText="Opcional. Útil para relatórios e impressões." error={error?.message}>
              <GlassInput {...field} value={field.value || ''} maxLength={120} />
            </InputWrapper>
          )}
        />
        <Controller
          name="fantasia"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Fantasia" helpText="Será exibido no topo do sistema." error={error?.message}>
              <GlassInput {...field} value={field.value || ''} maxLength={60} />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
