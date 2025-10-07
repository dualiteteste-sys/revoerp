import React from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { CrmOportunidade, CrmEtapa } from '../../types';
import toast from 'react-hot-toast';

interface KanbanBoardProps {
  oportunidades: CrmOportunidade[];
  updateOportunidade: (id: string, data: Partial<CrmOportunidade>) => Promise<any>;
  onEdit: (oportunidade: CrmOportunidade) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ oportunidades, updateOportunidade, onEdit }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns: { title: string; etapa: CrmEtapa }[] = [
    { title: 'Lead', etapa: CrmEtapa.LEAD },
    { title: 'Prospecção', etapa: CrmEtapa.PROSPECCAO },
    { title: 'Negociação', etapa: CrmEtapa.NEGOCIACAO },
    { title: 'Ganho', etapa: CrmEtapa.GANHO },
    { title: 'Perdido', etapa: CrmEtapa.PERDIDO },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.data.current?.sortable.containerId !== over.id) {
        const activeItem = oportunidades.find(op => op.id === active.id);
        if (activeItem) {
          const newEtapa = over.id as CrmEtapa;
          updateOportunidade(active.id as string, { etapa: newEtapa });
        }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {columns.map(col => (
            <KanbanColumn
              key={col.etapa}
              etapa={col.etapa}
              title={col.title}
              oportunidades={oportunidades.filter(op => op.etapa === col.etapa)}
              onEdit={onEdit}
            />
          ))}
        </div>
    </DndContext>
  );
};
