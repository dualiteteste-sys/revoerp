import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, User } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassInput } from '../ui/GlassInput';
import { GlassButton } from '../ui/GlassButton';
import { HamburgerButton } from '../ui/HamburgerButton';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
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
          
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            <GlassInput
              placeholder="Buscar..."
              icon={<Search size={20} />}
              className="w-48 md:w-80"
            />
            
            <GlassButton icon={Bell} variant="secondary">
              <span className="sr-only">Notificações</span>
            </GlassButton>
            
            <GlassButton icon={User} variant="secondary">
              <span className="sr-only">Perfil</span>
            </GlassButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
