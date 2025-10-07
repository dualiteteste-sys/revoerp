import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Filter } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useModalForm } from '../hooks/useModalForm';
import { DevolucaoVenda as DevolucaoVendaType, DevolucaoVendaItem } from '../types';
import { useDevolucaoVenda } from '../hooks/data/useDevolucaoVenda';
import { DevolucaoVendaForm } from '../components/devolucoes/DevolucaoVendaForm';

export const DevolucaoVenda: React.FC = () => {
  const { devolucoes, loading, error, createDevolucao, currentPage, totalPages, goToPage } = useDevolucaoVenda();
  const { isFormOpen, handleOpenCreateForm, handleCloseForm } = useModalForm<DevolucaoVendaType>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const devolucoesFiltradas = devolucoes.filter(d =>
    d.numero.toLowerCase().includes(filtro.toLowerCase()) ||
    (d.cliente?.nome && d.cliente.nome.toLowerCase().includes(filtro.toLowerCase()))
  );

  const handleSave = async (
    devolucaoData: Omit<DevolucaoVendaType, 'id' | 'createdAt' | 'updatedAt' | 'itens'>,
    itensData: Omit<DevolucaoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'devolucaoVendaId'>[]
  ) => {
    setIsSaving(true);
    try {
      await createDevolucao(devolucaoData, itensData);
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

  const columns = useMemo(() => [
    { header: 'Nº Devolução', accessorKey: 'numero', cell: (item: DevolucaoVendaType) => <p className="font-medium">{item.numero}</p> },
    { header: 'Pedido Original', accessorKey: 'pedidoVenda', cell: (item: DevolucaoVendaType) => item.pedidoVenda?.numero || 'N/A' },
    { header: 'Cliente', accessorKey: 'cliente', cell: (item: DevolucaoVendaType) => item.cliente?.nome || 'N/A' },
    { header: 'Data', accessorKey: 'dataDevolucao', cell: (item: DevolucaoVendaType) => formatDate(item.dataDevolucao) },
    { header: 'Valor Devolvido', accessorKey: 'valorTotalDevolvido', cell: (item: DevolucaoVendaType) => formatCurrency(item.valorTotalDevolvido), className: 'text-right' },
  ], []);

  return (
    <div>
      <Header title="Devoluções de Venda" subtitle="Gerencie as devoluções de seus clientes" />
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por nº da devolução ou cliente..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Devolução</GlassButton>
        </div>
      </GlassCard>
      <GlassCard>
        <DataTable
          data={devolucoesFiltradas}
          columns={columns}
          loading={loading && devolucoes.length === 0}
          error={error}
          entityName="Devolução"
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </GlassCard>
      <AnimatePresence>
        {isFormOpen && (
          <DevolucaoVendaForm
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
