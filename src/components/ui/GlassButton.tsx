import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

type GlassButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const sizeClasses = {
    sm: 'px-2 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'text-blue-700 hover:text-blue-800',
    secondary: 'text-gray-700 hover:text-gray-800',
    danger: 'text-red-700 hover:text-red-800'
  };
  
  const iconOnlyClasses = !children ? (size === 'sm' ? 'px-2' : 'px-3') : 'gap-2';

  return (
    <motion.button
      type={type}
      className={`glass-button flex items-center justify-center font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${iconOnlyClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
      {children}
    </motion.button>
  );
};
