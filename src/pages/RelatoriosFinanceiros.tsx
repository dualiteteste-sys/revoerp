import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { Loader2, TrendingUp, TrendingDown, DollarSign, BarChart } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { useRelatorioService } from '../hooks/useRelatorioService';

export const RelatoriosFinanceiros: React.FC = () => {
  const { dreMensal, loading, error } = useRelatorioService();

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const { kpis, chartOptions } = useMemo(() => {
    const totalReceita = dreMensal.reduce((acc, item) => acc + item.receita, 0);
    const totalDespesa = dreMensal.reduce((acc, item) => acc + item.despesa, 0);
    const lucroBruto = totalReceita - totalDespesa;
    const margemLucro = totalReceita > 0 ? (lucroBruto / totalReceita) * 100 : 0;

    const kpisData = [
      { title: 'Lucro Bruto Total', value: formatCurrency(lucroBruto), icon: DollarSign, color: 'text-blue-600' },
      { title: 'Receita Total', value: formatCurrency(totalReceita), icon: TrendingUp, color: 'text-green-600' },
      { title: 'Despesa Total', value: formatCurrency(totalDespesa), icon: TrendingDown, color: 'text-red-600' },
      { title: 'Margem de Lucro', value: `${margemLucro.toFixed(2)}%`, icon: BarChart, color: 'text-purple-600' },
    ];

    const chartOptionsData = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          let tooltip = `${params[0].name}<br/>`;
          params.forEach((p: any) => {
            tooltip += `${p.marker} ${p.seriesName}: ${formatCurrency(p.value)}<br/>`;
          });
          return tooltip;
        }
      },
      legend: {
        data: ['Receita', 'Despesa', 'Resultado'],
        textStyle: { color: '#6B7280' },
        top: 10,
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: [{
        type: 'category',
        data: dreMensal.map(d => d.mes_nome),
        axisTick: { alignWithLabel: true },
        axisLabel: { color: '#6B7280' }
      }],
      yAxis: [{
        type: 'value',
        axisLabel: { 
          formatter: (value: number) => `${(value / 1000).toFixed(0)}k`,
          color: '#6B7280'
        },
        splitLine: { lineStyle: { color: 'rgba(156, 163, 175, 0.1)' } }
      }],
      series: [
        { name: 'Receita', type: 'bar', barWidth: '20%', data: dreMensal.map(d => d.receita), itemStyle: { color: '#22c55e' } },
        { name: 'Despesa', type: 'bar', barWidth: '20%', data: dreMensal.map(d => d.despesa), itemStyle: { color: '#ef4444' } },
        { name: 'Resultado', type: 'line', smooth: true, data: dreMensal.map(d => d.resultado), itemStyle: { color: '#3b82f6' }, lineStyle: { width: 3 } }
      ]
    };

    return { kpis: kpisData, chartOptions: chartOptionsData };
  }, [dreMensal]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={48} />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20 text-red-500">
          <p className="font-semibold">Ocorreu um erro ao carregar o relatório.</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      );
    }

    if (dreMensal.length === 0) {
      return (
        <div className="text-center py-20 text-gray-500">
          <p>Nenhum dado financeiro encontrado para gerar o relatório.</p>
          <p className="text-sm">Liquide contas a pagar e a receber para começar.</p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {kpis.map((kpi, index) => (
            <GlassCard key={index} animate delay={index * 0.1}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-200`}>
                  <kpi.icon className={kpi.color} size={24} />
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Análise Mensal de Resultados</h3>
          <ReactECharts option={chartOptions} style={{ height: '400px', width: '100%' }} />
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tabela de Resultados (DRE)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-2 font-medium text-gray-700">Mês/Ano</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">Receita</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">Despesa</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-700">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {dreMensal.map((item, index) => (
                  <motion.tr
                    key={`${item.ano}-${item.mes}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/10"
                  >
                    <td className="py-3 px-2 font-medium text-gray-800">{item.mes_nome}/{item.ano}</td>
                    <td className="py-3 px-2 text-right text-green-700">{formatCurrency(item.receita)}</td>
                    <td className="py-3 px-2 text-right text-red-700">{formatCurrency(item.despesa)}</td>
                    <td className={`py-3 px-2 text-right font-bold ${item.resultado >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                      {formatCurrency(item.resultado)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </>
    );
  };

  return (
    <div>
      <Header 
        title="Relatórios Financeiros" 
        subtitle="Análise de Demonstrativo de Resultados (DRE)"
      />
      {renderContent()}
    </div>
  );
};
