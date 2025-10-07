import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface CurrencyInputProps {
  value: string | number;
  onAccept: (value: string, mask: any) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(({ value, onAccept, ...props }, ref) => {
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  return (
    <IMaskInput
      mask={Number}
      radix=","
      thousandsSeparator="."
      scale={2}
      padFractionalZeros
      normalizeZeros
      value={String(value ?? '0')}
      onAccept={onAccept}
      className="glass-input text-right"
      placeholder="R$ 0,00"
      onFocus={handleFocus}
      inputRef={ref as React.Ref<HTMLInputElement>}
      {...props}
    />
  );
});

CurrencyInput.displayName = 'CurrencyInput';
