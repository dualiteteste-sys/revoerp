import React, { useState, useEffect, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import { ClienteFormData } from '../../../schemas/clienteSchema';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';

interface DadosComplementaresTabProps {
  control: Control<ClienteFormData>;
  vendedorId?: string | null;
  createdAt?: Date | string | null;
}

export const DadosComplementaresTab: React.FC<DadosComplementaresTabProps> = ({ control, vendedorId, createdAt }) => {
  const vendedorService = useService('vendedor');
  const [initialVendedorLabel, setInitialVendedorLabel] = useState('');

  useEffect(() => {
    if (vendedorId) {
      vendedorService.repository.findById(vendedorId).then(vendedor => {
        if (vendedor) {
          setInitialVendedorLabel(vendedor.nome);
        }
      });
    }
  }, [vendedorId, vendedorService]);

  const fetchVendedores = useCallback(async (query: string) => {
    const results = await vendedorService.search(query);
    return results.map(v => ({ value: v.id, label: v.nome }));
  }, [vendedorService]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Controller
          name="estadoCivil"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Estado Civil">
              <select className="glass-input" {...field} value={field.value || ''}>
                <option value="">Selecione...</option>
                <option>Solteiro(a)</option>
                <option>Casado(a)</option>
                <option>Viúvo(a)</option>
                <option>Separado(a)</option>
                <option>Desquitado(a)</option>
              </select>
            </InputWrapper>
          )}
        />
        <Controller
          name="profissao"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Profissão">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="sexo"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Sexo">
              <select className="glass-input" {...field} value={field.value || ''}>
                <option value="">Selecione...</option>
                <option>Masculino</option>
                <option>Feminino</option>
              </select>
            </InputWrapper>
          )}
        />
        <Controller
          name="dataNascimento"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Data de Nascimento">
              <GlassInput type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} />
            </InputWrapper>
          )}
        />
        <Controller
          name="naturalidade"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Naturalidade">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="statusCrm"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Status no CRM">
              <select className="glass-input" {...field} value={field.value || ''}>
                <option value="">Selecione...</option>
                <option>Cliente</option>
                <option>Lead</option>
                <option>Prospect</option>
              </select>
            </InputWrapper>
          )}
        />
        <Controller
          name="vendedorId"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Vendedor">
              <AutocompleteInput
                value={field.value || ''}
                onValueChange={(id) => field.onChange(id)}
                fetchSuggestions={fetchVendedores}
                initialLabel={initialVendedorLabel}
                placeholder="Digite para buscar um vendedor..."
              />
            </InputWrapper>
          )}
        />
        <Controller
          name="condicaoPagamentoPadraoId"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Condição de Pagamento">
              <GlassInput {...field} value={field.value || ''} />
            </InputWrapper>
          )}
        />
        <Controller
          name="limiteCredito"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Limite de Crédito">
              <CurrencyInput value={field.value ?? 0} onAccept={(v) => field.onChange(parseFloat(v))} />
            </InputWrapper>
          )}
        />
        <InputWrapper label="Data de Cadastro">
          <GlassInput value={createdAt ? new Date(createdAt).toLocaleDateString('pt-BR') : ''} disabled />
        </InputWrapper>
      </div>
    </div>
  );
};
