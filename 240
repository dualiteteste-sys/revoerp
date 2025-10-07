import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { VendedorForm } from '../components/vendedores/VendedorForm';
import { Pagination } from '../components/ui/Pagination';
import { DataTable } from '../components/ui/DataTable';
import { useModalForm } from '../hooks/useModalForm';
import { Vendedor, SituacaoVendedor } from '../types';
import { useVendedores } from '../hooks/data/useVendedores';
import { VendedorFormData } from '../schemas/vendedorSchema';

export const Vendedores: React.FC = () => {
  const { 
    vendedores, 
    loading, 
    error, 
    createVendedor, 
    updateVendedor, 
    deleteVendedor,
    currentPage,
    totalPages,
    goToPage
  } = useVendedores();
  
  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<Vendedor>();
  const [isSaving, setIsSaving] = useState(false);
  const [filtro, setFiltro] = useState('');

  const vendedoresFiltrados = vendedores.filter(vendedor =>
    vendedor.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    (vendedor.email && vendedor.email.toLowerCase().includes(filtro.toLowerCase())) ||
    (vendedor.cpfCnpj && vendedor.cpfCnpj.includes(filtro))
  );

  const handleSave = async (vendedorData: VendedorFormData) => {
    setIsSaving(true);
    try {
      if (editingItem) {
        await updateVendedor(editingItem.id, vendedorData);
      } else {
        await createVendedor(vendedorData as Omit<Vendedor, 'id' | 'createdAt' | 'updatedAt'>);
      }
      handleCloseForm();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este vendedor?')) {
      await deleteVendedor(id);
    }
  };

  const getStatusBadge = (status: SituacaoVendedor) => {
    const colors = {
      [SituacaoVendedor.ATIVO_COM_ACESSO]: 'bg-green-100 text-green-700 border-green-200',
      [SituacaoVendedor.ATIVO_SEM_ACESSO]: 'bg-blue-100 text-blue-700 border-blue-200',
      [SituacaoVendedor.INATIVO]: 'bg-red-100 text-red-700 border-red-200'
    };
    return <span className={`glass-badge ${colors[status]}`}>{status}</span>;
  };

  const columns = useMemo(() => [
    { header: 'Nome', accessorKey: 'nome', cell: (item: Vendedor) => <p className="font-medium text-gray-800">{item.nome}</p> },
    { header: 'CPF/CNPJ', accessorKey: 'cpfCnpj' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Situação', accessorKey: 'situacao', cell: (item: Vendedor) => getStatusBadge(item.situacao), className: 'text-center' },
  ], []);

  return (
    <div>
      <Header title="Vendedores" subtitle="Gerencie sua equipe de vendas" />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Buscar por nome, email ou CPF/CNPJ..." value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-md" />
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Novo Vendedor</GlassButton>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={vendedoresFiltrados}
          columns={columns}
          loading={loading && vendedores.length === 0}
          error={error}
          entityName="Vendedor"
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
          <VendedorForm
            vendedor={editingItem}
            onSave={handleSave}
            onCancel={handleCloseForm}
            loading={isSaving}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
