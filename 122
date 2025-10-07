import React, { forwardRef } from 'react';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(({
  type = 'text',
  placeholder,
  label,
  className = '',
  icon,
  ...props
}, ref) => {
  return (
    <div className={`relative w-full ${className}`}>
      {label && (
         <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`glass-input ${icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
});

GlassInput.displayName = 'GlassInput';
