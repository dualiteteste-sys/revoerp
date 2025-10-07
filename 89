import React, { useState, useEffect, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';
import { Cliente, Vendedor } from '../../../types';

interface PartesSectionProps {
  control: Control<PedidoVendaFormData>;
  cliente?: Cliente;
  vendedor?: Vendedor;
}

export const PartesSection: React.FC<PartesSectionProps> = ({ control, cliente, vendedor }) => {
  const clienteService = useService('cliente');
  const vendedorService = useService('vendedor');
  const [initialClienteLabel, setInitialClienteLabel] = useState('');
  const [initialVendedorLabel, setInitialVendedorLabel] = useState('');

  useEffect(() => {
    if (cliente) setInitialClienteLabel(cliente.nome);
    if (vendedor) setInitialVendedorLabel(vendedor.nome);
  }, [cliente, vendedor]);

  const fetchClientes = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'cliente');
    return results.map(c => ({ value: c.id, label: c.nome }));
  }, [clienteService]);

  const fetchVendedores = useCallback(async (query: string) => {
    const results = await vendedorService.search(query);
    return results.map(v => ({ value: v.id, label: v.nome }));
  }, [vendedorService]);

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Partes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="clienteId"
          control={control}
          render={({ field, fieldState }) => (
            <InputWrapper label="Cliente *" error={fieldState.error?.message}>
              <AutocompleteInput
                value={field.value || ''}
                onValueChange={field.onChange}
                fetchSuggestions={fetchClientes}
                initialLabel={initialClienteLabel}
                placeholder="Digite para buscar um cliente..."
              />
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
                onValueChange={field.onChange}
                fetchSuggestions={fetchVendedores}
                initialLabel={initialVendedorLabel}
                placeholder="Digite para buscar um vendedor..."
              />
            </InputWrapper>
          )}
        />
      </div>
      <Controller
        name="enderecoEntregaDiferente"
        control={control}
        render={({ field }) => (
          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input type="checkbox" {...field} checked={field.value} className="form-checkbox" />
            O endereço de entrega do cliente é diferente do endereço de cobrança
          </label>
        )}
      />
    </section>
  );
};
