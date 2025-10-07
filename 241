import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassInput } from '../../components/ui/GlassInput';
import { Pagination } from '../../components/ui/Pagination';
import { DataTable } from '../../components/ui/DataTable';
import { useModalForm } from '../../hooks/useModalForm';
import { CategoriaFinanceira, TipoCategoriaFinanceira } from '../../types';
import { useCrud } from '../../hooks/useCrud';
import { CategoriaFinanceiraForm } from '../../components/settings/categorias/CategoriaFinanceiraForm';

export const CategoriasFinanceiras: React.FC = () => {
  const { 
    items: categorias, 
    loading, 
    error, 
    createItem: createCategoria, 
    updateItem: updateCategoria, 
    deleteItem: deleteCategoria,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<CategoriaFinanceira>({ entityName: 'categoriaFinanceira', initialPageSize: 20 });

  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<CategoriaFinanceira>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const categoriasFiltradas = categorias.filter(cat =>
    cat.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSave = async (data: Partial<CategoriaFinanceira>) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateCategoria(editingItem.id, data);
      } else {
        await createCategoria(data as any);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      await deleteCategoria(id);
    }
  };

  const columns = useMemo(() => [
    { header: 'Descrição', accessorKey: 'descricao', cell: (item: CategoriaFinanceira) => <p className="font-medium text-gray-800">{item.descricao}</p> },
    { header: 'Tipo', accessorKey: 'tipo', cell: (item: CategoriaFinanceira) => (
      <span className={`flex items-center gap-2 ${item.tipo === 'RECEITA' ? 'text-green-600' : 'text-red-600'}`}>
        {item.tipo === 'RECEITA' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {item.tipo}
      </span>
    )},
  ], []);

  return (
    <>
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por descrição..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Categoria</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={categoriasFiltradas}
          columns={columns}
          loading={loading && categorias.length === 0}
          error={error}
          entityName="Categoria Financeira"
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
          <CategoriaFinanceiraForm
            categoria={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoriasFinanceiras;
