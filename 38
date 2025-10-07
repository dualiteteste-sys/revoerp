import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, DollarSign, User } from 'lucide-react';
import { CrmOportunidade } from '../../types';

interface KanbanCardProps {
  oportunidade: CrmOportunidade;
  onEdit: () => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ oportunidade, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: oportunidade.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    boxShadow: isDragging ? '0 10px 20px rgba(0,0,0,0.1)' : 'none',
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className="p-4 rounded-xl bg-glass-50 backdrop-blur-sm border border-white/20 touch-none cursor-pointer"
      whileHover={{ scale: 1.03 }}
      onClick={onEdit}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-semibold text-gray-800 mb-2 pr-4 flex-1">{oportunidade.nome}</h4>
        <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600 pt-1">
          <GripVertical size={18} />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 space-y-2 pt-3 border-t border-white/20">
        <div className="flex items-center gap-2">
          <User size={14} />
          <span>{oportunidade.cliente?.nome || 'Cliente não associado'}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          <span>{formatCurrency(oportunidade.valorEstimado || 0)}</span>
        </div>
      </div>
    </motion.div>
  );
};
