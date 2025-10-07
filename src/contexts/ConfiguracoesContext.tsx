// src/contexts/ConfiguracoesContext.tsx
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import toast from 'react-hot-toast';

import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import { Empresa } from '../types/empresa';

type Ctx = {
  empresas: Empresa[];
  loading: boolean;
  error: string | null;
  loadEmpresas: () => Promise<void>;
  saveEmpresa: (data: Partial<Empresa>, logoFile?: File | null) => Promise<void>;
  deleteEmpresa: (id: string) => Promise<void>;
};

const ConfiguracoesContext = createContext<Ctx | undefined>(undefined);

// ---------- Helpers: DB <-> App mapping ----------
function dbToEmpresa(row: any): Empresa {
  return {
    id: row.id,
    razaoSocial: row.razao_social,
    fantasia: row.fantasia ?? '',
    cnpj: row.cnpj ?? '',
    email: row.email ?? '',
    logoUrl: row.logo_url ?? '',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  } as Empresa;
}

function empresaToDb(input: Partial<Empresa>) {
  return {
    razao_social: input.razaoSocial ?? null,
    fantasia: input.fantasia ?? null,
    cnpj: input.cnpj ?? null,
    email: input.email ?? null,
  } as Record<string, any>;
}

// ---------- Upload opcional da logo ----------
async function uploadLogoIfNeeded(empresaId: string, file?: File | null): Promise<string | null> {
  if (!file) return null;
  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const path = `${empresaId}/logo.${ext}`;

  const { error: upErr } = await supabase.storage
    .from('logos')
    .upload(path, file, { upsert: true, cacheControl: '3600' });
  if (upErr) throw upErr;

  const { data } = supabase.storage.from('logos').getPublicUrl(path);
  return data?.publicUrl ?? null;
}

export const ConfiguracoesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { session } = useAuth() as any;
  const userId: string | undefined = session?.user?.id;

  // ---------- Carregar empresas ----------
  const loadEmpresas = useCallback(async () => {
    if (!userId) {
      setEmpresas([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const { data, error: selErr } = await supabase
        .from('empresas')
        .select('*')
        .order('created_at', { ascending: false });
      if (selErr) throw selErr;
      setEmpresas((data ?? []).map(dbToEmpresa));
    } catch (err: any) {
      const msg = err?.message || 'Erro ao carregar dados das empresas';
      console.error(msg);
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // ---------- Criar / Atualizar ----------
  const saveEmpresa = async (data: Partial<Empresa>, logoFile?: File | null) => {
    if (!userId) {
      toast.error('Você precisa estar logado para salvar.');
      return;
    }

    // CREATE
    if (!data.id) {
      const p = (async () => {
        const payload = empresaToDb(data);
        const { data: newId, error: rpcErr } = await supabase.rpc(
          'create_empresa_and_link_owner_client',
          {
            p_razao_social: payload.razao_social,
            p_fantasia: payload.fantasia,
            p_cnpj: payload.cnpj,
          }
        );
        if (rpcErr) throw rpcErr;
        const empresaId = newId as string;

        if (logoFile) {
          const publicUrl = await uploadLogoIfNeeded(empresaId, logoFile);
          if (publicUrl) {
            const { error: updErr } = await supabase
              .from('empresas')
              .update({ logo_url: publicUrl })
              .eq('id', empresaId);
            if (updErr) throw updErr;
          }
        }

        await loadEmpresas();
      })();

      await toast.promise(p, {
        loading: 'Criando empresa...',
        success: 'Empresa criada com sucesso!',
        error: (e) => e?.message || 'Falha ao criar a empresa',
      });
      return;
    }

    // UPDATE
    const p = (async () => {
      const empresaId = data.id!;
      const updates = empresaToDb(data);
      Object.keys(updates).forEach((k) => updates[k] === undefined && delete updates[k]);

      const { error: updErr } = await supabase.from('empresas').update(updates).eq('id', empresaId);
      if (updErr) throw updErr;

      if (logoFile) {
        const publicUrl = await uploadLogoIfNeeded(empresaId, logoFile);
        if (publicUrl) {
          const { error: updLogoErr } = await supabase
            .from('empresas')
            .update({ logo_url: publicUrl })
            .eq('id', empresaId);
          if (updLogoErr) throw updLogoErr;
        }
      }

      await loadEmpresas();
    })();

    await toast.promise(p, {
      loading: 'Salvando dados da empresa...',
      success: 'Dados da empresa salvos com sucesso!',
      error: (e) => e?.message || 'Falha ao salvar',
    });
  };

  // ---------- Excluir (via RPC SECURITY DEFINER) ----------
  const deleteEmpresa = async (id: string) => {
    const p = (async () => {
      console.log('[DEBUG] deleteEmpresa(): chamando RPC delete_empresa_if_member', { id });

      // ÚNICA chamada válida: RPC. (Não usar DELETE direto em /rest/v1/empresas)
      const { data, error, status } = await supabase.rpc('delete_empresa_if_member', {
        p_empresa_id: id,
      });

      console.log('[DEBUG] RPC respondeu', { status, data, error });
      if (error) throw error;

      await loadEmpresas();
    })();

    await toast.promise(p, {
      loading: 'Excluindo empresa...',
      success: 'Empresa excluída com sucesso!',
      error: (e) => e?.message || 'Falha ao excluir',
    });
  };

  useEffect(() => {
    if (userId) {
      loadEmpresas();
    } else {
      setLoading(false);
      setEmpresas([]);
    }
  }, [userId, loadEmpresas]);

  const value: Ctx = {
    empresas,
    loading,
    error,
    loadEmpresas,
    saveEmpresa,
    deleteEmpresa,
  };

  return (
    <ConfiguracoesContext.Provider value={value}>
      {children}
    </ConfiguracoesContext.Provider>
  );
};

export const useConfiguracoes = () => {
  const ctx = useContext(ConfiguracoesContext);
  if (!ctx) {
    throw new Error('useConfiguracoes must be used within a ConfiguracoesProvider');
  }
  return ctx;
};
