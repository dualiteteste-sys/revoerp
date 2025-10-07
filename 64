import React from 'react';
import { OrdemCompra } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface TotaisSectionProps {
  formData: Partial<OrdemCompra>;
  handleChange: (field: keyof OrdemCompra, value: any) => void;
}

export const TotaisSection: React.FC<TotaisSectionProps> = ({ formData, handleChange }) => {
  const handleCurrencyChange = (field: keyof OrdemCompra, unmaskedValue: string) => {
    const value = parseFloat(unmaskedValue);
    handleChange(field, isNaN(value) ? undefined : value);
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Totais da Compra</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <InputWrapper label="Nº de itens"><GlassInput value={formData.itens?.length || 0} disabled /></InputWrapper>
        <InputWrapper label="Soma das qtes"><GlassInput value={(formData.itens || []).reduce((acc, i) => acc + i.quantidade, 0)} disabled /></InputWrapper>
        <InputWrapper label="Total dos produtos"><CurrencyInput value={formData.totalProdutos || 0} onAccept={() => {}} disabled /></InputWrapper>
        <InputWrapper label="Desconto"><GlassInput placeholder="0,00 ou 0%" value={formData.desconto || ''} onChange={e => handleChange('desconto', e.target.value)} /></InputWrapper>
        <InputWrapper label="Frete"><CurrencyInput value={formData.frete || 0} onAccept={v => handleCurrencyChange('frete', v)} /></InputWrapper>
        <InputWrapper label="Total do IPI"><CurrencyInput value={formData.totalIpi || 0} onAccept={() => {}} disabled /></InputWrapper>
        <InputWrapper label="Total ICMS ST"><CurrencyInput value={formData.totalIcmsSt || 0} onAccept={() => {}} disabled /></InputWrapper>
        <InputWrapper label="Total geral"><CurrencyInput value={formData.totalGeral || 0} onAccept={() => {}} disabled className="font-bold text-lg" /></InputWrapper>
      </div>
    </section>
  );
};
