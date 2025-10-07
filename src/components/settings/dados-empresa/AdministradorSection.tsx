import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { IMaskInput } from 'react-imask';
import { DadosEmpresaFormData } from '../../../schemas/dadosEmpresaSchema';

interface AdministradorSectionProps {
  control: Control<DadosEmpresaFormData>;
}

export const AdministradorSection: React.FC<AdministradorSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-white/30 pb-3">Pessoa administradora da empresa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="administrador.nome"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Nome do sócio administrador" helpText="Responsável legal/administrativo." error={error?.message}>
              <GlassInput {...field} value={field.value || ''} maxLength={120} />
            </InputWrapper>
          )}
        />
        <Controller
          name="administrador.email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="E-mail (administrador)" helpText="Contato do responsável." error={error?.message}>
              <GlassInput type="email" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="administrador.celular"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Celular (administrador)" helpText="WhatsApp do responsável (opcional).">
              <IMaskInput mask="(00) 90000-0000" className="glass-input" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
