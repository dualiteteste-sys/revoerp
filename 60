import React from 'react';
import toast from 'react-hot-toast';
import { GenericForm } from '../ui/GenericForm';
import { OrdemCompra, OrdemCompraItem } from '../../types';
import { useOrdemCompraForm } from '../../hooks/forms/useOrdemCompraForm';
import { CabecalhoSection } from './form/CabecalhoSection';
import { ItensSection } from './form/ItensSection';
import { TotaisSection } from './form/TotaisSection';
import { DetalhesPagamentoSection } from './form/DetalhesPagamentoSection';
import { TransporteObservacoesSection } from './form/TransporteObservacoesSection';

interface OrdemCompraFormProps {
  ordem?: Partial<OrdemCompra>;
  onSave: (
    ordemData: Partial<Omit<OrdemCompra, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<OrdemCompraItem, 'id' | 'createdAt' | 'updatedAt' | 'ordemCompraId'>[]
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const OrdemCompraForm: React.FC<OrdemCompraFormProps> = ({ ordem, onSave, onCancel, loading }) => {
  const {
    formData,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    initialFornecedorLabel,
  } = useOrdemCompraForm(ordem);

  const handleSave = async () => {
    if (!formData.fornecedorId) {
      toast.error('O fornecedor é obrigatório.');
      return;
    }
    if ((formData.itens || []).length === 0) {
      toast.error('Adicione pelo menos um item ao pedido.');
      return;
    }
    
    const { itens, id, createdAt, updatedAt, fornecedor, ...ordemData } = formData;
    const itensData = (itens || []).map(({ id: itemId, ordemCompraId, createdAt: itemCreatedAt, updatedAt: itemUpdatedAt, ...rest }) => rest);
    
    await onSave(ordemData, itensData);
  };

  return (
    <GenericForm
      title={ordem?.id ? 'Editar Ordem de Compra' : 'Nova Ordem de Compra'}
      onSave={handleSave}
      onCancel={onCancel}
      loading={loading}
      size="max-w-7xl"
    >
      <div className="space-y-8">
        <CabecalhoSection
          formData={formData}
          handleChange={handleChange}
          initialFornecedorLabel={initialFornecedorLabel}
        />
        <ItensSection
          itens={formData.itens || []}
          handleItemChange={handleItemChange}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
        />
        <TotaisSection formData={formData} handleChange={handleChange} />
        <DetalhesPagamentoSection formData={formData} handleChange={handleChange} />
        <TransporteObservacoesSection formData={formData} handleChange={handleChange} />
      </div>
    </GenericForm>
  );
};
