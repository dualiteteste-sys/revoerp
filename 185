import { useState, useEffect, useCallback } from 'react';
import { OrdemCompra, OrdemCompraItem, StatusOrdemCompra, FretePorConta } from '../../types';
import { OrdemCompraService } from '../../services/OrdemCompraService';

const getInitialData = (ordem?: Partial<OrdemCompra>): Partial<OrdemCompra> => ({
  id: ordem?.id,
  numero: ordem?.numero || `OC-${Date.now().toString().slice(-6)}`,
  fornecedorId: ordem?.fornecedorId || '',
  fornecedor: ordem?.fornecedor,
  itens: ordem?.itens?.map(item => ({ ...item, id: item.id || crypto.randomUUID() })) || [],
  totalProdutos: ordem?.totalProdutos || 0,
  desconto: ordem?.desconto,
  frete: ordem?.frete,
  totalIpi: ordem?.totalIpi,
  totalIcmsSt: ordem?.totalIcmsSt,
  totalGeral: ordem?.totalGeral || 0,
  numeroNoFornecedor: ordem?.numeroNoFornecedor,
  dataCompra: ordem?.dataCompra ? new Date(ordem.dataCompra) : new Date(),
  dataPrevista: ordem?.dataPrevista ? new Date(ordem.dataPrevista) : undefined,
  condicaoPagamento: ordem?.condicaoPagamento,
  categoriaId: ordem?.categoriaId,
  transportadorNome: ordem?.transportadorNome,
  fretePorConta: ordem?.fretePorConta || FretePorConta.CIF,
  observacoes: ordem?.observacoes,
  marcadores: ordem?.marcadores || [],
  observacoesInternas: ordem?.observacoesInternas,
  status: ordem?.status || StatusOrdemCompra.ABERTA,
});

export const useOrdemCompraForm = (ordem?: Partial<OrdemCompra>) => {
  const [formData, setFormData] = useState<Partial<OrdemCompra>>(getInitialData(ordem));
  const [initialFornecedorLabel, setInitialFornecedorLabel] = useState('');

  useEffect(() => {
    const initialData = getInitialData(ordem);
    setFormData(initialData);
    if (ordem?.fornecedor) {
      setInitialFornecedorLabel(ordem.fornecedor.nome);
    } else {
      setInitialFornecedorLabel('');
    }
  }, [ordem]);

  const handleChange = useCallback((field: keyof OrdemCompra, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleItemChange = useCallback((itemId: string, field: keyof OrdemCompraItem, value: any) => {
    setFormData(prev => {
      if (!prev || !prev.itens) return prev;
      const newItens = prev.itens.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantidade' || field === 'precoUnitario' || field === 'ipi') {
            const qtd = field === 'quantidade' ? Number(value) : item.quantidade;
            const preco = field === 'precoUnitario' ? Number(value) : item.precoUnitario;
            const ipi = field === 'ipi' ? Number(value) : (item.ipi || 0);
            updatedItem.precoTotal = qtd * preco * (1 + ipi / 100);
          }
          return updatedItem;
        }
        return item;
      });
      return { ...prev, itens: newItens };
    });
  }, []);

  const handleAddItem = useCallback(() => {
    const newItem: OrdemCompraItem = {
      id: crypto.randomUUID(),
      ordemCompraId: formData.id || '',
      descricao: '',
      quantidade: 1,
      precoUnitario: 0,
      precoTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    handleChange('itens', [...(formData.itens || []), newItem]);
  }, [formData.id, formData.itens, handleChange]);

  const handleRemoveItem = useCallback((itemId: string) => {
    handleChange('itens', (formData.itens || []).filter(item => item.id !== itemId));
  }, [formData.itens, handleChange]);

  useEffect(() => {
    const calculatedTotals = OrdemCompraService.calculateTotals(formData);
    setFormData(prev => ({ ...prev, ...calculatedTotals }));
  }, [formData.itens, formData.desconto, formData.frete, formData.totalIcmsSt]);

  return {
    formData,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    initialFornecedorLabel,
  };
};
