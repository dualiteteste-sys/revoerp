import React from 'react';
import { OrdemCompra, FretePorConta } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface TransporteObservacoesSectionProps {
  formData: Partial<OrdemCompra>;
  handleChange: (field: keyof OrdemCompra, value: any) => void;
}

export const TransporteObservacoesSection: React.FC<TransporteObservacoesSectionProps> = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Transportador</h3>
        <div className="space-y-4">
          <InputWrapper label="Nome"><GlassInput value={formData.transportadorNome || ''} onChange={e => handleChange('transportadorNome', e.target.value)} /></InputWrapper>
          <InputWrapper label="Frete por conta">
            <select className="glass-input" value={formData.fretePorConta} onChange={e => handleChange('fretePorConta', e.target.value as FretePorConta)}>
              {Object.values(FretePorConta).map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </InputWrapper>
        </div>
      </section>
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Observações</h3>
        <div className="space-y-4">
          <InputWrapper label="Observações"><textarea className="glass-input h-20 resize-y" value={formData.observacoes || ''} onChange={e => handleChange('observacoes', e.target.value)} /></InputWrapper>
          <InputWrapper label="Observações Internas"><textarea className="glass-input h-20 resize-y" value={formData.observacoesInternas || ''} onChange={e => handleChange('observacoesInternas', e.target.value)} /></InputWrapper>
          <InputWrapper label="Marcadores" helpText="Separados por vírgula ou tab"><GlassInput value={(formData.marcadores || []).join(', ')} onChange={e => handleChange('marcadores', e.target.value.split(',').map(m => m.trim()))} /></InputWrapper>
        </div>
      </section>
    </div>
  );
};
