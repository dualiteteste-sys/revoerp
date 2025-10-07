import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface PercentageInputProps {
  value: string | number;
  onAccept: (value: string, mask: any) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const PercentageInput = forwardRef<HTMLInputElement, PercentageInputProps>(({ value, onAccept, ...props }, ref) => {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <div className="relative">
      <IMaskInput
        mask={Number}
        radix=","
        scale={2}
        padFractionalZeros
        normalizeZeros
        value={String(value ?? '0')}
        onAccept={onAccept}
        className="glass-input text-right pr-8"
        placeholder="0,00"
        onFocus={handleFocus}
        inputRef={ref as React.Ref<HTMLInputElement>}
        {...props}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
    </div>
  );
});

PercentageInput.displayName = 'PercentageInput';
