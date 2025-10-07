import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';
import { OrdemCompra } from '../../../types';

interface CabecalhoSectionProps {
  formData: Partial<OrdemCompra>;
  handleChange: (field: keyof OrdemCompra, value: any) => void;
  initialFornecedorLabel: string;
}

export const CabecalhoSection: React.FC<CabecalhoSectionProps> = ({ formData, handleChange, initialFornecedorLabel }) => {
  const [showFornecedor, setShowFornecedor] = useState(false);
  const clienteService = useService('cliente');

  const fetchFornecedores = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'fornecedor');
    return results.map(f => ({ value: f.id, label: f.nome }));
  }, [clienteService]);

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Cabeçalho</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputWrapper label="Fornecedor *" className="md:col-span-2">
          <AutocompleteInput
            value={formData.fornecedorId || ''}
            onValueChange={(id) => handleChange('fornecedorId', id)}
            fetchSuggestions={fetchFornecedores}
            initialLabel={initialFornecedorLabel}
            placeholder="Digite para buscar um fornecedor..."
          />
          <div className="text-xs mt-1 space-x-2">
            <button type="button" onClick={() => setShowFornecedor(s => !s)} className="text-blue-600 hover:underline">dados do fornecedor</button>
            <span className="text-gray-400">•</span>
            <button type="button" className="text-blue-600 hover:underline">ver últimas compras</button>
            <span className="text-gray-400">•</span>
            <button type="button" className="text-blue-600 hover:underline">pessoas de contato</button>
          </div>
        </InputWrapper>
        <InputWrapper label="Número"><GlassInput value={formData.numero} disabled /></InputWrapper>
      </div>
      <AnimatePresence>
        {showFornecedor && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 p-4 bg-glass-50 rounded-xl border border-white/20">
            <p className="text-center text-gray-500">Seção de dados do fornecedor em desenvolvimento.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
