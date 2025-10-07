import React from 'react';
import { OrdemCompra } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { GlassButton } from '../../ui/GlassButton';
import { InputWrapper } from '../../ui/InputWrapper';

interface DetalhesPagamentoSectionProps {
  formData: Partial<OrdemCompra>;
  handleChange: (field: keyof OrdemCompra, value: any) => void;
}

export const DetalhesPagamentoSection: React.FC<DetalhesPagamentoSectionProps> = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Detalhes da Compra</h3>
        <div className="space-y-4">
          <InputWrapper label="Nº no fornecedor"><GlassInput placeholder="Número" value={formData.numeroNoFornecedor || ''} onChange={e => handleChange('numeroNoFornecedor', e.target.value)} /></InputWrapper>
          <InputWrapper label="Data da compra"><GlassInput type="date" value={new Date(formData.dataCompra || Date.now()).toISOString().split('T')[0]} onChange={e => handleChange('dataCompra', new Date(e.target.value))} /></InputWrapper>
          <InputWrapper label="Data prevista"><GlassInput type="date" value={formData.dataPrevista ? new Date(formData.dataPrevista).toISOString().split('T')[0] : ''} onChange={e => handleChange('dataPrevista', e.target.value ? new Date(e.target.value) : undefined)} /></InputWrapper>
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Pagamento</h3>
        <div className="space-y-4">
          <InputWrapper label="Condição de pagamento" helpText="Ex: 30 60, 3x ou 15 +2x">
            <div className="flex gap-2">
              <GlassInput value={formData.condicaoPagamento || ''} onChange={e => handleChange('condicaoPagamento', e.target.value)} />
              <GlassButton type="button">Gerar Parcelas</GlassButton>
            </div>
          </InputWrapper>
          <InputWrapper label="Categoria da despesa">
            <GlassInput placeholder="Selecione" value={formData.categoriaId || ''} onChange={e => handleChange('categoriaId', e.target.value)} />
          </InputWrapper>
        </div>
      </section>
    </div>
  );
};
