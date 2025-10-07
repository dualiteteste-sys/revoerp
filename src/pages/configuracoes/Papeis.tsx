import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePapeis } from '../../hooks/data/usePapeis';
import { useModalForm } from '../../hooks/useModalForm';
import { Papel } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { RoleList } from '../../components/settings/papeis/RoleList';
import { RolePermissionManager } from '../../components/settings/papeis/RolePermissionManager';
import { RoleForm } from '../../components/settings/papeis/RoleForm';
import { Loader2 } from 'lucide-react';

const Papeis: React.FC = () => {
  const { papeis, loading, createPapel, updatePapel, deletePapel, setPermissions } = usePapeis();
  const [selectedRole, setSelectedRole] = useState<Papel | null>(null);
  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<Papel>();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!selectedRole && papeis.length > 0) {
      setSelectedRole(papeis[0]);
    }
    if (selectedRole && !papeis.some(p => p.id === selectedRole.id)) {
      setSelectedRole(papeis[0] || null);
    }
  }, [papeis, selectedRole]);

  const handleSaveRole = async (data: Partial<Papel>) => {
    setIsSaving(true);
    if (editingItem) {
      await updatePapel(editingItem.id, data);
    } else {
      await createPapel(data);
    }
    setIsSaving(false);
    handleCloseForm();
  };

  const handleDeleteRole = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este papel?')) {
      await deletePapel(id);
    }
  };

  const handleSavePermissions = async (permissionIds: string[]) => {
    if (!selectedRole) return;
    await setPermissions(selectedRole.id, permissionIds);
  };

  if (loading && papeis.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <RoleList
            roles={papeis}
            selectedRole={selectedRole}
            onSelectRole={setSelectedRole}
            onNewRole={handleOpenCreateForm}
            onEditRole={handleOpenEditForm}
            onDeleteRole={handleDeleteRole}
          />
        </div>
        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          <AnimatePresence mode="wait">
            {selectedRole ? (
              <RolePermissionManager
                key={selectedRole.id}
                role={selectedRole}
                onSave={handleSavePermissions}
              />
            ) : (
              <GlassCard className="flex items-center justify-center h-full">
                <p className="text-gray-500">Selecione um papel para ver as permissões.</p>
              </GlassCard>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {isFormOpen && (
          <RoleForm
            role={editingItem}
            onSave={handleSaveRole}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Papeis;
