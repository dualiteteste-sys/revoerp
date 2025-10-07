import React, { useState } from 'react';
import { MoreVertical, Info, Search, X, Key, Power, Printer, FileText } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';
import { motion, AnimatePresence } from 'framer-motion';

export const PdvHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Busca avançada (Ctrl+B)', icon: Search },
    { label: 'Usar item não cadastrado (Ctrl+K)', icon: Key },
    { label: 'Cancelar venda (Ctrl+DEL)', icon: X },
    { label: 'Informar cliente (Ctrl+Q ou F8)', icon: FileText },
    { label: 'Faturar pré-venda', icon: Printer },
    { label: 'Mostrar atalhos (Ctrl+?)', icon: Info },
    { label: 'Detalhes do caixa (Ctrl+Y)', icon: Info },
    { label: 'Lançar sangria de caixa', icon: Info },
    { label: 'Lançar reforço de caixa', icon: Info },
    { label: 'Fechar caixa', icon: Power },
  ];

  return (
    <header className="mb-4">
      <div className="flex justify-end items-center gap-2">
        <GlassButton variant="secondary" size="sm">Detalhes do caixa (Ctrl+Y)</GlassButton>
        <GlassButton variant="secondary" size="sm">Busca avançada (Ctrl+B)</GlassButton>
        <div className="relative">
          <GlassButton icon={MoreVertical} variant="secondary" size="sm" onClick={() => setIsMenuOpen(prev => !prev)} />
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-64 bg-glass-100 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg z-20"
              >
                <ul className="p-2">
                  {menuItems.map(item => (
                    <li key={item.label}>
                      <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-white/30">
                        <item.icon size={16} />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
