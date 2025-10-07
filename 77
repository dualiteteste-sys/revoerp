import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';

interface PagamentoModalProps {
  valorTotal: number;
  onClose: () => void;
  onFinalizar: () => Promise<void>;
}

export const PagamentoModal: React.FC<PagamentoModalProps> = ({ valorTotal, onClose, onFinalizar }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/40 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        className="bg-glass-100 rounded-2xl shadow-glass-lg border border-white/20 p-8 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Finalizar Venda</h3>
          <GlassButton icon={X} variant="secondary" size="sm" onClick={onClose} />
        </div>
        
        {/* Conteúdo do pagamento aqui */}
        <p>Valor Total: {valorTotal}</p>

        <div className="flex gap-4 mt-8">
          <GlassButton onClick={async () => { await onFinalizar(); onClose(); }} className="flex-1">
            Finalizar Venda
          </GlassButton>
          <GlassButton variant="secondary" onClick={onClose} className="flex-1">
            Cancelar
          </GlassButton>
        </div>
      </motion.div>
    </motion.div>
  );
};
