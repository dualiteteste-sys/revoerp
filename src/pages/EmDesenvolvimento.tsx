import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';

interface EmDesenvolvimentoProps {
  modulo: string;
}

export const EmDesenvolvimento: React.FC<EmDesenvolvimentoProps> = ({ modulo }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header 
        title={modulo} 
        subtitle="Módulo em desenvolvimento"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-96"
      >
        <GlassCard className="text-center max-w-lg">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench size={48} className="text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {modulo}
            </h2>
            
            <p className="text-gray-600 mb-6">
              Este módulo está em desenvolvimento e será disponibilizado em breve.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Clock size={20} />
              <span className="font-medium">Em desenvolvimento</span>
            </div>

            <motion.div
              className="w-full bg-glass-200 rounded-full h-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              />
            </motion.div>
            
            <p className="text-sm text-gray-500">60% concluído</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8"
          >
            <GlassButton 
              icon={ArrowLeft} 
              onClick={() => navigate('/dashboard')}
              variant="secondary"
            >
              Voltar ao Dashboard
            </GlassButton>
          </motion.div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
