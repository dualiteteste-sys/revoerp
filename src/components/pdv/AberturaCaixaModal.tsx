import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';
import { CurrencyInput } from '../ui/CurrencyInput';

interface AberturaCaixaModalProps {
  onAbrirCaixa: (valor: number) => void;
  onCancel: () => void;
}

export const AberturaCaixaModal: React.FC<AberturaCaixaModalProps> = ({ onAbrirCaixa, onCancel }) => {
  const [valor, setValor] = useState(0);

  const handleAbrir = () => {
    onAbrirCaixa(valor);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/40 backdrop-blur flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        className="bg-glass-100 rounded-2xl shadow-glass-lg border border-white/20 p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Abertura de Caixa</h3>
          <GlassButton icon={X} variant="secondary" size="sm" onClick={onCancel} />
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Valor disponível em caixa</label>
            <CurrencyInput value={valor} onAccept={(v) => setValor(parseFloat(v))} />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-sm text-gray-700">Imprimir comprovante de abertura de caixa</span>
          </label>
        </div>

        <div className="flex gap-4 mt-8">
          <GlassButton onClick={handleAbrir} className="flex-1">
            Abrir Caixa (Ctrl + Enter)
          </GlassButton>
          <GlassButton variant="secondary" onClick={onCancel} className="flex-1">
            Cancelar (Esc)
          </GlassButton>
        </div>
      </motion.div>
    </motion.div>
  );
};
