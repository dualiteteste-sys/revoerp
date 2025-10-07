import React from 'react';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { NotaEntrada } from '../../../types';

interface TotaisObservacoesSectionProps {
  formData: Partial<NotaEntrada>;
  handleChange: (field: keyof NotaEntrada, value: any) => void;
}

export const TotaisObservacoesSection: React.FC<TotaisObservacoesSectionProps> = ({ formData, handleChange }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <InputWrapper label="Observações">
          <textarea
            className="glass-input h-24 resize-y"
            value={formData.observacoes || ''}
            onChange={e => handleChange('observacoes', e.target.value)}
          />
        </InputWrapper>
        <div className="p-4 bg-glass-50 rounded-xl border border-white/20 flex flex-col justify-center items-end">
          <p className="text-sm text-gray-600">Valor Total da Nota</p>
          <p className="text-3xl font-bold text-gray-800">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formData.valorTotal || 0)}
          </p>
        </div>
      </div>
    </section>
  );
};
