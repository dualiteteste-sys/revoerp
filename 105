import React from 'react';
import { Control, Controller, useWatch } from 'react-hook-form';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { IMaskInput } from 'react-imask';
import { DadosEmpresaFormData } from '../../../schemas/dadosEmpresaSchema';

const ufs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

interface EnderecoSectionProps {
  control: Control<DadosEmpresaFormData>;
}

export const EnderecoSection: React.FC<EnderecoSectionProps> = ({ control }) => {
  const semNumero = useWatch({ control, name: 'endereco.semNumero' });

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-white/30 pb-3">Endereço</h3>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <Controller
          name="endereco.cep"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="CEP" helpText="Digite apenas números." className="md:col-span-2" error={error?.message}>
              <IMaskInput mask="00000-000" className="glass-input" {...field} required />
            </InputWrapper>
          )}
        />
        <Controller
          name="endereco.logradouro"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Endereço (logradouro)" helpText="Informe rua/avenida/estrada sem número." className="md:col-span-4" error={error?.message}>
              <GlassInput {...field} maxLength={120} required />
            </InputWrapper>
          )}
        />
        <Controller
          name="endereco.numero"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Número" helpText="Marque 'S/N' se não houver número." className="md:col-span-2" error={error?.message}>
              <div className="flex items-center gap-2">
                <GlassInput {...field} value={field.value || ''} maxLength={10} disabled={semNumero} />
                <Controller
                  name="endereco.semNumero"
                  control={control}
                  render={({ field: checkboxField }) => (
                    <label className="flex items-center gap-1 text-sm">
                      <input type="checkbox" className="form-checkbox" checked={checkboxField.value || false} onChange={checkboxField.onChange} /> S/N
                    </label>
                  )}
                />
              </div>
            </InputWrapper>
          )}
        />
        <Controller
          name="endereco.complemento"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Complemento" helpText="Informações adicionais do endereço." className="md:col-span-2" error={error?.message}>
              <GlassInput {...field} value={field.value || ''} maxLength={60} />
            </InputWrapper>
          )}
        />
        <Controller
          name="endereco.bairro"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Bairro" helpText="Bairro/distrito da empresa." className="md:col-span-2" error={error?.message}>
              <GlassInput {...field} maxLength={60} required />
            </InputWrapper>
          )}
        />
        <Controller
          name="endereco.cidade"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Cidade" helpText="Cidade do endereço fiscal." className="md:col-span-3" error={error?.message}>
              <GlassInput {...field} maxLength={60} required />
            </InputWrapper>
          )}
        />
        <Controller
          name="endereco.uf"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="UF" helpText="Estado (27 UFs)." className="md:col-span-1" error={error?.message}>
              <select className="glass-input" {...field} required>
                <option value="">Selecione</option>
                {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
