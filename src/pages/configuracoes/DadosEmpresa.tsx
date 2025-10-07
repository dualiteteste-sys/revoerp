import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { GlassInput } from '../../components/ui/GlassInput';
import { DataTable } from '../../components/ui/DataTable';
import { useModalForm } from '../../hooks/useModalForm';
import { Empresa } from '../../types';
import { EmpresaForm } from '../../components/settings/dados-empresa/EmpresaForm';
import { useConfiguracoes } from '../../contexts/ConfiguracoesContext';

export const DadosEmpresa: React.FC = () => {
  const { 
    empresas, 
    loading, 
    error, 
    saveEmpresa, 
    deleteEmpresa,
  } = useConfiguracoes();

  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<Empresa>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const empresasFiltradas = empresas.filter(empresa =>
    empresa.razaoSocial.toLowerCase().includes(filtro.toLowerCase()) ||
    (empresa.fantasia && empresa.fantasia.toLowerCase().includes(filtro.toLowerCase())) ||
    (empresa.cnpj && empresa.cnpj.includes(filtro))
  );

  const handleSave = async (empresaData: Partial<Empresa>, logoFile?: File | null) => {
    setIsSaving(true);
    try {
      await saveEmpresa(empresaData, logoFile);
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa? Esta ação é irreversível.')) {
      await deleteEmpresa(id);
    }
  };

  const columns = useMemo(() => [
    { header: 'Razão Social', accessorKey: 'razaoSocial', cell: (item: Empresa) => <p className="font-medium text-gray-800">{item.razaoSocial}</p> },
    { header: 'Fantasia', accessorKey: 'fantasia' },
    { header: 'CNPJ', accessorKey: 'cnpj' },
    { header: 'E-mail', accessorKey: 'email' },
  ], []);

  return (
    <>
      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por nome ou CNPJ..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Nova Empresa</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={empresasFiltradas}
          columns={columns}
          loading={loading && empresas.length === 0}
          error={error}
          entityName="Empresa"
          actions={(item) => (
            <div className="flex items-center gap-2">
              <GlassButton icon={Edit2} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
              <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => handleDelete(item.id)} />
            </div>
          )}
        />
        {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} /> */}
      </GlassCard>

      <AnimatePresence>
        {isFormOpen && (
          <EmpresaForm
            empresa={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DadosEmpresa;
