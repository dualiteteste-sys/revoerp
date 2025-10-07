import React from 'react';
import { ContaReceber } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';

interface MarcadoresTabProps {
  formData: Partial<ContaReceber>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ContaReceber>>>;
}

export const MarcadoresTab: React.FC<MarcadoresTabProps> = ({ formData, setFormData }) => {
  const handleMarcadoresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const marcadores = e.target.value.split(',').map(m => m.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, marcadores }));
  };

  return (
    <div>
      <label htmlFor="marcadores" className="text-sm text-gray-600 mb-1 block">Marcadores</label>
      <GlassInput
        id="marcadores"
        value={(formData.marcadores || []).join(', ')}
        onChange={handleMarcadoresChange}
        placeholder="Adicione marcadores separados por vírgula"
      />
      <p className="text-xs text-gray-500 mt-1">Separados por vírgula ou tab.</p>
    </div>
  );
};
