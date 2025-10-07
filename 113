import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { GlassButton } from '../../ui/GlassButton';
import { GlassInput } from '../../ui/GlassInput';
import toast from 'react-hot-toast';

interface ConvidarUsuarioModalProps {
  onInvite: (email: string) => Promise<void>;
  onCancel: () => void;
}

export const ConvidarUsuarioModal: React.FC<ConvidarUsuarioModalProps> = ({ onInvite, onCancel }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Por favor, insira um e-mail válido.');
      return;
    }
    setLoading(true);
    await onInvite(email);
    setLoading(false);
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-glass-100 rounded-2xl shadow-glass-lg border border-white/20 p-8 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Convidar Novo Usuário</h3>
            <GlassButton icon={X} variant="secondary" size="sm" onClick={onCancel} />
        </div>
        <p className="text-gray-600 mb-6">
          O usuário receberá um convite por e-mail para criar uma senha e acessar o sistema. Ele será cadastrado como um vendedor.
        </p>
        <div className="space-y-4">
            <GlassInput
                type="email"
                placeholder="email.do.convidado@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <GlassButton variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </GlassButton>
          <GlassButton icon={Mail} onClick={handleInvite} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Convite'}
          </GlassButton>
        </div>
      </motion.div>
    </motion.div>
  );
};
