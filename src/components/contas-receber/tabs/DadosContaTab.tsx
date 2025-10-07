import React, { useState, useEffect, useCallback } from 'react';
import { ContaReceber, OcorrenciaConta } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';

interface DadosContaTabProps {
  formData: Partial<ContaReceber>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ContaReceber>>>;
}

export const DadosContaTab: React.FC<DadosContaTabProps> = ({ formData, setFormData }) => {
  const clienteService = useService('cliente');
  const [initialClienteLabel, setInitialClienteLabel] = useState('');

  useEffect(() => {
    if (formData.clienteId) {
      clienteService.getById(formData.clienteId).then(cliente => {
        if (cliente) setInitialClienteLabel(cliente.nome);
      });
    }
  }, [formData.clienteId, clienteService]);

  const handleChange = (field: keyof ContaReceber, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCurrencyChange = (unmaskedValue: string) => {
    const value = parseFloat(unmaskedValue);
    handleChange('valor', isNaN(value) ? 0 : value);
  };

  const fetchClientes = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'cliente');
    return results.map(c => ({ value: c.id, label: c.nome }));
  }, [clienteService]);

  return (
    <div className="space-y-6">
      <InputWrapper label="Cliente *">
        <AutocompleteInput
          value={formData.clienteId || ''}
          onValueChange={(id) => handleChange('clienteId', id)}
          fetchSuggestions={fetchClientes}
          initialLabel={initialClienteLabel}
          placeholder="Digite para buscar um cliente..."
        />
      </InputWrapper>
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
        <InputWrapper label="Forma de recebimento">
          <GlassInput placeholder="Selecione" value={formData.formaRecebimento || ''} onChange={(e) => handleChange('formaRecebimento', e.target.value)} />
        </InputWrapper>
      </div>
      <InputWrapper label="Ocorrência">
        <select className="glass-input" value={formData.ocorrencia || OcorrenciaConta.UNICA} onChange={(e) => handleChange('ocorrencia', e.target.value as OcorrenciaConta)}>
          {Object.values(OcorrenciaConta).map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </InputWrapper>
    </div>
  );
};
