import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { GlassInput } from '../../ui/GlassInput';
import { GlassButton } from '../../ui/GlassButton';
import { InputWrapper } from '../../ui/InputWrapper';

interface PagamentoSectionProps {
  control: Control<PedidoVendaFormData>;
}

export const PagamentoSection: React.FC<PagamentoSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Pagamento</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller name="formaRecebimento" control={control} render={({ field }) => (
          <InputWrapper label="Forma de recebimento"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="meioPagamento" control={control} render={({ field }) => (
          <InputWrapper label="Meio"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="contaBancaria" control={control} render={({ field }) => (
          <InputWrapper label="Conta bancária"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="categoriaFinanceira" control={control} render={({ field }) => (
          <InputWrapper label="Categoria"><GlassInput placeholder="Selecione" {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <div className="md:col-span-2">
          <Controller name="condicaoPagamento" control={control} render={({ field }) => (
            <InputWrapper label="Condição de pagamento" helpText="Exemplos: 30 60, 3x ou 15 +2x">
              <div className="flex gap-2">
                <GlassInput {...field} value={field.value || ''} />
                <GlassButton type="button">Gerar Parcelas</GlassButton>
              </div>
            </InputWrapper>
          )} />
        </div>
      </div>
    </section>
  );
};
