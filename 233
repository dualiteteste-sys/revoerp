import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { ProdutoForm } from '../components/produtos/ProdutoForm';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useModalForm } from '../hooks/useModalForm';
import { Produto, SituacaoProduto } from '../types';
import { useProdutos } from '../hooks/data/useProdutos';

export const Produtos: React.FC = () => {
  const { 
    produtos, 
    loading, 
    error, 
    createProduto, 
    updateProduto, 
    deleteProduto,
    currentPage,
    totalPages,
    goToPage
  } = useProdutos();
  
  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<Produto>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    (produto.codigo && produto.codigo.toLowerCase().includes(filtro.toLowerCase()))
  );

  const handleSave = async (produtoData: Partial<Produto>) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateProduto(editingItem.id, produtoData);
      } else {
        await createProduto(produtoData as any);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await deleteProduto(id);
    }
  };
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const columns = useMemo(() => [
    { header: 'Nome', accessorKey: 'nome', cell: (item: Produto) => <p className="font-medium text-gray-800">{item.nome}</p> },
    { header: 'Código', accessorKey: 'codigo' },
    { header: 'Preço', accessorKey: 'precoVenda', cell: (item: Produto) => formatCurrency(item.precoVenda || 0) },
    { header: 'Estoque', accessorKey: 'estoqueInicial', cell: (item: Produto) => item.controlarEstoque ? item.estoqueInicial : 'N/A', className: 'text-center' },
    { header: 'Situação', accessorKey: 'situacao', cell: (item: Produto) => (
      item.situacao === SituacaoProduto.ATIVO ? 
        <CheckCircle className="text-green-500 mx-auto" size={20} /> : 
        <XCircle className="text-red-500 mx-auto" size={20} />
    ), className: 'text-center' },
  ], []);

  return (
    <div>
      <Header title="Produtos" subtitle="Gerencie seu catálogo de produtos" />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por nome ou código..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Novo Produto</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={produtosFiltrados}
          columns={columns}
          loading={loading && produtos.length === 0}
          error={error}
          entityName="Produto"
          actions={(item) => (
            <div className="flex items-center gap-2">
              <GlassButton icon={Edit2} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
              <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => handleDelete(item.id)} />
            </div>
          )}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </GlassCard>

      <AnimatePresence>
        {isFormOpen && (
          <ProdutoForm
            produto={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
