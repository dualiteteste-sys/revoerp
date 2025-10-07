import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Filter, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useModalForm } from '../hooks/useModalForm';
import { NotaEntrada as NotaEntradaType, NotaEntradaItem, StatusNotaEntrada } from '../types';
import { useNotaEntrada } from '../hooks/data/useNotaEntrada';
import { NotaEntradaForm } from '../components/notas-entrada/NotaEntradaForm';

export const NotasEntrada: React.FC = () => {
  const { 
    notasEntrada, 
    loading, 
    error, 
    createNotaEntrada,
    finalizarNota,
    currentPage,
    totalPages,
    goToPage
  } = useNotaEntrada();

  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<NotaEntradaType>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const notasFiltradas = notasEntrada.filter(n =>
    n.numero.toLowerCase().includes(filtro.toLowerCase()) ||
    (n.fornecedor?.nome && n.fornecedor.nome.toLowerCase().includes(filtro.toLowerCase()))
  );

  const handleSave = async (
    notaData: Omit<NotaEntradaType, 'id' | 'createdAt' | 'updatedAt' | 'itens' | 'status'>,
    itensData: Omit<NotaEntradaItem, 'id' | 'createdAt' | 'updatedAt' | 'notaEntradaId'>[]
  ) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        // await updateNotaEntrada(editingItem.id, notaData, itensData); // Implementar update
      } else {
        await createNotaEntrada(notaData, itensData);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta nota de entrada?')) {
      // await deleteNotaEntrada(id);
    }
  };

  const handleFinalizar = async (id: string) => {
    if (window.confirm('Tem certeza que deseja finalizar esta nota? Esta ação irá atualizar o estoque e não poderá ser desfeita.')) {
      await finalizarNota(id);
    }
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

  const getStatusBadge = (status: StatusNotaEntrada) => {
    const colors = {
      [StatusNotaEntrada.EM_DIGITACAO]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      [StatusNotaEntrada.FINALIZADA]: 'bg-green-100 text-green-700 border-green-200',
      [StatusNotaEntrada.CANCELADA]: 'bg-red-100 text-red-700 border-red-200',
    };
    return <span className={`glass-badge ${colors[status]}`}>{status.replace('_', ' ')}</span>;
  };

  const columns = useMemo(() => [
    { header: 'Número', accessorKey: 'numero', cell: (item: NotaEntradaType) => <p className="font-medium">{item.numero}</p> },
    { header: 'Fornecedor', accessorKey: 'fornecedor', cell: (item: NotaEntradaType) => item.fornecedor?.nome || 'N/A' },
    { header: 'Data de Entrada', accessorKey: 'dataEntrada', cell: (item: NotaEntradaType) => formatDate(item.dataEntrada) },
    { header: 'Valor Total', accessorKey: 'valorTotal', cell: (item: NotaEntradaType) => formatCurrency(item.valorTotal), className: 'text-right' },
    { header: 'Status', accessorKey: 'status', cell: (item: NotaEntradaType) => getStatusBadge(item.status), className: 'text-center' },
  ], []);

  return (
    <div>
      <Header title="Notas de Entrada" subtitle="Gerencie a entrada de mercadorias no seu estoque" />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por número da nota ou fornecedor..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Nota de Entrada</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={notasFiltradas}
          columns={columns}
          loading={loading && notasEntrada.length === 0}
          error={error}
          entityName="Nota de Entrada"
          actions={(item) => (
            <div className="flex items-center gap-2">
              <GlassButton icon={Edit2} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
              <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => handleDelete(item.id)} />
              {item.status === StatusNotaEntrada.EM_DIGITACAO && (
                <GlassButton icon={CheckCircle} variant="secondary" size="sm" onClick={() => handleFinalizar(item.id)} title="Finalizar Nota" />
              )}
            </div>
          )}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </GlassCard>

      <AnimatePresence>
        {isFormOpen && (
          <NotaEntradaForm
            nota={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
