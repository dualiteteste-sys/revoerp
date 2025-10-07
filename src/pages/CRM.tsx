import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { KanbanBoard } from '../components/crm/KanbanBoard';
import { OportunidadeForm } from '../components/crm/OportunidadeForm';
import { useCrm } from '../hooks/data/useCrm';
import { GlassButton } from '../components/ui/GlassButton';
import { CrmOportunidade } from '../types';
import { useModalForm } from '../hooks/useModalForm';

export const CRM: React.FC = () => {
  const { oportunidades, loading, error, updateOportunidade, createOportunidade } = useCrm();
  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<CrmOportunidade>();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: Partial<CrmOportunidade>) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateOportunidade(editingItem.id, data);
      } else {
        await createOportunidade(data as any);
      }
      handleCloseForm();
    } catch (err) {
      console.error('Erro ao salvar Oportunidade:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderContent = () => {
    if (loading && oportunidades.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-600 font-medium">Carregando oportunidades...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20 text-red-500">
          <p className="font-semibold">Ocorreu um erro.</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      );
    }

    return (
      <KanbanBoard 
        oportunidades={oportunidades}
        updateOportunidade={updateOportunidade} 
        onEdit={handleOpenEditForm}
      />
    );
  };

  return (
    <div>
      <Header 
        title="CRM - Funil de Vendas" 
        subtitle="Gerencie suas oportunidades de negócio"
      />
      
      <div className="flex justify-end mb-6">
        <GlassButton icon={Plus} onClick={handleOpenCreateForm}>
          Nova Oportunidade
        </GlassButton>
      </div>

      {renderContent()}

      <AnimatePresence>
        {isFormOpen && (
          <OportunidadeForm
            oportunidade={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
