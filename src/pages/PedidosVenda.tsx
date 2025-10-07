import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Filter, Eye, Receipt } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { usePedidoVenda } from '../hooks/data/usePedidoVenda';
import { PedidoVenda, PedidoVendaItem, StatusPedidoVenda } from '../types';
import { PedidoVendaForm } from '../components/pedidos-venda/PedidoVendaForm';
import { useModalForm } from '../hooks/useModalForm';
import { PedidoVendaFormData } from '../schemas/pedidoVendaSchema';

export const PedidosVenda: React.FC = () => {
  const { 
    pedidosVenda, 
    loading, 
    error, 
    createPedidoVenda,
    faturarPedido,
    currentPage,
    totalPages,
    goToPage
  } = usePedidoVenda();
  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<PedidoVenda>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const pedidosFiltrados = pedidosVenda.filter(pedido =>
    pedido.numero.toLowerCase().includes(filtro.toLowerCase()) ||
    (pedido.cliente?.nome && pedido.cliente.nome.toLowerCase().includes(filtro.toLowerCase()))
  );
  
  const handleSave = async (
    pedidoData: PedidoVendaFormData,
    itensData: Omit<PedidoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]
  ) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        // await updatePedidoVenda(editingItem.id, pedidoData, itensData); // Implementar update
      } else {
        await createPedidoVenda(pedidoData, itensData);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleFaturar = async (pedidoId: string) => {
    if (window.confirm('Tem certeza que deseja faturar este pedido? Esta ação irá gerar uma fatura e uma conta a receber.')) {
        await faturarPedido(pedidoId);
    }
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

  const getStatusBadge = (status: StatusPedidoVenda) => {
    const colors = {
      [StatusPedidoVenda.ABERTO]: 'bg-blue-100 text-blue-700 border-blue-200',
      [StatusPedidoVenda.FATURADO]: 'bg-green-100 text-green-700 border-green-200',
      [StatusPedidoVenda.CANCELADO]: 'bg-red-100 text-red-700 border-red-200'
    };
    return <span className={`glass-badge ${colors[status]}`}>{status}</span>;
  };

  return (
    <div>
      <Header 
        title="Pedidos de Venda" 
        subtitle="Gerencie suas vendas e propostas"
      />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput
              placeholder="Buscar por número ou cliente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full max-w-md"
            />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>
            Novo Pedido de Venda
          </GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={pedidosFiltrados}
          columns={[
            { header: 'Número', accessorKey: 'numero', cell: (item: PedidoVenda) => <p className="font-medium text-gray-800">{item.numero}</p> },
            { header: 'Cliente', accessorKey: 'cliente', cell: (item: PedidoVenda) => item.cliente?.nome || 'N/A' },
            { header: 'Data', accessorKey: 'dataVenda', cell: (item: PedidoVenda) => formatDate(item.dataVenda) },
            { header: 'Valor Total', accessorKey: 'valorTotal', cell: (item: PedidoVenda) => formatCurrency(item.valorTotal), className: 'text-right' },
            { header: 'Status', accessorKey: 'status', cell: (item: PedidoVenda) => getStatusBadge(item.status), className: 'text-center' },
          ]}
          loading={loading && pedidosVenda.length === 0}
          error={error}
          entityName="Pedido de Venda"
          actions={(item) => (
            <div className="flex items-center gap-2">
              <GlassButton icon={Eye} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
              {item.status === StatusPedidoVenda.ABERTO && (
                <GlassButton 
                  icon={Receipt}
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleFaturar(item.id)}
                  title="Faturar Pedido"
                />
              )}
            </div>
          )}
        />
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </GlassCard>

      <AnimatePresence>
        {isFormOpen && (
          <PedidoVendaForm
            pedido={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
