import React from 'react';
import { Contrato, ContratoPeriodicidade, ContratoVencimentoRegra } from '../../../types';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { GlassInput } from '../../ui/GlassInput';

interface FaturamentoTabProps {
  formData: Partial<Contrato>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Contrato>>>;
}

export const FaturamentoTab: React.FC<FaturamentoTabProps> = ({ formData, setFormData }) => {
  const handleChange = (field: keyof Contrato, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCurrencyChange = (unmaskedValue: string) => {
    const value = parseFloat(unmaskedValue);
    handleChange('valor', isNaN(value) ? 0 : value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper label="Valor *">
          <CurrencyInput value={formData.valor ?? 0} onAccept={handleCurrencyChange} />
        </InputWrapper>
        <InputWrapper label="Periodicidade *">
          <select
            className="glass-input"
            value={formData.periodicidade}
            onChange={(e) => handleChange('periodicidade', e.target.value as ContratoPeriodicidade)}
          >
            {Object.values(ContratoPeriodicidade).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </InputWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper label="Regra de Vencimento *">
          <select
            className="glass-input"
            value={formData.vencimentoRegra}
            onChange={(e) => handleChange('vencimentoRegra', e.target.value as ContratoVencimentoRegra)}
          >
            {Object.values(ContratoVencimentoRegra).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </InputWrapper>
        <InputWrapper label="Dia do Vencimento *">
          <GlassInput
            type="number"
            value={formData.diaVencimento || ''}
            onChange={(e) => {
              const dia = parseInt(e.target.value, 10);
              handleChange('diaVencimento', isNaN(dia) ? '' : Math.max(1, Math.min(31, dia)));
            }}
            min="1"
            max="31"
          />
        </InputWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <InputWrapper label="Categoria Financeira">
            <GlassInput placeholder="Selecione" value={formData.categoriaId || ''} onChange={(e) => handleChange('categoriaId', e.target.value)} />
        </InputWrapper>
         <InputWrapper label="Forma de Recebimento">
            <GlassInput placeholder="Selecione" value={formData.formaRecebimento || ''} onChange={(e) => handleChange('formaRecebimento', e.target.value)} />
        </InputWrapper>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={formData.emitirNf}
            onChange={(e) => handleChange('emitirNf', e.target.checked)}
          />
          <span className="text-sm text-gray-700">Emitir Nota Fiscal de Serviço automaticamente</span>
        </label>
      </div>
    </div>
  );
};
