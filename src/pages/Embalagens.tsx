import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { EmbalagemForm } from '../components/embalagens/EmbalagemForm';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useModalForm } from '../hooks/useModalForm';
import { Embalagem, TipoEmbalagem } from '../types';
import { useEmbalagens } from '../hooks/data/useEmbalagens';

export const Embalagens: React.FC = () => {
  const { 
    embalagens, 
    loading, 
    error, 
    createEmbalagem, 
    updateEmbalagem, 
    deleteEmbalagem,
    currentPage,
    totalPages,
    goToPage
  } = useEmbalagens();

  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<Embalagem>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');

  const embalagensFiltradas = embalagens.filter(embalagem =>
    embalagem.descricao.toLowerCase().includes(filtro.toLowerCase()) &&
    (filtroTipo === '' || embalagem.tipo === filtroTipo)
  );

  const handleSave = async (embalagemData: Omit<Embalagem, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateEmbalagem(editingItem.id, embalagemData);
      } else {
        await createEmbalagem(embalagemData);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta embalagem?')) {
      await deleteEmbalagem(id);
    }
  };

  const formatDimensoes = (embalagem: Embalagem) => {
    const { tipo, larguraCm, alturaCm, comprimentoCm, diametroCm } = embalagem;
    const format = (n?: number) => (n ?? 0).toFixed(1).replace('.', ',');
    switch (tipo) {
      case TipoEmbalagem.ENVELOPE: return `${format(larguraCm)}cm x ${format(comprimentoCm)}cm`;
      case TipoEmbalagem.CAIXA: return `${format(larguraCm)}cm x ${format(alturaCm)}cm x ${format(comprimentoCm)}cm`;
      case TipoEmbalagem.CILINDRO: return `${format(comprimentoCm)}cm x ${format(diametroCm)}cm`;
      default: return 'N/A';
    }
  };

  const columns = useMemo(() => [
    { header: 'Descrição', accessorKey: 'descricao', cell: (item: Embalagem) => <p className="font-medium text-gray-800">{item.descricao}</p> },
    { header: 'Tipo', accessorKey: 'tipo' },
    { header: 'Dimensões', accessorKey: 'id', cell: formatDimensoes },
    { header: 'Peso', accessorKey: 'pesoKg', cell: (item: Embalagem) => `${(item.pesoKg ?? 0).toFixed(3).replace('.', ',')} Kg` },
  ], []);

  return (
    <div>
      <Header title="Embalagens" subtitle="Gerencie seu catálogo de embalagens" />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por descrição..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-sm" />
            <select className="glass-input w-48" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="">Todos os Tipos</option>
              {Object.values(TipoEmbalagem).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Embalagem</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={embalagensFiltradas}
          columns={columns}
          loading={loading && embalagens.length === 0}
          error={error}
          entityName="Embalagem"
          actions={(item) => (
            <div className="flex items-center gap-2">
              <GlassButton icon={Edit2} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
              <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => handleDelete(item.id)} />
            </div>
          )}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </GlassCard>

      <AnimatePresence>
        {isFormOpen && (
          <EmbalagemForm
            embalagem={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
