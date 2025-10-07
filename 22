import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../ui/GlassButton';

interface EnviarBoletosModalProps {
  onEnviar: (apenasRegistrados: boolean) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const EnviarBoletosModal: React.FC<EnviarBoletosModalProps> = ({ onEnviar, onCancel, loading }) => {
  const [apenasRegistrados, setApenasRegistrados] = useState(false);

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
        <h3 className="text-xl font-bold text-gray-800 mb-6">Envio de Boletos para Cobrança</h3>
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={apenasRegistrados}
              onChange={(e) => setApenasRegistrados(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Enviar apenas boletos registrados</span>
          </label>
        </div>
        <div className="flex justify-end gap-4">
          <GlassButton variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </GlassButton>
          <GlassButton onClick={() => onEnviar(apenasRegistrados)} disabled={loading}>
            {loading ? 'Enviando...' : 'Iniciar Envio'}
          </GlassButton>
        </div>
      </motion.div>
    </motion.div>
  );
};
