import React, { useMemo, useCallback } from 'react';
import { usePdv } from '../../contexts/PdvContext';
import { GlassCard } from '../ui/GlassCard';
import { AutocompleteInput } from '../ui/AutocompleteInput';
import { ClienteService } from '../../services/ClienteService';
import { VendedorService } from '../../services/VendedorService';
import { Cliente, Vendedor } from '../../types';

interface PdvSidePanelProps {
  clienteInputRef: React.RefObject<HTMLDivElement>;
  vendedorInputRef: React.RefObject<HTMLDivElement>;
}

export const PdvSidePanel: React.FC<PdvSidePanelProps> = ({ clienteInputRef, vendedorInputRef }) => {
  const { selectedCliente, setSelectedCliente, selectedVendedor, setSelectedVendedor, observacao, setObservacao } = usePdv();
  
  const clienteService = useMemo(() => new ClienteService(), []);
  const vendedorService = useMemo(() => new VendedorService(), []);

  const fetchClientes = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'cliente');
    return results.map(c => ({ value: c.id, label: c.nome, cliente: c }));
  }, [clienteService]);

  const fetchVendedores = useCallback(async (query: string) => {
    const results = await vendedorService.search(query);
    return results.map(v => ({ value: v.id, label: v.nome, vendedor: v }));
  }, [vendedorService]);

  const handleClienteSelect = (clienteId: string | null, suggestions: any[]) => {
    if (clienteId) {
      const selected = suggestions.find(s => s.value === clienteId);
      setSelectedCliente(selected?.cliente as Cliente || null);
    } else {
      setSelectedCliente(null);
    }
  };

  const handleVendedorSelect = (vendedorId: string | null, suggestions: any[]) => {
    if (vendedorId) {
      const selected = suggestions.find(s => s.value === vendedorId);
      setSelectedVendedor(selected?.vendedor as Vendedor || null);
    } else {
      setSelectedVendedor(null);
    }
  };

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="space-y-6">
        <div ref={clienteInputRef}>
          <AutocompleteInput
            label="Cliente (F8)"
            value={selectedCliente?.id || ''}
            onValueChange={handleClienteSelect}
            fetchSuggestions={fetchClientes}
            initialLabel={selectedCliente?.nome || ''}
            placeholder="Consumidor Final"
          />
        </div>
        <div ref={vendedorInputRef}>
          <AutocompleteInput
            label="Vendedor (F9)"
            value={selectedVendedor?.id || ''}
            onValueChange={handleVendedorSelect}
            fetchSuggestions={fetchVendedores}
            initialLabel={selectedVendedor?.nome || ''}
            placeholder="Sem vendedor"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Observação</label>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="glass-input h-24 resize-y"
            placeholder="Adicione uma observação à venda..."
          />
        </div>
      </div>
    </GlassCard>
  );
};
