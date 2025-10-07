import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { useCaixa } from '../hooks/data/useCaixa';
import { TipoMovimentoCaixa } from '../types';

export const Caixa: React.FC = () => {
  const { movimentacoes, saldoAtual, totalEntradas, totalSaidas, loading, error } = useCaixa();

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

  const renderContent = () => {
    if (loading && movimentacoes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-600 font-medium">Carregando movimentações do caixa...</p>
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

    if (movimentacoes.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          <p>Nenhuma movimentação de caixa encontrada.</p>
          <p className="text-sm">Liquide contas a pagar ou a receber para ver os lançamentos aqui.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-4 px-2 font-medium text-gray-700">Data</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Descrição</th>
              <th className="text-left py-4 px-2 font-medium text-gray-700">Tipo</th>
              <th className="text-right py-4 px-2 font-medium text-gray-700">Valor</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {movimentacoes.map((mov, index) => (
                <motion.tr
                  key={mov.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/10 hover:bg-glass-50 hover:backdrop-blur-sm transition-all duration-200"
                >
                  <td className="py-4 px-2 text-gray-700">{formatDate(mov.data)}</td>
                  <td className="py-4 px-2 font-medium text-gray-800">{mov.descricao}</td>
                  <td className="py-4 px-2">
                    {mov.tipo === TipoMovimentoCaixa.ENTRADA ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <ArrowUpCircle size={16} /> Entrada
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-600">
                        <ArrowDownCircle size={16} /> Saída
                      </span>
                    )}
                  </td>
                  <td className={`py-4 px-2 text-right font-semibold ${mov.tipo === TipoMovimentoCaixa.ENTRADA ? 'text-green-700' : 'text-red-700'}`}>
                    {formatCurrency(mov.valor)}
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
        title="Caixa" 
        subtitle="Controle seu fluxo de caixa e saldo atual"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard animate delay={0.1}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200">
              <DollarSign className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Saldo Atual</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(saldoAtual)}</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard animate delay={0.2}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-100 to-green-200">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Entradas</p>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(totalEntradas)}</p>
            </div>
          </div>
        </GlassCard>
        <GlassCard animate delay={0.3}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-red-100 to-red-200">
              <TrendingDown className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total de Saídas</p>
              <p className="text-2xl font-bold text-red-700">{formatCurrency(totalSaidas)}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Movimentações Recentes</h3>
        {renderContent()}
      </GlassCard>
    </div>
  );
};
