import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Papel } from '../../../types';
import { permissionsConfig, PermissionTab } from '../../../config/permissionsConfig';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';
import { PermissionGroupCard } from './PermissionGroupCard';
import { Save } from 'lucide-react';

interface RolePermissionManagerProps {
  role: Papel;
  onSave: (permissionIds: string[]) => Promise<void>;
}

export const RolePermissionManager: React.FC<RolePermissionManagerProps> = ({ role, onSave }) => {
  const [activeTab, setActiveTab] = useState<string>(permissionsConfig[0].id);
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSelectedPermissions(new Set(role.permissoes || []));
  }, [role]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setSelectedPermissions(prev => {
      const newSet = new Set(prev);
      if (checked) newSet.add(permissionId);
      else newSet.delete(permissionId);
      return newSet;
    });
  };

  const handleSelectAllGroup = (groupItems: string[], select: boolean) => {
    setSelectedPermissions(prev => {
      const newSet = new Set(prev);
      groupItems.forEach(id => {
        if (select) newSet.add(id);
        else newSet.delete(id);
      });
      return newSet;
    });
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    await onSave(Array.from(selectedPermissions));
    setIsSaving(false);
  };

  const activeTabData = permissionsConfig.find(tab => tab.id === activeTab);

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="p-4 border-b border-white/20">
        <h3 className="text-xl font-bold text-gray-800">Permissões do Papel: {role.nome}</h3>
      </div>
      <div className="flex border-b border-white/20 px-4 overflow-x-auto">
        {permissionsConfig.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeTabData?.groups.map(group => (
            <PermissionGroupCard
              key={group.id}
              group={group}
              selectedPermissions={selectedPermissions}
              onPermissionChange={handlePermissionChange}
              onSelectAll={handleSelectAllGroup}
            />
          ))}
        </motion.div>
      </div>
      <div className="p-4 border-t border-white/20 flex justify-end">
        <GlassButton icon={Save} onClick={handleSaveClick} disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar Permissões'}
        </GlassButton>
      </div>
    </GlassCard>
  );
};
