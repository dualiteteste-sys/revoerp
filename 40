import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { GenericForm } from '../ui/GenericForm';
import { CrmOportunidade, CrmEtapa } from '../../types';
import toast from 'react-hot-toast';
import { useFormState } from '../../hooks/useFormState';
import { AutocompleteInput } from '../ui/AutocompleteInput';
import { CurrencyInput } from '../ui/CurrencyInput';
import { InputWrapper } from '../ui/InputWrapper';
import { useService } from '../../hooks/useService';

interface OportunidadeFormProps {
  oportunidade?: CrmOportunidade;
  onSave: (data: Partial<CrmOportunidade>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const getInitialData = (op?: CrmOportunidade): Partial<CrmOportunidade> => ({
  id: op?.id,
  nome: op?.nome || '',
  clienteId: op?.clienteId || '',
  cliente: op?.cliente,
  vendedorId: op?.vendedorId,
  vendedor: op?.vendedor,
  valorEstimado: op?.valorEstimado || 0,
  etapa: op?.etapa || CrmEtapa.LEAD,
  dataFechamentoPrevista: op?.dataFechamentoPrevista ? new Date(op.dataFechamentoPrevista) : undefined,
});

export const OportunidadeForm: React.FC<OportunidadeFormProps> = ({ oportunidade, onSave, onCancel, loading }) => {
  const getInitial = useCallback(() => getInitialData(oportunidade), [oportunidade]);
  const { formData, setFormData, handleChange } = useFormState<CrmOportunidade>(getInitial);

  const clienteService = useService('cliente');
  const vendedorService = useService('vendedor');
  
  const [initialClienteLabel, setInitialClienteLabel] = useState('');
  const [initialVendedorLabel, setInitialVendedorLabel] = useState('');

  useEffect(() => {
    if (oportunidade?.cliente) setInitialClienteLabel(oportunidade.cliente.nome);
    if (oportunidade?.vendedor) setInitialVendedorLabel(oportunidade.vendedor.nome);
  }, [oportunidade]);

  const fetchClientes = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'cliente');
    return results.map(c => ({ value: c.id, label: c.nome }));
  }, [clienteService]);

  const fetchVendedores = useCallback(async (query: string) => {
    const results = await vendedorService.search(query);
    return results.map(v => ({ value: v.id, label: v.nome }));
  }, [vendedorService]);

  const handleSave = () => {
    if (!formData.nome?.trim()) {
      toast.error('O nome da oportunidade é obrigatório.');
      return;
    }
    if (!formData.clienteId) {
      toast.error('O cliente é obrigatório.');
      return;
    }
    onSave(formData);
  };

  return (
    <GenericForm
      title={oportunidade?.id ? 'Editar Oportunidade' : 'Nova Oportunidade'}
      onSave={handleSave}
      onCancel={onCancel}
      loading={loading}
      size="max-w-3xl"
    >
      <div className="space-y-6">
        <InputWrapper label="Nome da Oportunidade *">
          <input className="glass-input" value={formData.nome} onChange={(e) => handleChange('nome', e.target.value)} />
        </InputWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWrapper label="Cliente *">
                <AutocompleteInput
                    value={formData.clienteId || ''}
                    onValueChange={(id) => handleChange('clienteId', id)}
                    fetchSuggestions={fetchClientes}
                    initialLabel={initialClienteLabel}
                    placeholder="Digite para buscar um cliente..."
                />
            </InputWrapper>
            <InputWrapper label="Vendedor Responsável">
                <AutocompleteInput
                    value={formData.vendedorId || ''}
                    onValueChange={(id) => handleChange('vendedorId', id)}
                    fetchSuggestions={fetchVendedores}
                    initialLabel={initialVendedorLabel}
                    placeholder="Digite para buscar um vendedor..."
                />
            </InputWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWrapper label="Valor Estimado *">
                <CurrencyInput value={formData.valorEstimado || 0} onAccept={(v) => handleChange('valorEstimado', parseFloat(v))} />
            </InputWrapper>
            <InputWrapper label="Etapa do Funil *">
                <select className="glass-input" value={formData.etapa} onChange={(e) => handleChange('etapa', e.target.value as CrmEtapa)}>
                    {Object.values(CrmEtapa).map(e => <option key={e} value={e}>{e}</option>)}
                </select>
            </InputWrapper>
        </div>

        <InputWrapper label="Data de Fechamento Prevista">
            <input type="date" className="glass-input" value={formData.dataFechamentoPrevista ? new Date(formData.dataFechamentoPrevista).toISOString().split('T')[0] : ''} onChange={(e) => handleChange('dataFechamentoPrevista', e.target.value ? new Date(e.target.value) : undefined)} />
        </InputWrapper>
      </div>
    </GenericForm>
  );
};
