import React from 'react';
import { ContaPagar } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassButton } from '../../ui/GlassButton';

interface CompetenciaTabProps {
  formData: Partial<ContaPagar>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<ContaPagar>>>;
}

const getMonthYear = (dateStr?: string): { month: number; year: number } => {
  if (dateStr) {
    const [year, month] = dateStr.split('-').map(Number);
    return { month, year };
  }
  const today = new Date();
  return { month: today.getMonth() + 1, year: today.getFullYear() };
};

export const CompetenciaTab: React.FC<CompetenciaTabProps> = ({ formData, setFormData }) => {
  const { month, year } = getMonthYear(formData.competencia);

  const handleCompetenciaChange = (newMonth: number, newYear: number) => {
    if (newMonth === 0) {
      newMonth = 12;
      newYear -= 1;
    }
    if (newMonth === 13) {
      newMonth = 1;
      newYear += 1;
    }
    const newCompetencia = `${newYear}-${String(newMonth).padStart(2, '0')}`;
    setFormData(prev => ({ ...prev, competencia: newCompetencia }));
  };

  const monthName = new Date(year, month - 1, 1).toLocaleString('pt-BR', { month: 'long' });

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <label className="text-sm text-gray-600 mb-1 block">Competência</label>
      <div className="flex items-center gap-4">
        <GlassButton icon={ChevronLeft} onClick={() => handleCompetenciaChange(month - 1, year)} />
        <span className="text-lg font-semibold text-gray-800 w-48 text-center capitalize">{`${monthName} / ${year}`}</span>
        <GlassButton icon={ChevronRight} onClick={() => handleCompetenciaChange(month + 1, year)} />
      </div>
    </div>
  );
};
