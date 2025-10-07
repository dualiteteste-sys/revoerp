import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import { CrmOportunidade, CrmEtapa } from '../../types';
import { GlassCard } from '../ui/GlassCard';

interface KanbanColumnProps {
  etapa: CrmEtapa;
  title: string;
  oportunidades: CrmOportunidade[];
  onEdit: (oportunidade: CrmOportunidade) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ etapa, title, oportunidades, onEdit }) => {
  const { setNodeRef, isOver } = useDroppable({ id: etapa });

  const etapaColors = {
    [CrmEtapa.LEAD]: 'border-t-gray-400',
    [CrmEtapa.PROSPECCAO]: 'border-t-blue-500',
    [CrmEtapa.NEGOCIACAO]: 'border-t-yellow-500',
    [CrmEtapa.GANHO]: 'border-t-green-500',
    [CrmEtapa.PERDIDO]: 'border-t-red-500',
  };

  const totalValor = oportunidades.reduce((sum, op) => sum + (op.valorEstimado || 0), 0);

  return (
    <GlassCard className={`flex flex-col border-t-4 ${etapaColors[etapa]} transition-colors duration-300 ${isOver ? 'bg-glass-200' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-sm font-medium text-gray-500 bg-glass-200 rounded-full px-2 py-1">
          {oportunidades.length}
        </span>
      </div>
      <p className="text-xs text-gray-600 mb-4 -mt-2">
        Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValor)}
      </p>
      <div
        ref={setNodeRef}
        className="flex-1 space-y-4 overflow-y-auto min-h-[300px] p-1 -m-1"
      >
        <SortableContext items={oportunidades.map(op => op.id)} strategy={verticalListSortingStrategy}>
          {oportunidades.map(op => (
            <KanbanCard key={op.id} oportunidade={op} onEdit={() => onEdit(op)} />
          ))}
        </SortableContext>
      </div>
    </GlassCard>
  );
};
