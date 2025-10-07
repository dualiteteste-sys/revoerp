import React from 'react';
import { Info } from 'lucide-react';

interface InputWrapperProps {
  label: string;
  children: React.ReactNode;
  helpText?: string;
  className?: string;
  helpIcon?: boolean;
  error?: string;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({ label, children, helpText, className, helpIcon, error }) => (
  <div className={className}>
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      {helpIcon && <Info size={14} className="text-gray-400 cursor-pointer" title="Clique para mais informações" />}
    </div>
    {children}
    {error ? (
      <p className="text-xs text-red-600 mt-1">{error}</p>
    ) : (
      helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>
    )}
  </div>
);
