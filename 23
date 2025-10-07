import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../ui/GlassButton';

interface GerarCobrancasModalProps {
  onGerar: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export const GerarCobrancasModal: React.FC<GerarCobrancasModalProps> = ({ onGerar, onCancel, loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/40 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-glass-100 rounded-2xl shadow-glass-lg border border-white/20 p-8 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Gerar Cobranças do Mês</h3>
        <p className="text-gray-600 mb-6">
          A geração das cobranças do mês selecionado pode demorar. Clique no botão "Gerar Cobranças" para iniciar o processo.
        </p>
        <div className="flex justify-end gap-4">
          <GlassButton variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </GlassButton>
          <GlassButton onClick={onGerar} disabled={loading}>
            {loading ? 'Gerando...' : 'Gerar Cobranças'}
          </GlassButton>
        </div>
      </motion.div>
    </motion.div>
  );
};
