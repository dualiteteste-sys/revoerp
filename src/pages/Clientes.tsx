import React, { useState, useMemo } from 'react';
		import { AnimatePresence } from 'framer-motion';
		import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
		import { Header } from '../components/layout/Header';
		import { GlassCard } from '../components/ui/GlassCard';
		import { GlassButton } from '../components/ui/GlassButton';
		import { GlassInput } from '../components/ui/GlassInput';
		import { ClienteForm } from '../components/clientes/ClienteForm';
		import { Pagination } from '../components/ui/Pagination';
		import { DataTable } from '../components/ui/DataTable';
		import { useModalForm } from '../hooks/useModalForm';
		import { Cliente } from '../types';
		import { useClientes } from '../hooks/data/useClientes';
		import { useProfile } from '../contexts/ProfileContext';
		import toast from 'react-hot-toast';

		export const Clientes: React.FC = () => {
		  const { 
		    clientes, 
		    loading, 
		    error, 
		    createCliente, 
		    updateCliente, 
		    deleteCliente,
		    currentPage,
		    totalPages,
		    goToPage
		  } = useClientes();
		  const { profile, hasPermission } = useProfile();

		  const { isFormOpen, editingItem, handleOpenCreateForm, handleOpenEditForm, handleCloseForm } = useModalForm<Cliente>();
		  const [isSaving, setIsSaving] = useState(false);
		  const [filtro, setFiltro] = useState('');

		  const clientesFiltrados = clientes.filter(cliente =>
		    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
		    (cliente.email && cliente.email.toLowerCase().includes(filtro.toLowerCase())) ||
		    (cliente.cpfCnpj && cliente.cpfCnpj.includes(filtro))
		  );

		  const handleSave = async (clienteData: Partial<Cliente>) => {
		    if (!profile?.empresaId) {
		      toast.error("Nenhuma empresa selecionada. Não é possível salvar.");
		      return;
		    }

		    setIsSaving(true);
		    try {
		      const dataToSave = { ...clienteData, empresaId: profile.empresaId };

		      if (editingItem) {
		        await updateCliente(editingItem.id, dataToSave);
		      } else {
		        await createCliente(dataToSave as Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>);
		      }
		      handleCloseForm();
		    } finally {
		      setIsSaving(false);
		    }
		  };

		  const handleDelete = async (id: string) => {
		    if (window.confirm('Tem certeza que deseja excluir este registro? A ação não pode ser desfeita.')) {
		      await deleteCliente(id);
		    }
		  };
		  
		  const columns = useMemo(() => [
		    { header: 'Nome / Razão Social', accessorKey: 'nome', cell: (item: Cliente) => (
		      <>
		        <p className="font-medium text-gray-800">{item.nome}</p>
		        {item.nomeFantasia && <p className="text-sm text-gray-600">{item.nomeFantasia}</p>}
		      </>
		    )},
		    { header: 'CPF / CNPJ', accessorKey: 'cpfCnpj' },
		    { header: 'Email', accessorKey: 'email' },
		    { header: 'Telefone', accessorKey: 'celular', cell: (item: Cliente) => item.celular || item.telefoneAdicional },
		  ], []);

		  return (
		    <div>
		      <Header 
		        title="Clientes e Fornecedores" 
		        subtitle="Gerencie seus contatos, clientes, fornecedores e transportadoras"
		      />

		      <GlassCard className="mb-6">
		        <div className="flex flex-wrap items-center justify-between gap-4">
		          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
		            <GlassInput
		              placeholder="Buscar por nome, email ou documento..."
		              value={filtro}
		              onChange={(e) => setFiltro(e.target.value)}
		              className="w-full max-w-md"
		            />
		            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
		          </div>
		          {hasPermission('clientes.escrever') && (
		            <GlassButton icon={Plus} onClick={handleOpenCreateForm}>Novo Cadastro</GlassButton>
		          )}
		        </div>
		      </GlassCard>

		      <GlassCard>
		        <DataTable
		          data={clientesFiltrados}
		          columns={columns}
		          loading={loading && clientes.length === 0}
		          error={error}
		          entityName="Cliente"
		          actions={(item) => (
		            <div className="flex items-center gap-2">
		              {hasPermission('clientes.escrever') && (
		                <GlassButton icon={Edit2} variant="secondary" size="sm" onClick={() => handleOpenEditForm(item)} />
		              )}
		              {hasPermission('clientes.excluir') && (
		                <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => handleDelete(item.id)} />
		              )}
		            </div>
		          )}
		        />
		        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
		      </GlassCard>

		      <AnimatePresence>
		        {isFormOpen && (
		          <ClienteForm
		            cliente={editingItem}
		            onSave={handleSave}
		            onCancel={handleCloseForm}
		            loading={isSaving}
		          />
		        )}
		      </AnimatePresence>
		    </div>
		  );
		};
