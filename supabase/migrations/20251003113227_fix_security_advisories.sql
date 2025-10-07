/*
# Correção de Segurança Crítica: View com SECURITY DEFINER
Corrige uma vulnerabilidade crítica na view `produtos_com_estoque`.

## Query Description:
Esta operação altera a propriedade de segurança da view `produtos_com_estoque` de `SECURITY DEFINER` para `SECURITY INVOKER`.
Isso garante que as políticas de segurança de nível de linha (RLS) do usuário que realiza a consulta sejam sempre aplicadas, prevenindo o acesso a dados de outras empresas.
Não há risco de perda de dados. Esta é uma alteração de metadados de segurança essencial para a integridade do sistema multi-tenant.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- View: `public.produtos_com_estoque`

## Security Implications:
- RLS Status: A correção garante que o RLS seja aplicado corretamente.
- Policy Changes: No
- Auth Requirements: Acesso de administrador para alterar a view.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Nenhum impacto negativo na performance.
*/
ALTER VIEW public.produtos_com_estoque SET (security_invoker = true);

/*
# Correção de Segurança: Search Path em Funções
Define explicitamente o `search_path` para funções críticas para mitigar riscos de sequestro de caminho de busca (path hijacking).

## Query Description:
Esta operação define o `search_path` para `public` em várias funções do banco de dados.
Isso impede que um usuário mal-intencionado crie um esquema com funções falsas que possam ser executadas no lugar das funções legítimas, especialmente dentro de contextos de `SECURITY DEFINER`.
Não há risco de perda de dados.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Medium"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Function: `public.get_dashboard_stats`
- Function: `public.get_faturamento_ultimos_12_meses`
- Function: `public.delete_empresa_if_member`
- Function: `public.create_empresa_and_link_owner_client`

## Security Implications:
- RLS Status: Melhora a robustez geral da segurança.
- Policy Changes: No
- Auth Requirements: Acesso de administrador para alterar funções.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Nenhum.
*/
ALTER FUNCTION public.get_dashboard_stats(p_empresa_id uuid) SET search_path = public;
ALTER FUNCTION public.get_faturamento_ultimos_12_meses(p_empresa_id uuid) SET search_path = public;
ALTER FUNCTION public.delete_empresa_if_member(p_empresa_id uuid) SET search_path = public;
ALTER FUNCTION public.create_empresa_and_link_owner_client(p_razao_social text, p_fantasia text, p_cnpj text) SET search_path = public;
