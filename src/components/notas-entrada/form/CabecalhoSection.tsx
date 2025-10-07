import React from 'react';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { NotaEntrada } from '../../../types';

interface CabecalhoSectionProps {
  formData: Partial<NotaEntrada>;
  handleChange: (field: keyof NotaEntrada, value: any) => void;
  initialFornecedorLabel: string;
  fetchFornecedores: (query: string) => Promise<any[]>;
}

export const CabecalhoSection: React.FC<CabecalhoSectionProps> = ({ formData, handleChange, initialFornecedorLabel, fetchFornecedores }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Dados da Nota</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputWrapper label="Fornecedor *" className="md:col-span-2">
          <AutocompleteInput
            value={formData.fornecedorId || ''}
            onValueChange={(id) => handleChange('fornecedorId', id)}
            fetchSuggestions={fetchFornecedores}
            initialLabel={initialFornecedorLabel}
            placeholder="Digite para buscar um fornecedor..."
          />
        </InputWrapper>
        <InputWrapper label="Número da Nota">
          <GlassInput value={formData.numero} disabled />
        </InputWrapper>
        <InputWrapper label="Data de Entrada">
          <GlassInput
            type="date"
            value={new Date(formData.dataEntrada || Date.now()).toISOString().split('T')[0]}
            onChange={e => handleChange('dataEntrada', new Date(e.target.value))}
          />
        </InputWrapper>
      </div>
    </section>
  );
};
