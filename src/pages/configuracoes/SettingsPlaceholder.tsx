import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

interface SettingsPlaceholderProps {
  title: string;
}

const SettingsPlaceholder: React.FC<SettingsPlaceholderProps> = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center"
    >
      <GlassCard className="text-center w-full p-10">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wrench size={48} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Em Breve
        </h2>
        <p className="text-gray-600">
          A página de configuração para <strong className="text-gray-700">{title}</strong> está em desenvolvimento.
        </p>
      </GlassCard>
    </motion.div>
  );
};

export default SettingsPlaceholder;
