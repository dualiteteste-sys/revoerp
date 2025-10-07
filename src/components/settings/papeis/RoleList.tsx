import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Papel } from '../../../types';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';

interface RoleListProps {
  roles: Papel[];
  selectedRole: Papel | null;
  onSelectRole: (role: Papel) => void;
  onNewRole: () => void;
  onEditRole: (role: Papel) => void;
  onDeleteRole: (id: string) => void;
}

export const RoleList: React.FC<RoleListProps> = ({
  roles,
  selectedRole,
  onSelectRole,
  onNewRole,
  onEditRole,
  onDeleteRole,
}) => {
  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Papéis</h3>
        <GlassButton icon={Plus} size="sm" onClick={onNewRole}>
          Novo Papel
        </GlassButton>
      </div>
      <div className="flex-1 overflow-y-auto -mx-2">
        <ul className="space-y-1">
          {roles.map(role => (
            <li key={role.id}>
              <div
                onClick={() => onSelectRole(role)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectRole(role); }}
                role="button"
                tabIndex={0}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors group flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                  selectedRole?.id === role.id ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-white/50 text-gray-700'
                }`}
              >
                <span>{role.nome}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <GlassButton icon={Edit2} size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); onEditRole(role); }} />
                  <GlassButton icon={Trash2} size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); onDeleteRole(role.id); }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
};
