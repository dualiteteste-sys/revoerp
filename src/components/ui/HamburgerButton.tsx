import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';

export const HamburgerButton: React.FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu } = useSidebar();

  return (
    <button
      onClick={toggleMobileMenu}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-glass-200 backdrop-blur-sm border border-white/30 text-gray-700"
      aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={isMobileMenuOpen ? 'x' : 'menu'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
