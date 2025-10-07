import React from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { OrdemServico, StatusOS } from '../../types';
import toast from 'react-hot-toast';

interface KanbanBoardProps {
  ordensServico: OrdemServico[];
  setOrdensServico: React.Dispatch<React.SetStateAction<OrdemServico[]>>;
  updateOrdemServico: (id: string, data: Partial<OrdemServico>) => Promise<any>;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ ordensServico, setOrdensServico, updateOrdemServico }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns: { title: string; status: StatusOS }[] = [
    { title: 'Orçamento', status: StatusOS.ORCAMENTO },
    { title: 'Abertas', status: StatusOS.ABERTA },
    { title: 'Em Andamento', status: StatusOS.EM_ANDAMENTO },
    { title: 'Finalizadas', status: StatusOS.FINALIZADA },
    { title: 'Canceladas', status: StatusOS.CANCELADA },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId;

      if (activeContainer !== overContainer) {
        const activeItem = ordensServico.find(os => os.id === active.id);
        if (activeItem) {
          const newStatus = overContainer as StatusOS;
          
          // Optimistic UI update
          setOrdensServico(prev => 
            prev.map(os => 
              os.id === active.id ? { ...os, status: newStatus } : os
            )
          );
          
          // Update backend
          const promise = updateOrdemServico(active.id as string, { status: newStatus });
          toast.promise(promise, {
              loading: 'Atualizando status...',
              success: 'Status atualizado com sucesso!',
              error: (err) => {
                // Revert UI on failure
                setOrdensServico(prev => 
                  prev.map(os => 
                    os.id === active.id ? { ...os, status: activeItem.status } : os
                  )
                );
                return `Falha ao atualizar: ${err.message}`;
              }
          });
        }
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ordensServico.map(os => os.id)} strategy={horizontalListSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {columns.map(col => (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              ordensServico={ordensServico.filter(os => os.status === col.status)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
