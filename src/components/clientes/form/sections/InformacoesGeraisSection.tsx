import React from 'react';
import { Control, Controller, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { TipoPessoa, ContribuinteICMS } from '../../../../types';
import { GlassInput } from '../../../ui/GlassInput';
import { InputWrapper } from '../../../ui/InputWrapper';
import { ClienteFormData } from '../../../../schemas/clienteSchema';

interface InformacoesGeraisSectionProps {
  control: Control<ClienteFormData>;
  watch: UseFormWatch<ClienteFormData>;
  setValue: UseFormSetValue<ClienteFormData>;
}

const contribuinteLabels: Record<string, string> = {
  'CONTRIBUINTE': '1 - Contribuinte ICMS',
  'CONTRIBUINTE_ISENTO': '2 - Contribuinte isento de Inscrição',
  'NAO_CONTRIBUINTE': '9 - Não Contribuinte',
};

export const InformacoesGeraisSection: React.FC<InformacoesGeraisSectionProps> = ({ control, watch, setValue }) => {
  const tipoPessoa = watch('tipoPessoa');

  const isCliente = watch('isCliente');
  const isFornecedor = watch('isFornecedor');
  const isTransportadora = watch('isTransportadora');

  let contactType = 'Cliente'; // Default
  if (isFornecedor) contactType = 'Fornecedor';
  if (isTransportadora) contactType = 'Transportadora';

  const handleContactTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue('isCliente', value === 'Cliente');
    setValue('isFornecedor', value === 'Fornecedor');
    setValue('isTransportadora', value === 'Transportadora');
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Informações Gerais</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Controller
          name="tipoPessoa"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Tipo de Pessoa *">
              <select className="glass-input" {...field}>
                {Object.values(TipoPessoa).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </InputWrapper>
          )}
        />
        {tipoPessoa === TipoPessoa.FISICA ? (
          <>
            <Controller name="cpfCnpj" control={control} render={({ field, fieldState }) => (
              <InputWrapper label="CPF" error={fieldState.error?.message}>
                <IMaskInput mask="000.000.000-00" value={field.value || ''} onAccept={field.onChange} className="glass-input" />
              </InputWrapper>
            )} />
            <Controller name="rg" control={control} render={({ field }) => (
              <InputWrapper label="RG">
                <GlassInput {...field} value={field.value || ''} maxLength={20} />
              </InputWrapper>
            )} />
            <Controller name="nome" control={control} render={({ field, fieldState }) => (
              <InputWrapper label="Nome *" error={fieldState.error?.message}>
                <GlassInput {...field} value={field.value || ''} maxLength={120} />
              </InputWrapper>
            )} />
          </>
        ) : (
          <>
            <Controller name="cpfCnpj" control={control} render={({ field, fieldState }) => (
              <InputWrapper label="CNPJ" error={fieldState.error?.message}>
                <IMaskInput mask="00.000.000/0000-00" value={field.value || ''} onAccept={field.onChange} className="glass-input" />
              </InputWrapper>
            )} />
            <Controller name="inscricaoEstadual" control={control} render={({ field }) => (
              <InputWrapper label="Inscrição Estadual">
                <GlassInput {...field} value={field.value || ''} maxLength={20} />
              </InputWrapper>
            )} />
            <Controller name="nome" control={control} render={({ field, fieldState }) => (
              <InputWrapper label="Razão Social *" error={fieldState.error?.message}>
                <GlassInput {...field} value={field.value || ''} maxLength={120} />
              </InputWrapper>
            )} />
          </>
        )}
        <Controller name="codigo" control={control} render={({ field }) => (
          <InputWrapper label="Código">
            <GlassInput {...field} value={field.value || ''} />
          </InputWrapper>
        )} />
        <Controller
          name="contribuinteIcms"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Contribuinte ICMS">
              <select className="glass-input" {...field} value={field.value || ''}>
                {Object.entries(contribuinteLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </InputWrapper>
          )}
        />
        <div className="lg:col-span-2">
          <InputWrapper label="Tipo de Contato">
            <select className="glass-input" value={contactType} onChange={handleContactTypeChange}>
              <option value="Cliente">Cliente</option>
              <option value="Fornecedor">Fornecedor</option>
              <option value="Transportadora">Transportadora</option>
            </select>
          </InputWrapper>
        </div>
      </div>
    </section>
  );
};
