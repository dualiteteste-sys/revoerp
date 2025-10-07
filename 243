import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassInput } from '../../components/ui/GlassInput';
import { Pagination } from '../../components/ui/Pagination';
import { DataTable } from '../../components/ui/DataTable';
import { useModalForm } from '../../hooks/useModalForm';
import { FormaPagamento } from '../../types';
import { useCrud } from '../../hooks/useCrud';
import { FormaPagamentoForm } from '../../components/settings/formas-pagamento/FormaPagamentoForm';

export const FormasPagamento: React.FC = () => {
  const { 
    items: formasPagamento, 
    loading, 
    error, 
    createItem: createFormaPagamento, 
    updateItem: updateFormaPagamento, 
    deleteItem: deleteFormaPagamento,
    currentPage,
    totalPages,
    goToPage
  } = useCrud<FormaPagamento>({ entityName: 'formaPagamento', initialPageSize: 20 });

  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<FormaPagamento>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const formasFiltradas = formasPagamento.filter(forma =>
    forma.descricao.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSave = async (data: Partial<FormaPagamento>) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateFormaPagamento(editingItem.id, data);
      } else {
        await createFormaPagamento(data as any);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta forma de pagamento?')) {
      await deleteFormaPagamento(id);
    }
  };

  const columns = useMemo(() => [
    { header: 'Descrição', accessorKey: 'descricao', cell: (item: FormaPagamento) => <p className="font-medium text-gray-800">{item.descricao}</p> },
  ], []);

  return (
    <>
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por descrição..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Forma de Pagamento</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={formasFiltradas}
          columns={columns}
          loading={loading && formasPagamento.length === 0}
          error={error}
          entityName="Forma de Pagamento"
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
          <FormaPagamentoForm
            formaPagamento={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FormasPagamento;
