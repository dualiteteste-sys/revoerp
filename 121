import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  animate = false,
  delay = 0 
}) => {
  const cardClass = `glass-card p-6 ${className}`;

  if (animate) {
    return (
      <motion.div
        className={cardClass}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClass}>
      {children}
    </div>
  );
};
