import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Loader2, Eye } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Pagination } from '../components/ui/Pagination';
import { useFaturaVenda } from '../hooks/data/useFaturaVenda';
import { StatusFatura } from '../types';

export const FaturaVendas: React.FC = () => {
  const { faturas, loading, error, currentPage, totalPages, goToPage } = useFaturaVenda();
  const [filtro, setFiltro] = useState('');

  const faturasFiltradas = faturas.filter(fatura =>
    fatura.numeroFatura.toLowerCase().includes(filtro.toLowerCase()) ||
    (fatura.pedido?.cliente?.nome && fatura.pedido.cliente.nome.toLowerCase().includes(filtro.toLowerCase()))
  );
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

  const getStatusBadge = (status: StatusFatura) => {
    const colors = {
      [StatusFatura.EMITIDA]: 'bg-blue-100 text-blue-700 border-blue-200',
      [StatusFatura.PAGA]: 'bg-green-100 text-green-700 border-green-200',
      [StatusFatura.VENCIDA]: 'bg-orange-100 text-orange-700 border-orange-200',
      [StatusFatura.CANCELADA]: 'bg-red-100 text-red-700 border-red-200'
    };
    return <span className={`glass-badge ${colors[status]}`}>{status}</span>;
  };

  const renderContent = () => {
    if (loading && faturas.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-600 font-medium">Carregando faturas...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 text-red-500">
          <p className="font-semibold">Ocorreu um erro.</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      );
    }

    if (faturasFiltradas.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          <p>Nenhuma fatura encontrada.</p>
          <p className="text-sm">Fature um pedido de venda para que ele apareça aqui.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-4 px-2 font-medium text-gray-700">Fatura</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Cliente</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Emissão</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Vencimento</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Valor</th>
              <th className="text-center py-4 px-2 font-medium text-gray-700">Status</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {faturasFiltradas.map((fatura, index) => (
                <motion.tr
                  key={fatura.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/10 hover:bg-glass-50 hover:backdrop-blur-sm transition-all duration-200"
                >
                  <td className="py-4 px-2 font-medium text-gray-800">{fatura.numeroFatura}</td>
                  <td className="py-4 px-2 text-gray-700">{fatura.pedido?.cliente?.nome}</td>
                  <td className="py-4 px-2 text-gray-700">{formatDate(fatura.dataEmissao)}</td>
                  <td className="py-4 px-2 text-gray-700">{formatDate(fatura.dataVencimento)}</td>
                  <td className="py-4 px-2 text-gray-700">{formatCurrency(fatura.valorTotal)}</td>
                  <td className="py-4 px-2 text-center">{getStatusBadge(fatura.status)}</td>
                  <td className="py-4 px-2">
                    <GlassButton icon={Eye} variant="secondary" size="sm" onClick={() => { /* Implementar visualização */ }} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Header 
        title="Faturas de Venda" 
        subtitle="Gerencie suas faturas emitidas"
      />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput
              placeholder="Buscar por fatura ou cliente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full max-w-md"
            />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        {renderContent()}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </GlassCard>
    </div>
  );
};
