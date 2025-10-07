import { useState, useEffect, useCallback, useMemo } from 'react';
import { NotaEntrada, NotaEntradaItem, Produto, StatusNotaEntrada } from '../../types';
import { useService } from '../useService';

const getInitialData = (nota?: Partial<NotaEntrada>): Partial<NotaEntrada> => ({
  id: nota?.id,
  numero: nota?.numero || `NE-${Date.now().toString().slice(-6)}`,
  fornecedorId: nota?.fornecedorId || '',
  fornecedor: nota?.fornecedor,
  dataEntrada: nota?.dataEntrada ? new Date(nota.dataEntrada) : new Date(),
  valorTotal: nota?.valorTotal || 0,
  observacoes: nota?.observacoes,
  itens: nota?.itens?.map(item => ({ ...item, id: item.id || crypto.randomUUID() })) || [],
  status: nota?.status || StatusNotaEntrada.EM_DIGITACAO,
});

export const useNotaEntradaForm = (nota?: Partial<NotaEntrada>) => {
  const [formData, setFormData] = useState<Partial<NotaEntrada>>(getInitialData(nota));
  const [initialFornecedorLabel, setInitialFornecedorLabel] = useState('');

  const clienteService = useService('cliente');
  const produtoService = useService('produto');

  useEffect(() => {
    const initialData = getInitialData(nota);
    setFormData(initialData);
    if (nota?.fornecedor) {
      setInitialFornecedorLabel(nota.fornecedor.nome);
    } else {
      setInitialFornecedorLabel('');
    }
  }, [nota]);

  const handleChange = useCallback((field: keyof NotaEntrada, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleItemChange = useCallback((itemId: string, field: keyof NotaEntradaItem, value: any) => {
    setFormData(prev => {
      if (!prev || !prev.itens) return prev;
      const newItens = prev.itens.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantidade' || field === 'valorUnitario') {
            const qtd = field === 'quantidade' ? Number(value) : item.quantidade;
            const preco = field === 'valorUnitario' ? Number(value) : item.valorUnitario;
            updatedItem.valorTotal = qtd * preco;
          }
          return updatedItem;
        }
        return item;
      });
      return { ...prev, itens: newItens };
    });
  }, []);

  const handleAddItem = useCallback(() => {
    const newItem: NotaEntradaItem = {
      id: crypto.randomUUID(),
      notaEntradaId: formData.id || '',
      produtoId: '',
      descricao: '',
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    handleChange('itens', [...(formData.itens || []), newItem]);
  }, [formData.id, formData.itens, handleChange]);

  const handleRemoveItem = useCallback((itemId: string) => {
    handleChange('itens', (formData.itens || []).filter(item => item.id !== itemId));
  }, [formData.itens, handleChange]);

  const handleProdutoSelect = useCallback((itemId: string, produto: Produto) => {
    setFormData(prev => {
        if (!prev || !prev.itens) return prev;
        const newItens = prev.itens.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                produtoId: produto.id,
                descricao: produto.nome,
                valorUnitario: produto.custo || 0,
                valorTotal: item.quantidade * (produto.custo || 0),
              };
            }
            return item;
          });
        return { ...prev, itens: newItens };
    });
  }, []);

  const fetchFornecedores = useCallback(async (query: string) => {
    const results = await clienteService.search(query, 'fornecedor');
    return results.map(f => ({ value: f.id, label: f.nome }));
  }, [clienteService]);

  const fetchProdutos = useCallback(async (query: string) => {
    const results = await produtoService.search(query);
    return results.map(p => ({ value: p.id, label: p.nome, produto: p }));
  }, [produtoService]);

  useEffect(() => {
    const total = (formData.itens || []).reduce((acc, item) => acc + (item.valorTotal || 0), 0);
    if (total !== formData.valorTotal) {
      handleChange('valorTotal', total);
    }
  }, [formData.itens, formData.valorTotal, handleChange]);

  return {
    formData,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleProdutoSelect,
    initialFornecedorLabel,
    fetchFornecedores,
    fetchProdutos,
  };
};
