import React from 'react';
import ReactECharts from 'echarts-for-react';
import { GlassCard } from '../ui/GlassCard';
import { FaturamentoMensal } from '../../types';

interface GraficoFaturamentoProps {
  data: FaturamentoMensal[];
}

export const GraficoFaturamento: React.FC<GraficoFaturamentoProps> = ({ data }) => {
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: 'Faturamento Mensal (Últimos 12 meses)',
      textStyle: {
        color: '#374151',
        fontSize: 18,
        fontWeight: 600
      },
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
      borderRadius: 12,
      textStyle: {
        color: '#374151'
      },
      formatter: (params: any) => {
        const value = params[0].value;
        return `${params[0].name}<br/>Faturamento: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.mes),
      axisLine: {
        lineStyle: {
          color: 'rgba(156, 163, 175, 0.3)'
        }
      },
      axisTick: {
        lineStyle: {
          color: 'rgba(156, 163, 175, 0.3)'
        }
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 12,
        formatter: (value: number) => `R$ ${(value / 1000).toFixed(0)}k`
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(156, 163, 175, 0.1)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        data: data.map(d => d.faturamento),
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#3B82F6' },
              { offset: 0.5, color: '#8B5CF6' },
              { offset: 1, color: '#6366F1' }
            ]
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 0.5, color: 'rgba(139, 92, 246, 0.2)' },
              { offset: 1, color: 'rgba(99, 102, 241, 0.1)' }
            ]
          }
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#3B82F6',
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: 'rgba(59, 130, 246, 0.3)',
          shadowBlur: 5
        },
        emphasis: {
          itemStyle: {
            symbolSize: 12,
            shadowBlur: 10
          }
        },
        animationDuration: 2000,
        animationEasing: 'cubicInOut'
      }
    ],
  };

  return (
    <GlassCard animate delay={0.2} className="h-96 !p-0 flex items-center justify-center">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </GlassCard>
  );
};
