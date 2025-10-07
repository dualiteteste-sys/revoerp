import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Calendar, Clock } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';

interface CaixaFechadoProps {
  onAbrirCaixa: () => void;
}

export const CaixaFechado: React.FC<CaixaFechadoProps> = ({ onAbrirCaixa }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center flex-1 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Lock size={48} className="text-red-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Caixa Fechado</h2>
      <p className="text-gray-600 mb-8">Para iniciar as vendas, você precisa abrir o caixa.</p>
      
      <div className="flex items-center justify-center gap-6 mb-8 text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <span>{formattedTime}</span>
        </div>
      </div>

      <GlassButton size="lg" onClick={onAbrirCaixa}>
        Abrir Caixa (Ctrl + Enter)
      </GlassButton>
      <button className="text-sm text-blue-600 hover:underline mt-4">
        Ver detalhes do caixa
      </button>
    </motion.div>
  );
};
