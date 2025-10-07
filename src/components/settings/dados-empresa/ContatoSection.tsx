import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { IMaskInput } from 'react-imask';
import { DadosEmpresaFormData } from '../../../schemas/dadosEmpresaSchema';

interface ContatoSectionProps {
  control: Control<DadosEmpresaFormData>;
}

export const ContatoSection: React.FC<ContatoSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-white/30 pb-3">Contato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Controller
          name="contato.fone"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Fone" helpText="Telefone fixo opcional.">
              <IMaskInput mask="(00) 0000-0000" className="glass-input" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="contato.fax"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Fax" helpText="Se aplicável.">
              <IMaskInput mask="(00) 0000-0000" className="glass-input" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="contato.celular"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Celular" helpText="Número com 9 dígitos.">
              <IMaskInput mask="(00) 90000-0000" className="glass-input" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="contato.email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="E-mail" helpText="Usado para contato e documentos." error={error?.message}>
              <GlassInput type="email" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="contato.website"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="WebSite" helpText="Incluiremos https:// automaticamente." className="lg:col-span-2" error={error?.message}>
              <GlassInput type="url" {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
