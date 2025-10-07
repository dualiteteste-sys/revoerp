import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, User, Calendar } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useComissoes } from '../hooks/data/useComissoes';
import { Comissao, StatusComissao } from '../types';

export const Comissoes: React.FC = () => {
  const { 
    comissoes, 
    loading, 
    error, 
    kpis,
    currentPage,
    totalPages,
    goToPage
  } = useComissoes();
  const [filtro, setFiltro] = useState('');

  const comissoesFiltradas = comissoes.filter(c =>
    c.vendedorNome.toLowerCase().includes(filtro.toLowerCase()) ||
    c.clienteNome.toLowerCase().includes(filtro.toLowerCase())
  );
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

  const getStatusBadge = (status: StatusComissao) => {
    const colors = {
      [StatusComissao.PENDENTE]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      [StatusComissao.LIBERADA]: 'bg-blue-100 text-blue-700 border-blue-200',
      [StatusComissao.PAGA]: 'bg-green-100 text-green-700 border-green-200',
      [StatusComissao.CANCELADA]: 'bg-red-100 text-red-700 border-red-200',
    };
    return <span className={`glass-badge ${colors[status]}`}>{status}</span>;
  };

  const columns = useMemo(() => [
    { header: 'Vendedor', accessorKey: 'vendedorNome', cell: (item: Comissao) => <p className="font-medium text-gray-800">{item.vendedorNome}</p> },
    { header: 'Cliente', accessorKey: 'clienteNome' },
    { header: 'Data Venda', accessorKey: 'dataVenda', cell: (item: Comissao) => formatDate(item.dataVenda) },
    { header: 'Valor Venda', accessorKey: 'valorVenda', cell: (item: Comissao) => formatCurrency(item.valorVenda), className: 'text-right' },
    { header: 'Valor Comissão', accessorKey: 'valorComissao', cell: (item: Comissao) => formatCurrency(item.valorComissao), className: 'text-right font-semibold' },
    { header: 'Status', accessorKey: 'status', cell: (item: Comissao) => getStatusBadge(item.status), className: 'text-center' },
  ], []);

  const kpiIcons = {
    'Total a Pagar': DollarSign,
    'Total Pago no Mês': Percent,
    'Top Vendedor': User,
    'Mês de Referência': Calendar
  };

  return (
    <div>
      <Header title="Gestão de Comissões" subtitle="Acompanhe e gerencie as comissões de sua equipe" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {kpis.map((kpi, index) => (
          <GlassCard key={index} animate delay={index * 0.1}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                {React.createElement(kpiIcons[kpi.title] || DollarSign, { className: 'text-blue-600', size: 24 })}
              </div>
              <div>
                <p className="text-sm text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-800">{kpi.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por vendedor ou cliente..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
          </div>
          <GlassButton icon={DollarSign}>Pagar Comissões Selecionadas</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={comissoesFiltradas}
          columns={columns}
          loading={loading && comissoes.length === 0}
          error={error}
          entityName="Comissão"
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </GlassCard>
    </div>
  );
};
