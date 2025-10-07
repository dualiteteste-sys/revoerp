import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { KanbanBoard } from '../components/ordens-servico/KanbanBoard';
import { OrdemServicoForm } from '../components/ordens-servico/OrdemServicoForm';
import { useOrdemServicoService } from '../hooks/useOrdemServicoService';
import { GlassButton } from '../components/ui/GlassButton';
import { OrdemServico } from '../types';
import { OrdemServicoFormData } from '../schemas/ordemServicoSchema';

export const OrdensServico: React.FC = () => {
  const { ordensServico, setOrdensServico, loading, error, updateOrdemServico, createOrdemServico } = useOrdemServicoService();
  
  const [showForm, setShowForm] = useState(false);
  const [editingOS, setEditingOS] = useState<OrdemServico | undefined>();

  const handleSave = async (data: OrdemServicoFormData) => {
    try {
      if (editingOS) {
        await updateOrdemServico(editingOS.id, data);
      } else {
        await createOrdemServico(data);
      }
      setShowForm(false);
      setEditingOS(undefined);
    } catch (err) {
      console.error('Erro ao salvar Ordem de Serviço:', err);
    }
  };

  const renderContent = () => {
    if (loading && ordensServico.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <p className="text-gray-600 font-medium">Carregando dados...</p>
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
    
    if (ordensServico.length === 0 && !showForm) {
        return (
          <div className="text-center py-20 text-gray-500 space-y-4">
            <p>Nenhuma ordem de serviço encontrada.</p>
            <p>Clique em "Nova OS" para criar a primeira.</p>
          </div>
        );
      }

    return (
      <KanbanBoard 
        ordensServico={ordensServico} 
        setOrdensServico={setOrdensServico} 
        updateOrdemServico={updateOrdemServico} 
      />
    );
  };

  return (
    <div>
      <Header 
        title="Ordens de Serviço" 
        subtitle="Gerencie o fluxo de trabalho com o quadro Kanban"
      />
      
      <div className="flex justify-end mb-6">
        <GlassButton icon={Plus} onClick={() => { setEditingOS(undefined); setShowForm(true); }}>
          Nova OS
        </GlassButton>
      </div>

      {renderContent()}

      <AnimatePresence>
        {showForm && (
          <OrdemServicoForm
            os={editingOS}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditingOS(undefined); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
