import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Calendar, User } from 'lucide-react';
import { OrdemServico, PrioridadeOS } from '../../types';

interface KanbanCardProps {
  ordemServico: OrdemServico;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ ordemServico }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ordemServico.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    boxShadow: isDragging ? '0 10px 20px rgba(0,0,0,0.1)' : 'none',
  };

  const prioridadeColors = {
    [PrioridadeOS.URGENTE]: 'bg-red-100 text-red-700 border-red-200',
    [PrioridadeOS.ALTA]: 'bg-orange-100 text-orange-700 border-orange-200',
    [PrioridadeOS.MEDIA]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    [PrioridadeOS.BAIXA]: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="p-4 rounded-xl bg-glass-50 backdrop-blur-sm border border-white/20 touch-none"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-start justify-between">
        <span className={`glass-badge ${prioridadeColors[ordemServico.prioridade]}`}>
          {ordemServico.prioridade}
        </span>
        <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
          <GripVertical size={18} />
        </div>
      </div>
      
      <h4 className="font-semibold text-gray-800 my-2">{`#${ordemServico.numero}`}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ordemServico.descricaoServico || 'Sem descrição'}</p>
      
      <div className="text-xs text-gray-500 space-y-2 pt-3 border-t border-white/20">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span>{ordemServico.cliente?.nome || 'Cliente não encontrado'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>Previsão: {formatDate(ordemServico.dataPrevisao)}</span>
        </div>
      </div>
    </motion.div>
  );
};
