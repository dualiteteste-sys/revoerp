import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import { OrdemServico, StatusOS } from '../../types';
import { GlassCard } from '../ui/GlassCard';

interface KanbanColumnProps {
  status: StatusOS;
  title: string;
  ordensServico: OrdemServico[];
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, title, ordensServico }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  const statusColors = {
    [StatusOS.ORCAMENTO]: 'border-t-purple-500',
    [StatusOS.ABERTA]: 'border-t-blue-500',
    [StatusOS.EM_ANDAMENTO]: 'border-t-yellow-500',
    [StatusOS.FINALIZADA]: 'border-t-green-500',
    [StatusOS.CANCELADA]: 'border-t-red-500',
  };

  return (
    <GlassCard className={`flex flex-col border-t-4 ${statusColors[status]} transition-colors duration-300 ${isOver ? 'bg-glass-200' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="text-sm font-medium text-gray-500 bg-glass-200 rounded-full px-2 py-1">
          {ordensServico.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className="flex-1 space-y-4 overflow-y-auto min-h-[300px] p-1 -m-1"
      >
        <SortableContext items={ordensServico.map(os => os.id)} strategy={verticalListSortingStrategy}>
          {ordensServico.map(os => (
            <KanbanCard key={os.id} ordemServico={os} />
          ))}
        </SortableContext>
      </div>
    </GlassCard>
  );
};
