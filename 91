import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { InputWrapper } from '../../ui/InputWrapper';

interface TransporteSectionProps {
  control: Control<PedidoVendaFormData>;
}

export const TransporteSection: React.FC<TransporteSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Transportador / Volumes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller name="formaEnvio" control={control} render={({ field }) => (
          <InputWrapper label="Forma de envio">
            <select className="glass-input" {...field} value={field.value || 'Não definida'}>
              <option>Não definida</option>
              <option>Correios</option>
              <option>Transportadora</option>
            </select>
          </InputWrapper>
        )} />
        <Controller name="enviarParaExpedicao" control={control} render={({ field }) => (
          <InputWrapper label="Enviar para expedição">
            <select className="glass-input" value={field.value ? 'Sim' : 'Não'} onChange={e => field.onChange(e.target.value === 'Sim')}>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </InputWrapper>
        )} />
      </div>
    </section>
  );
};
