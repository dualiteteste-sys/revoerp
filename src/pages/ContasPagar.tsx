import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Filter, DollarSign, Plus, Edit2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { DataTable } from '../components/ui/DataTable';
import { useContasPagar } from '../hooks/data/useContasPagar';
import { StatusContaPagar, ContaPagar } from '../types';
import { ContaPagarForm } from '../components/contas-pagar/ContaPagarForm';
import { useModalForm } from '../hooks/useModalForm';

export const ContasPagar: React.FC = () => {
  const { contas, loading, error, liquidarConta, createConta, updateConta } = useContasPagar();
  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<ContaPagar>();
  const [filtro, setFiltro] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const contasFiltradas = contas.filter(conta =>
    conta.descricao.toLowerCase().includes(filtro.toLowerCase()) ||
    (conta.fornecedor?.nome && conta.fornecedor.nome.toLowerCase().includes(filtro.toLowerCase()))
  );
  
  const handleLiquidar = async (id: string) => {
    if (window.confirm('Tem certeza que deseja liquidar esta conta?')) {
      await liquidarConta(id);
    }
  };

  const handleSave = async (data: Partial<ContaPagar>) => {
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

  const getStatusBadge = (status: StatusContaPagar) => {
    const colors = {
      [StatusContaPagar.A_PAGAR]: 'bg-blue-100 text-blue-700 border-blue-200',
      [StatusContaPagar.PAGO]: 'bg-green-100 text-green-700 border-green-200',
      [StatusContaPagar.VENCIDO]: 'bg-red-100 text-red-700 border-red-200'
    };
    return <span className={`glass-badge ${colors[status]}`}>{status.replace('_', ' ')}</span>;
  };

  return (
    <div>
      <Header title="Contas a Pagar" subtitle="Gerencie suas despesas e pagamentos" />
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por descrição ou fornecedor..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Conta</GlassButton>
        </div>
      </GlassCard>
      <GlassCard>
        <DataTable
          data={contasFiltradas}
          columns={[
            { header: 'Descrição', accessorKey: 'descricao', cell: (item: ContaPagar) => <p className="font-medium text-gray-800">{item.descricao}</p> },
            { header: 'Fornecedor', accessorKey: 'fornecedor', cell: (item: ContaPagar) => item.fornecedor?.nome || 'N/A' },
            { header: 'Vencimento', accessorKey: 'dataVencimento', cell: (item: ContaPagar) => formatDate(item.dataVencimento) },
            { header: 'Pagamento', accessorKey: 'dataPagamento', cell: (item: ContaPagar) => formatDate(item.dataPagamento) },
            { header: 'Valor', accessorKey: 'valor', cell: (item: ContaPagar) => formatCurrency(item.valor), className: 'text-right' },
            { header: 'Status', accessorKey: 'status', cell: (item: ContaPagar) => getStatusBadge(item.status), className: 'text-center' },
          ]}
          loading={loading && contas.length === 0}
          error={error}
          entityName="Conta a Pagar"
          actions={(item) => (
            <div className="flex gap-2">
              <GlassButton icon={Edit2} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
              {item.status !== StatusContaPagar.PAGO && (
                <GlassButton icon={DollarSign} variant="secondary" size="sm" onClick={() => handleLiquidar(item.id)} />
              )}
            </div>
          )}
        />
      </GlassCard>
      <AnimatePresence>
        {isFormOpen && (
          <ContaPagarForm
            conta={editingItem}
            onCancel={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
