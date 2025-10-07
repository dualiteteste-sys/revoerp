import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { DadosEmpresaFormData } from '../../../schemas/dadosEmpresaSchema';

interface PreferenciasContatoSectionProps {
  control: Control<DadosEmpresaFormData>;
}

export const PreferenciasContatoSection: React.FC<PreferenciasContatoSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-white/30 pb-3">Preferências de contato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="preferenciasContato.comoChamar"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Como deseja ser chamado" helpText="Nome de tratamento usado em comunicações." error={error?.message}>
              <GlassInput {...field} value={field.value || ''} maxLength={60} />
            </InputWrapper>
          )}
        />
        <Controller
          name="preferenciasContato.canais"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Canal de Comunicação" helpText="Escolha como prefere receber nosso contato.">
              <GlassInput {...field} value={field.value || ''} placeholder="Email, Telefone, WhatsApp, SMS..." />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
