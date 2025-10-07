import React, { useState, useEffect, useCallback } from 'react';
import { Contrato, ContratoSituacao } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';

interface DadosContratoTabProps {
  formData: Partial<Contrato>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Contrato>>>;
}

export const DadosContratoTab: React.FC<DadosContratoTabProps> = ({ formData, setFormData }) => {
  const clienteService = useService('cliente');
  const [initialClienteLabel, setInitialClienteLabel] = useState('');

  const handleChange = (field: keyof Contrato, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (formData.clienteId) {
      clienteService.getById(formData.clienteId).then(cliente => {
        if (cliente) setInitialClienteLabel(cliente.nome);
      });
    }
  }, [formData.clienteId, clienteService]);

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
      <InputWrapper label="Descrição do Contrato *">
        <textarea
          className="glass-input h-24 resize-y"
          value={formData.descricao || ''}
          onChange={(e) => handleChange('descricao', e.target.value)}
          placeholder="Ex: Contrato de Manutenção Mensal de Servidores"
        />
      </InputWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper label="Situação *">
          <select
            className="glass-input"
            value={formData.situacao}
            onChange={(e) => handleChange('situacao', e.target.value as ContratoSituacao)}
          >
            {Object.values(ContratoSituacao).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </InputWrapper>
        <InputWrapper label="Data do Contrato *">
          <GlassInput
            type="date"
            value={formData.dataContrato ? new Date(formData.dataContrato).toISOString().split('T')[0] : ''}
            onChange={(e) => handleChange('dataContrato', new Date(e.target.value))}
          />
        </InputWrapper>
      </div>
    </div>
  );
};
