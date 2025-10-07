import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Loader2, Eye } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Pagination } from '../components/ui/Pagination';
import { useOrdemCompra } from '../hooks/data/useOrdemCompra';
import { OrdemCompra, OrdemCompraItem, StatusOrdemCompra } from '../types';
import { OrdemCompraForm } from '../components/ordens-compra/OrdemCompraForm';

export const OrdensCompra: React.FC = () => {
  const { 
    ordensCompra, 
    loading, 
    error, 
    createOrdemCompra,
    currentPage,
    totalPages,
    goToPage
  } = useOrdemCompra();
  const [filtro, setFiltro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingOrdem, setEditingOrdem] = useState<OrdemCompra | undefined>();

  const ordensFiltradas = ordensCompra.filter(ordem =>
    ordem.numero.toLowerCase().includes(filtro.toLowerCase()) ||
    (ordem.fornecedor?.nome && ordem.fornecedor.nome.toLowerCase().includes(filtro.toLowerCase()))
  );
  
  const handleSave = async (
    ordemData: Partial<Omit<OrdemCompra, 'id' | 'createdAt' | 'updatedAt'>>,
    itensData: Omit<OrdemCompraItem, 'id' | 'createdAt' | 'updatedAt' | 'ordemCompraId'>[]
  ) => {
    setIsSaving(true);
    try {
      if (editingOrdem) {
        // await updateOrdemCompra(editingOrdem.id, ordemData, itensData); // Implementar update
      } else {
        await createOrdemCompra(ordemData, itensData);
      }
      setShowForm(false);
      setEditingOrdem(undefined);
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

  const getStatusBadge = (status: StatusOrdemCompra) => {
    const colors = {
      [StatusOrdemCompra.ABERTA]: 'bg-blue-100 text-blue-700 border-blue-200',
      [StatusOrdemCompra.RECEBIDA]: 'bg-green-100 text-green-700 border-green-200',
      [StatusOrdemCompra.CANCELADA]: 'bg-red-100 text-red-700 border-red-200'
    };
    return <span className={`glass-badge ${colors[status]}`}>{status}</span>;
  };

  const renderContent = () => {
    if (loading && ordensCompra.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-600 font-medium">Carregando ordens de compra...</p>
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

    if (ordensFiltradas.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          <p>Nenhuma ordem de compra encontrada.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-4 px-2 font-medium text-gray-700">Número</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Fornecedor</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Data</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Valor Total</th>
              <th className="text-center py-4 px-2 font-medium text-gray-700">Status</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {ordensFiltradas.map((ordem, index) => (
                <motion.tr
                  key={ordem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/10 hover:bg-glass-50 hover:backdrop-blur-sm transition-all duration-200"
                >
                  <td className="py-4 px-2 font-medium text-gray-800">{ordem.numero}</td>
                  <td className="py-4 px-2 text-gray-700">{ordem.fornecedor?.nome}</td>
                  <td className="py-4 px-2 text-gray-700">{formatDate(ordem.dataCompra)}</td>
                  <td className="py-4 px-2 text-gray-700">{formatCurrency(ordem.totalGeral)}</td>
                  <td className="py-4 px-2 text-center">{getStatusBadge(ordem.status)}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-2">
                      <GlassButton icon={Eye} variant="secondary" size="sm" onClick={() => { /* Implementar visualização */ }} />
                    </div>
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
        title="Ordens de Compra" 
        subtitle="Gerencie suas compras e recebimentos de suprimentos"
      />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput
              placeholder="Buscar por número ou fornecedor..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full max-w-md"
            />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={() => { setEditingOrdem(undefined); setShowForm(true); }}>
            Nova Ordem de Compra
          </GlassButton>
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
      
      <AnimatePresence>
        {showForm && (
          <OrdemCompraForm
            ordem={editingOrdem}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingOrdem(undefined); }}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
