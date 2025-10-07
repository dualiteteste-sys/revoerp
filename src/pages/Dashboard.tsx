import React, { useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { KPICard } from '../components/dashboard/KPICard';
import { AtividadesRecentes } from '../components/dashboard/AtividadesRecentes';
import { GraficoFaturamento } from '../components/dashboard/GraficoFaturamento';
import { GraficoVendas } from '../components/dashboard/GraficoVendas';
import { RankingCategorias } from '../components/dashboard/RankingCategorias';
import { generateMockAtividades } from '../lib/mockData';
import { useDashboard } from '../hooks/data/useDashboard';
import { KPI } from '../types';
import { Loader2 } from 'lucide-react';

const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }
  return ((current - previous) / previous) * 100;
};

export const Dashboard: React.FC = () => {
  const { stats, faturamentoMensal, loading, error } = useDashboard();
  const atividades = generateMockAtividades(); // Mantendo atividades recentes como mock por enquanto

  const kpis: KPI[] = useMemo(() => {
    if (!stats) return [];
    
    return [
      {
        title: 'Faturamento do Mês',
        value: `R$ ${stats.faturamentoTotalMesAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        icon: 'DollarSign',
        trend: calculateTrend(stats.faturamentoTotalMesAtual, stats.faturamentoTotalMesAnterior),
        color: 'text-green-600',
      },
      {
        title: 'Novos Clientes',
        value: stats.novosClientesMesAtual.toString(),
        icon: 'Users',
        trend: calculateTrend(stats.novosClientesMesAtual, stats.novosClientesMesAnterior),
        color: 'text-blue-600',
      },
      {
        title: 'Pedidos Realizados',
        value: stats.pedidosRealizadosMesAtual.toString(),
        icon: 'ShoppingCart',
        trend: calculateTrend(stats.pedidosRealizadosMesAtual, stats.pedidosRealizadosMesAnterior),
        color: 'text-orange-600',
      },
      {
        title: 'Taxa de Conversão',
        value: `2.8%`, // Placeholder
        icon: 'Target',
        trend: 1.2, // Placeholder
        color: 'text-purple-600',
      },
    ];
  }, [stats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div>
      <Header 
        title="Dashboard" 
        subtitle="Visão geral do seu negócio em tempo real"
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <KPICard key={kpi.title} kpi={kpi} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-8">
          <GraficoFaturamento data={faturamentoMensal} />
        </div>
        <div className="lg:col-span-4">
          <AtividadesRecentes atividades={atividades} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <GraficoVendas />
        </div>
        <div className="lg:col-span-5">
          <RankingCategorias />
        </div>
      </div>
    </div>
  );
};
