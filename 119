import React from 'react';
import { motion } from 'framer-motion';
import { Save, X, Loader2 } from 'lucide-react';
import { GlassButton } from './GlassButton';

interface GenericFormProps {
  title: string;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  loading?: boolean;
  canSave?: boolean;
  size?: 'max-w-3xl' | 'max-w-4xl' | 'max-w-6xl' | 'max-w-7xl';
}

export const GenericForm: React.FC<GenericFormProps> = ({ 
  title, 
  onSave, 
  onCancel, 
  children, 
  loading = false,
  canSave = true,
  size = 'max-w-4xl'
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading && canSave) {
      onSave();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/40 backdrop-blur flex items-center justify-center z-50 p-8"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className={`w-full ${size} h-auto max-h-[95vh] flex flex-col`}
      >
        <div className="flex justify-end h-14 items-center">
          <GlassButton icon={X} variant="secondary" onClick={onCancel} />
        </div>
        
        <div className="flex-1 flex flex-col bg-glass-100 rounded-2xl shadow-glass-lg overflow-hidden border border-white/20">
          <div className="px-8 pt-6 pb-2">
             <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {children}
            </div>

            <div className="flex gap-4 p-8 border-t border-white/30 bg-glass-200">
              {canSave && (
                <GlassButton type="submit" icon={loading ? Loader2 : Save} disabled={loading} className={loading ? 'animate-spin' : ''}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </GlassButton>
              )}
              <GlassButton type="button" variant="secondary" onClick={onCancel} disabled={loading}>
                Cancelar
              </GlassButton>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
