import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Filter, DollarSign, Plus, Edit2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useContasReceber } from '../hooks/data/useContasReceber';
import { StatusContaReceber, ContaReceber } from '../types';
import { ContaReceberForm } from '../components/contas-receber/ContaReceberForm';
import { useModalForm } from '../hooks/useModalForm';
import { useProfile } from '../contexts/ProfileContext';

export const ContasReceber: React.FC = () => {
  const { contas, loading, error, liquidarConta, createConta, updateConta, currentPage, totalPages, goToPage } = useContasReceber();
  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<ContaReceber>();
  const [filtro, setFiltro] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { hasPermission } = useProfile();

  const contasFiltradas = contas.filter(conta =>
    (conta.fatura?.numeroFatura && conta.fatura.numeroFatura.toLowerCase().includes(filtro.toLowerCase())) ||
    (conta.cliente?.nome && conta.cliente.nome.toLowerCase().includes(filtro.toLowerCase())) ||
    (conta.descricao && conta.descricao.toLowerCase().includes(filtro.toLowerCase()))
  );
  
  const handleLiquidar = async (id: string) => {
    if (window.confirm('Tem certeza que deseja liquidar esta conta?')) {
      await liquidarConta(id);
    }
  };

  const handleSave = async (data: Partial<ContaReceber>) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateConta(editingItem.id, data);
      } else {
        await createConta(data as any);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date?: Date) => date ? new Date(date).toLocaleDateString('pt-BR') : 'N/A';

  const getStatusBadge = (status: StatusContaReceber) => {
    const colors = {
      [StatusContaReceber.A_RECEBER]: 'bg-blue-100 text-blue-700 border-blue-200',
      [StatusContaReceber.RECEBIDO]: 'bg-green-100 text-green-700 border-green-200',
      [StatusContaReceber.VENCIDO]: 'bg-red-100 text-red-700 border-red-200'
    };
    return <span className={`glass-badge ${colors[status]}`}>{status.replace('_', ' ')}</span>;
  };

  return (
    <div>
      <Header title="Contas a Receber" subtitle="Gerencie os recebimentos de suas vendas" />
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por fatura, cliente ou descrição..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          {hasPermission('contas-receber.escrever') && (
            <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Conta</GlassButton>
          )}
        </div>
      </GlassCard>
      <GlassCard>
        <DataTable
          data={contasFiltradas}
          columns={[
            { header: 'Origem/Descrição', accessorKey: 'fatura', cell: (item: ContaReceber) => <p className="font-medium text-gray-800">{item.fatura?.numeroFatura || item.descricao}</p> },
            { header: 'Cliente', accessorKey: 'cliente', cell: (item: ContaReceber) => item.cliente?.nome || 'N/A' },
            { header: 'Vencimento', accessorKey: 'dataVencimento', cell: (item: ContaReceber) => formatDate(item.dataVencimento) },
            { header: 'Pagamento', accessorKey: 'dataPagamento', cell: (item: ContaReceber) => formatDate(item.dataPagamento) },
            { header: 'Valor', accessorKey: 'valor', cell: (item: ContaReceber) => formatCurrency(item.valor), className: 'text-right' },
            { header: 'Status', accessorKey: 'status', cell: (item: ContaReceber) => getStatusBadge(item.status), className: 'text-center' },
          ]}
          loading={loading && contas.length === 0}
          error={error}
          entityName="Conta a Receber"
          actions={(item) => (
            <div className="flex gap-2">
              {hasPermission('contas-receber.escrever') && (
                <GlassButton icon={Edit2} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
              )}
              {item.status !== StatusContaReceber.RECEBIDO && hasPermission('contas-receber.excluir') && (
                <GlassButton icon={DollarSign} variant="secondary" size="sm" onClick={() => handleLiquidar(item.id)} />
              )}
            </div>
          )}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </GlassCard>
      <AnimatePresence>
        {isFormOpen && (
          <ContaReceberForm
            conta={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
