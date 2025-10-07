import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { KPI } from '../../types';

interface KPICardProps {
  kpi: KPI;
  index: number;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, index }) => {
  const IconComponent = (Icons as any)[kpi.icon] || Icons.Activity;
  const isPositive = kpi.trend > 0;

  return (
    <GlassCard animate delay={index * 0.1} className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-2">{kpi.title}</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">{kpi.value}</p>
          
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(kpi.trend).toFixed(1)}%</span>
            <span className="text-gray-500">vs mês anterior</span>
          </div>
        </div>
        
        <div className={`p-3 rounded-full bg-gradient-to-br ${
          kpi.color.includes('green') ? 'from-green-100 to-green-200' :
          kpi.color.includes('blue') ? 'from-blue-100 to-blue-200' :
          kpi.color.includes('orange') ? 'from-orange-100 to-orange-200' :
          'from-purple-100 to-purple-200'
        }`}>
          <IconComponent size={24} className={kpi.color} />
        </div>
      </div>
    </GlassCard>
  );
};
