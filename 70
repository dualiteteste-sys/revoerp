import React, { useState, useEffect, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import { OrdemServicoFormData } from '../../../schemas/ordemServicoSchema';
import { GlassInput } from '../../ui/GlassInput';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';
import { Cliente } from '../../../types';

interface CabecalhoSectionProps {
  control: Control<OrdemServicoFormData>;
  cliente?: Cliente;
}

export const CabecalhoSection: React.FC<CabecalhoSectionProps> = ({ control, cliente }) => {
  const clienteService = useService('cliente');
  const [initialClienteLabel, setInitialClienteLabel] = useState('');

  useEffect(() => {
    if (cliente) {
      setInitialClienteLabel(cliente.nome);
    }
  }, [cliente]);

  const fetchClientes = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'cliente');
    return results.map(c => ({ value: c.id, label: c.nome }));
  }, [clienteService]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Controller
        name="numero"
        control={control}
        render={({ field }) => (
          <InputWrapper label="Número">
            <GlassInput {...field} value={field.value || ''} disabled />
          </InputWrapper>
        )}
      />
      <div className="md:col-span-3">
        <Controller
          name="clienteId"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Cliente *" error={error?.message}>
              <AutocompleteInput
                value={field.value || ''}
                onValueChange={(id) => field.onChange(id)}
                fetchSuggestions={fetchClientes}
                initialLabel={initialClienteLabel}
                placeholder="Digite para buscar um cliente..."
              />
            </InputWrapper>
          )}
        />
      </div>
    </section>
  );
};
