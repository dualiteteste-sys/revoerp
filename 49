import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';
import { useEstoque } from '../../hooks/data/useEstoque';
import { EstoqueMovimento } from '../../types';

interface HistoricoModalProps {
  produtoId: string;
  onClose: () => void;
}

export const HistoricoModal: React.FC<HistoricoModalProps> = ({ produtoId, onClose }) => {
  const { getHistorico } = useEstoque();
  const [historico, setHistorico] = useState<EstoqueMovimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorico = async () => {
      setLoading(true);
      const data = await getHistorico(produtoId);
      setHistorico(data);
      setLoading(false);
    };
    fetchHistorico();
  }, [produtoId, getHistorico]);
  
  const formatDate = (date: Date) => new Date(date).toLocaleString('pt-BR');

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      );
    }
    if (historico.length === 0) {
      return <p className="text-center text-gray-500 py-10">Nenhuma movimentação encontrada para este produto.</p>;
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Data</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Tipo</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Quantidade</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Origem</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {historico.map((mov, index) => (
                <motion.tr
                  key={mov.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/10"
                >
                  <td className="py-3 px-2 text-gray-600">{formatDate(mov.data)}</td>
                  <td className="py-3 px-2">
                    {mov.tipo === 'ENTRADA' ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <ArrowUpCircle size={16} /> Entrada
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-600">
                        <ArrowDownCircle size={16} /> Saída
                      </span>
                    )}
                  </td>
                  <td className={`py-3 px-2 text-right font-semibold ${mov.tipo === 'ENTRADA' ? 'text-green-700' : 'text-red-700'}`}>
                    {mov.tipo === 'ENTRADA' ? '+' : '-'}{mov.quantidade}
                  </td>
                  <td className="py-3 px-2 text-gray-700">{mov.origem || 'N/A'}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/40 backdrop-blur flex items-center justify-center z-50 p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl h-auto max-h-[90vh] flex flex-col bg-glass-100 rounded-2xl shadow-glass-lg border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-gray-800">Histórico de Movimentações</h2>
          <GlassButton icon={X} variant="secondary" onClick={onClose} />
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};
