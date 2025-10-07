import React from 'react';
import { usePdv } from '../../contexts/PdvContext';
import { GlassCard } from '../ui/GlassCard';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';

export const PdvCart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = usePdv();

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  if (cart.length === 0) {
    return (
      <GlassCard className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">O carrinho está vazio.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="flex-1 overflow-hidden flex flex-col">
      <div className="overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-2 text-left font-medium text-gray-700 w-[50%]">Produto</th>
              <th className="p-2 text-center font-medium text-gray-700">Qtd.</th>
              <th className="p-2 text-right font-medium text-gray-700">Preço Un.</th>
              <th className="p-2 text-right font-medium text-gray-700">Subtotal</th>
              <th className="p-2 w-12"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.tr
                  key={item.produtoId}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/10"
                >
                  <td className="p-2 font-medium text-gray-800">{item.produto.nome}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.quantidade}
                      onChange={(e) => updateQuantity(item.produtoId, parseFloat(e.target.value) || 1)}
                      className="glass-input text-center w-20"
                    />
                  </td>
                  <td className="p-2 text-right text-gray-600">{formatCurrency(item.valorUnitario)}</td>
                  <td className="p-2 text-right font-semibold text-gray-800">{formatCurrency(item.valorTotal)}</td>
                  <td className="p-2 text-center">
                    <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => removeFromCart(item.produtoId)} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
