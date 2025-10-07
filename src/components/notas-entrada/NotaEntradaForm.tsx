import React from 'react';
import toast from 'react-hot-toast';
import { GenericForm } from '../ui/GenericForm';
import { NotaEntrada, NotaEntradaItem } from '../../types';
import { useNotaEntradaForm } from '../../hooks/forms/useNotaEntradaForm';
import { CabecalhoSection } from './form/CabecalhoSection';
import { ItensSection } from './form/ItensSection';
import { TotaisObservacoesSection } from './form/TotaisObservacoesSection';

interface NotaEntradaFormProps {
  nota?: Partial<NotaEntrada>;
  onSave: (
    notaData: Omit<NotaEntrada, 'id' | 'createdAt' | 'updatedAt' | 'itens' | 'status'>,
    itensData: Omit<NotaEntradaItem, 'id' | 'createdAt' | 'updatedAt' | 'notaEntradaId'>[]
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const NotaEntradaForm: React.FC<NotaEntradaFormProps> = ({ nota, onSave, onCancel, loading }) => {
  const {
    formData,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleProdutoSelect,
    initialFornecedorLabel,
    fetchFornecedores,
    fetchProdutos,
  } = useNotaEntradaForm(nota);

  const handleSave = async () => {
    if (!formData.fornecedorId) {
      toast.error('O fornecedor é obrigatório.');
      return;
    }
    if ((formData.itens || []).length === 0) {
      toast.error('Adicione pelo menos um item à nota.');
      return;
    }
    
    const { itens, id, createdAt, updatedAt, fornecedor, ...notaData } = formData;
    const itensData = (itens || []).map(({ id: itemId, notaEntradaId, createdAt: itemCreatedAt, updatedAt: itemUpdatedAt, produto, ...rest }) => rest);
    
    await onSave(notaData as any, itensData);
  };

  return (
    <GenericForm
      title={nota?.id ? 'Editar Nota de Entrada' : 'Nova Nota de Entrada'}
      onSave={handleSave}
      onCancel={onCancel}
      loading={loading}
      size="max-w-6xl"
    >
      <div className="space-y-8">
        <CabecalhoSection
          formData={formData}
          handleChange={handleChange}
          initialFornecedorLabel={initialFornecedorLabel}
          fetchFornecedores={fetchFornecedores}
        />
        <ItensSection
          itens={formData.itens || []}
          handleItemChange={handleItemChange}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          handleProdutoSelect={handleProdutoSelect}
          fetchProdutos={fetchProdutos}
        />
        <TotaisObservacoesSection
          formData={formData}
          handleChange={handleChange}
        />
      </div>
    </GenericForm>
  );
};
