// src/services/EmpresaService.ts
import { supabase } from '../lib/supabaseClient';

export type NovaEmpresaInput = {
  razao_social: string;
  fantasia?: string | null;
  cnpj?: string | null;
};

export async function criarEmpresaEAssociarDono(input: NovaEmpresaInput): Promise<string> {
  const { razao_social, fantasia = null, cnpj = null } = input;

  // Chama o RPC preparado para o CLIENTE (usa auth.uid())
  const { data, error } = await supabase.rpc('create_empresa_and_link_owner_client', {
    p_razao_social: razao_social,
    p_fantasia: fantasia,
    p_cnpj: cnpj,
  });

  if (error) {
    // Propaga erro para o caller (tela/form) tratar e mostrar toast
    throw error;
  }

  // O RPC retorna o ID (uuid) da empresa criada
  return data as string;
}
