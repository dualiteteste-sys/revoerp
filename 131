import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { VendedorFormData } from '../../../schemas/vendedorSchema';
import { RegraComissao, TipoComissaoVendedor } from '../../../types';
import { PercentageInput } from '../../ui/PercentageInput';
import { InputWrapper } from '../../ui/InputWrapper';

const RadioWrapper: React.FC<{ label: string; name: string; value: string; checked: boolean; onChange: (value: string) => void; }> = ({ label, name, value, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" name={name} value={value} checked={checked} onChange={(e) => onChange(e.target.value)} className="form-radio" />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

interface ComissionamentoSectionProps {
  control: Control<VendedorFormData>;
}

export const ComissionamentoSection: React.FC<ComissionamentoSectionProps> = ({ control }) => {
  const tipoComissao = control._getWatch('tipoComissao');

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Comissionamento</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="regraLiberacaoComissao"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Regras para liberação de comissões">
              <select className="glass-input" {...field}>
                {Object.values(RegraComissao).map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </InputWrapper>
          )}
        />
        <div className="space-y-4">
          <Controller
            name="tipoComissao"
            control={control}
            render={({ field }) => (
              <InputWrapper label="Tipo de comissão">
                <div className="flex gap-6">
                  <RadioWrapper label="Comissão com alíquota fixa" name="tipoComissao" value={TipoComissaoVendedor.FIXA} checked={field.value === TipoComissaoVendedor.FIXA} onChange={field.onChange} />
                  <RadioWrapper label="Comissão com alíquota conforme descontos" name="tipoComissao" value={TipoComissaoVendedor.POR_DESCONTO} checked={field.value === TipoComissaoVendedor.POR_DESCONTO} onChange={field.onChange} />
                </div>
              </InputWrapper>
            )}
          />
          {tipoComissao === TipoComissaoVendedor.FIXA && (
            <Controller
              name="aliquotaComissao"
              control={control}
              render={({ field }) => (
                <InputWrapper label="Alíquota de comissão (%)">
                  <PercentageInput value={field.value ?? 0} onAccept={(v) => field.onChange(parseFloat(v))} />
                </InputWrapper>
              )}
            />
          )}
        </div>
      </div>
      <div className="mt-6">
        <Controller
          name="desconsiderarComissaoLinhaProduto"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={field.value} onChange={field.onChange} className="form-checkbox" />
              <span className="text-sm text-gray-700">Desconsiderar comissionamento por linhas de produto para este vendedor</span>
            </label>
          )}
        />
      </div>
    </section>
  );
};
