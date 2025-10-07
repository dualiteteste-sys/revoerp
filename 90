import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface TotaisSectionProps {
  control: Control<PedidoVendaFormData>;
  totalItens: number;
  somaQuantidades: number;
}

export const TotaisSection: React.FC<TotaisSectionProps> = ({ control, totalItens, somaQuantidades }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Totais</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InputWrapper label="Nº de itens"><GlassInput value={totalItens} disabled /></InputWrapper>
        <InputWrapper label="Soma das qtes"><GlassInput value={somaQuantidades} disabled /></InputWrapper>
        <Controller name="pesoBruto" control={control} render={({ field }) => (
          <InputWrapper label="Peso Bruto (kg)"><GlassInput {...field} value={(field.value || 0).toFixed(3)} disabled /></InputWrapper>
        )} />
        <Controller name="pesoLiquido" control={control} render={({ field }) => (
          <InputWrapper label="Peso Líquido (kg)"><GlassInput {...field} value={(field.value || 0).toFixed(3)} disabled /></InputWrapper>
        )} />
        <Controller name="totalProdutos" control={control} render={({ field }) => (
          <InputWrapper label="Total produtos"><CurrencyInput value={field.value || 0} onAccept={() => {}} disabled /></InputWrapper>
        )} />
        <Controller name="valorIpi" control={control} render={({ field }) => (
          <InputWrapper label="Valor IPI"><CurrencyInput value={field.value || 0} onAccept={() => {}} disabled /></InputWrapper>
        )} />
        <Controller name="valorIcmsSt" control={control} render={({ field }) => (
          <InputWrapper label="Valor ICMS ST + FCP ST"><CurrencyInput value={field.value || 0} onAccept={() => {}} disabled /></InputWrapper>
        )} />
        <Controller name="valorTotal" control={control} render={({ field }) => (
          <InputWrapper label="Total da venda"><CurrencyInput value={field.value || 0} onAccept={() => {}} disabled className="font-bold text-lg" /></InputWrapper>
        )} />
      </div>
      <h4 className="font-semibold text-gray-700 mt-6 mb-2">Ajustes de preço/custos</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Controller name="desconto" control={control} render={({ field }) => (
          <InputWrapper label="Desconto" helpText="Ex: 3,00 ou 10%"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="freteCliente" control={control} render={({ field }) => (
          <InputWrapper label="Frete pago pelo cliente"><CurrencyInput value={field.value || 0} onAccept={(v) => field.onChange(parseFloat(v))} /></InputWrapper>
        )} />
        <Controller name="freteEmpresa" control={control} render={({ field }) => (
          <InputWrapper label="Frete pago pela empresa"><CurrencyInput value={field.value || 0} onAccept={(v) => field.onChange(parseFloat(v))} /></InputWrapper>
        )} />
        <Controller name="despesas" control={control} render={({ field }) => (
          <InputWrapper label="Despesas"><CurrencyInput value={field.value || 0} onAccept={(v) => field.onChange(parseFloat(v))} /></InputWrapper>
        )} />
      </div>
    </section>
  );
};
