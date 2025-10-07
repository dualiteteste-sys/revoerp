import React from 'react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { GlassCard } from '../ui/GlassCard';

export const GraficoVendas: React.FC = () => {
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: 'Vendas por Categoria',
      textStyle: {
        color: '#374151',
        fontSize: 18,
        fontWeight: 600
      },
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: 1,
      borderRadius: 12,
      textStyle: {
        color: '#374151'
      },
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'center',
      textStyle: {
        color: '#6B7280',
        fontSize: 12
      }
    },
    series: [
      {
        name: 'Categorias',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: 'rgba(255, 255, 255, 0.8)',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#374151'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { 
            value: 1048, 
            name: 'Produtos',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#3B82F6' },
                  { offset: 1, color: '#1D4ED8' }
                ]
              }
            }
          },
          { 
            value: 735, 
            name: 'Serviços',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#8B5CF6' },
                  { offset: 1, color: '#7C3AED' }
                ]
              }
            }
          },
          { 
            value: 580, 
            name: 'Consultoria',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#10B981' },
                  { offset: 1, color: '#059669' }
                ]
              }
            }
          },
          { 
            value: 484, 
            name: 'Suporte',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#F59E0B' },
                  { offset: 1, color: '#D97706' }
                ]
              }
            }
          },
          { 
            value: 300, 
            name: 'Outros',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#EF4444' },
                  { offset: 1, color: '#DC2626' }
                ]
              }
            }
          }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx: number) => idx * 200
      }
    ]
  };

  return (
    <GlassCard animate delay={0.3} className="h-96">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </GlassCard>
  );
};
