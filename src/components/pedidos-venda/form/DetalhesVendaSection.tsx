import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface DetalhesVendaSectionProps {
  control: Control<PedidoVendaFormData>;
}

export const DetalhesVendaSection: React.FC<DetalhesVendaSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Detalhes da Venda</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Controller name="dataPrevistaEntrega" control={control} render={({ field }) => (
          <InputWrapper label="Data prevista de entrega">
            <GlassInput type="date" value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} />
          </InputWrapper>
        )} />
        <Controller name="dataEnvio" control={control} render={({ field }) => (
          <InputWrapper label="Data de envio">
            <GlassInput type="datetime-local" value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''} onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} />
          </InputWrapper>
        )} />
        <Controller name="dataMaximaDespacho" control={control} render={({ field }) => (
          <InputWrapper label="Data máxima de despacho" helpIcon>
            <GlassInput type="datetime-local" value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ''} onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} />
          </InputWrapper>
        )} />
        <Controller name="numeroPedidoEcommerce" control={control} render={({ field }) => (
          <InputWrapper label="Nº pedido e-commerce"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="identificadorPedidoEcommerce" control={control} render={({ field }) => (
          <InputWrapper label="Identificador do pedido e-commerce"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="numeroPedidoCanalVenda" control={control} render={({ field }) => (
          <InputWrapper label="Nº do pedido no canal de venda"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="intermediador" control={control} render={({ field }) => (
          <InputWrapper label="Intermediador">
            <select className="glass-input" {...field} value={field.value || 'Sem intermediador'}>
              <option>Sem intermediador</option>
              <option>Mercado Livre</option>
              <option>Shopee</option>
            </select>
          </InputWrapper>
        )} />
      </div>
    </section>
  );
};
