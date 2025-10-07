import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassInput } from '../ui/GlassInput';
import { GlassButton } from '../ui/GlassButton';
import { HamburgerButton } from '../ui/HamburgerButton';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="lg:hidden">
              <HamburgerButton />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
              {subtitle && (
                <p className="text-sm sm:text-base text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <GlassInput
                placeholder="Buscar..."
                icon={<Search size={20} />}
                className="w-48 md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <GlassButton icon={Bell} variant="secondary">
              <span className="sr-only">Notificações</span>
            </GlassButton>
            
            <div className="relative" ref={menuRef}>
              <GlassButton icon={User} variant="secondary" onClick={() => setIsMenuOpen(prev => !prev)}>
                <span className="sr-only">Perfil</span>
              </GlassButton>
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-glass-100 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg z-50"
                  >
                    <div className="p-4 border-b border-white/20">
                      <p className="font-semibold text-gray-800 truncate">{user?.email}</p>
                      <p className="text-sm text-gray-600">Administrador</p>
                    </div>
                    <ul className="p-2">
                      <li>
                        <button
                          onClick={signOut}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-100/80 transition-colors"
                        >
                          <LogOut size={16} />
                          Sair
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
