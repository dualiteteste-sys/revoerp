import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Atividade } from '../../types';

interface AtividadesRecentesProps {
  atividades: Atividade[];
}

export const AtividadesRecentes: React.FC<AtividadesRecentesProps> = ({ atividades }) => {
  const formatarTempo = (timestamp: Date) => {
    const agora = new Date();
    const diff = agora.getTime() - timestamp.getTime();
    const minutos = Math.floor(diff / 60000);
    
    if (minutos < 1) return 'Agora';
    if (minutos < 60) return `${minutos}m atrás`;
    
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `${horas}h atrás`;
    
    const dias = Math.floor(horas / 24);
    return `${dias}d atrás`;
  };

  return (
    <GlassCard animate delay={0.4} className="h-96">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividades Recentes</h3>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {atividades.map((atividade, index) => (
          <motion.div
            key={atividade.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-glass-50 backdrop-blur-sm border border-white/10"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{atividade.tipo}</p>
              <p className="text-sm text-gray-600 truncate">{atividade.descricao}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={12} className="text-gray-400" />
                <span className="text-xs text-gray-500">{formatarTempo(atividade.timestamp)}</span>
                <span className="text-xs text-gray-400">por {atividade.usuario}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};
