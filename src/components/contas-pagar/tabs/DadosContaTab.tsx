import React, { useState, useEffect, useCallback } from 'react';
import { ContaPagar } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';

interface DadosContaTabProps {
  formData: Partial<ContaPagar>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ContaPagar>>>;
}

export const DadosContaTab: React.FC<DadosContaTabProps> = ({ formData, setFormData }) => {
  const clienteService = useService('cliente');
  const [initialFornecedorLabel, setInitialFornecedorLabel] = useState('');

  useEffect(() => {
    if (formData.fornecedorId) {
      clienteService.getById(formData.fornecedorId).then(fornecedor => {
        if (fornecedor) setInitialFornecedorLabel(fornecedor.nome);
      });
    }
  }, [formData.fornecedorId, clienteService]);

  const handleChange = (field: keyof ContaPagar, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCurrencyChange = (unmaskedValue: string) => {
    const value = parseFloat(unmaskedValue);
    handleChange('valor', isNaN(value) ? 0 : value);
  };
  
  const fetchFornecedores = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'fornecedor');
    return results.map(f => ({ value: f.id, label: f.nome }));
  }, [clienteService]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper label="Forma de Pagamento *">
          <GlassInput placeholder="Selecione" value={formData.formaPagamento || ''} onChange={(e) => handleChange('formaPagamento', e.target.value)} />
        </InputWrapper>
        <InputWrapper label="Fornecedor *">
          <AutocompleteInput
            value={formData.fornecedorId || ''}
            onValueChange={(id) => handleChange('fornecedorId', id)}
            fetchSuggestions={fetchFornecedores}
            initialLabel={initialFornecedorLabel}
            placeholder="Digite para buscar um fornecedor..."
          />
        </InputWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper label="Vencimento *">
          <GlassInput type="date" value={formData.dataVencimento ? new Date(formData.dataVencimento).toISOString().split('T')[0] : ''} onChange={(e) => handleChange('dataVencimento', new Date(e.target.value))} />
        </InputWrapper>
        <InputWrapper label="Valor *">
          <CurrencyInput value={formData.valor ?? 0} onAccept={handleCurrencyChange} />
        </InputWrapper>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper label="Data de emissão">
          <GlassInput type="date" value={formData.createdAt ? new Date(formData.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} onChange={(e) => handleChange('createdAt', new Date(e.target.value))} />
        </InputWrapper>
        <InputWrapper label="Nº do documento">
          <GlassInput value={formData.numeroDocumento || ''} onChange={(e) => handleChange('numeroDocumento', e.target.value)} />
        </InputWrapper>
      </div>
      <InputWrapper label="Histórico">
        <textarea className="glass-input h-24 resize-y" value={formData.historico || ''} onChange={(e) => handleChange('historico', e.target.value)} />
      </InputWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper label="Categoria">
          <GlassInput placeholder="Selecione" value={formData.categoriaId || ''} onChange={(e) => handleChange('categoriaId', e.target.value)} />
        </InputWrapper>
        <InputWrapper label="Ocorrência">
          <select className="glass-input" value={formData.ocorrencia || ''} onChange={(e) => handleChange('ocorrencia', e.target.value)}>
            <option>Única</option>
            <option>Recorrente</option>
          </select>
        </InputWrapper>
      </div>
    </div>
  );
};
