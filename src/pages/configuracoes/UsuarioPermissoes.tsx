import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useService } from '../../hooks/useService';
import { Vendedor } from '../../types';
import { permissionsConfig, PermissionItem, PermissionTab } from '../../config/permissionsConfig';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { Header } from '../../components/layout/Header';

const PermissionCheckbox: React.FC<{
  id: string;
  label: string;
  helpText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ id, label, helpText, checked, onChange }) => (
  <div className="py-2">
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox mt-1"
      />
      <div>
        <span className="font-medium text-gray-800">{label}</span>
        <p className="text-xs text-gray-500">{helpText}</p>
      </div>
    </label>
  </div>
);

const PermissionGroup: React.FC<{
  label: string;
  items: PermissionItem[];
  selectedPermissions: Set<string>;
  onPermissionChange: (permissionId: string, checked: boolean) => void;
}> = ({ label, items, selectedPermissions, onPermissionChange }) => (
  <div className="bg-glass-50 p-4 rounded-xl border border-white/20">
    <h4 className="font-semibold text-gray-800 mb-2">{label}</h4>
    <div className="space-y-2">
      {items.map(item => (
        <PermissionCheckbox
          key={item.id}
          id={item.id}
          label={item.label}
          helpText={item.helpText}
          checked={selectedPermissions.has(item.id)}
          onChange={(checked) => onPermissionChange(item.id, checked)}
        />
      ))}
    </div>
  </div>
);

const UsuarioPermissoes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vendedorService = useService('vendedor');

  const [vendedor, setVendedor] = useState<Vendedor | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const vendedorData = await vendedorService.repository.findById(id);
      if (!vendedorData || !vendedorData.userId) {
        toast.error('Usuário não encontrado ou não vinculado a uma conta de acesso.');
        navigate('/configuracoes/usuarios');
        return;
      }
      setVendedor(vendedorData);

      const permissionsData = await vendedorService.getPermissions(vendedorData.userId);
      setSelectedPermissions(new Set(permissionsData));
    } catch (error) {
      toast.error('Falha ao carregar dados do usuário.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, vendedorService, navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setSelectedPermissions(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(permissionId);
      } else {
        newSet.delete(permissionId);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    if (!vendedor?.userId) return;
    setIsSaving(true);
    try {
      await vendedorService.setPermissions(vendedor.userId, Array.from(selectedPermissions));
      toast.success('Permissões salvas com sucesso!');
      navigate('/configuracoes/usuarios');
    } catch (error) {
      toast.error('Falha ao salvar permissões.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  if (!vendedor) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>Usuário não encontrado.</p>
      </div>
    );
  }

  return (
    <div>
      <Header title="Permissões do Usuário" subtitle={vendedor.nome} />
      
      <div className="space-y-8">
        {permissionsConfig.map((tab: PermissionTab) => (
          <GlassCard key={tab.id}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{tab.label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tab.groups.map(group => (
                <PermissionGroup
                  key={group.id}
                  label={group.label}
                  items={group.items}
                  selectedPermissions={selectedPermissions}
                  onPermissionChange={handlePermissionChange}
                />
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <GlassButton variant="secondary" icon={ArrowLeft} onClick={() => navigate('/configuracoes/usuarios')}>
          Voltar
        </GlassButton>
        <GlassButton icon={Save} onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar Permissões'}
        </GlassButton>
      </div>
    </div>
  );
};

export default UsuarioPermissoes;
