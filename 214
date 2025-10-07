import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { ContratoForm } from '../components/contratos/ContratoForm';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useModalForm } from '../hooks/useModalForm';
import { Contrato, ContratoSituacao } from '../types';
import { useContratos } from '../hooks/data/useContratos';

export const Contratos: React.FC = () => {
  const { 
    contratos, 
    loading, 
    error, 
    createContrato, 
    updateContrato, 
    deleteContrato,
    currentPage,
    totalPages,
    goToPage
  } = useContratos();

  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<Contrato>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const contratosFiltrados = contratos.filter(contrato =>
    contrato.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
    (contrato.cliente?.nome && contrato.cliente.nome.toLowerCase().includes(filtro.toLowerCase()))
  );

  const handleSave = async (contratoData: Partial<Contrato>) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateContrato(editingItem.id, contratoData);
      } else {
        await createContrato(contratoData as Omit<Contrato, 'id' | 'createdAt' | 'updatedAt' | 'anexos'>);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este contrato? Esta ação não pode ser desfeita.')) {
      await deleteContrato(id);
    }
  };
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date?: Date) => date ? new Date(date).toLocaleDateString('pt-BR') : 'N/A';

  const getStatusBadge = (status: ContratoSituacao) => {
    const colors = {
      [ContratoSituacao.ATIVO]: 'bg-green-100 text-green-700 border-green-200',
      [ContratoSituacao.INATIVO]: 'bg-red-100 text-red-700 border-red-200',
      [ContratoSituacao.DEMONSTRACAO]: 'bg-blue-100 text-blue-700 border-blue-200',
      [ContratoSituacao.ISENTO]: 'bg-gray-100 text-gray-700 border-gray-200',
      [ContratoSituacao.BAIXADO]: 'bg-orange-100 text-orange-700 border-orange-200',
      [ContratoSituacao.ENCERRADO]: 'bg-purple-100 text-purple-700 border-purple-200',
    };
    return <span className={`glass-badge ${colors[status]}`}>{status}</span>;
  };

  const columns = useMemo(() => [
    { header: 'Descrição', accessorKey: 'descricao', cell: (item: Contrato) => <p className="font-medium text-gray-800">{item.descricao}</p> },
    { header: 'Cliente', accessorKey: 'cliente', cell: (item: Contrato) => item.cliente?.nome || 'N/A' },
    { header: 'Valor', accessorKey: 'valor', cell: (item: Contrato) => formatCurrency(item.valor), className: 'text-right' },
    { header: 'Situação', accessorKey: 'situacao', cell: (item: Contrato) => getStatusBadge(item.situacao), className: 'text-center' },
    { header: 'Data do Contrato', accessorKey: 'dataContrato', cell: (item: Contrato) => formatDate(item.dataContrato) },
  ], []);

  return (
    <div>
      <Header title="Contratos" subtitle="Gerencie seus contratos de serviço e recorrência" />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por descrição ou cliente..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Novo Contrato</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={contratosFiltrados}
          columns={columns}
          loading={loading && contratos.length === 0}
          error={error}
          entityName="Contrato"
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
          <ContratoForm
            contrato={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
