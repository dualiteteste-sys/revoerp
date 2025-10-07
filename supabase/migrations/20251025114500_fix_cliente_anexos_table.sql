/*
  # [Fix] Adiciona `empresa_id` e RLS à tabela `cliente_anexos`
  [Este script corrige a estrutura da tabela de anexos de clientes para alinhá-la com a arquitetura multi-tenant, garantindo o isolamento de dados.]

  ## Query Description: [Esta operação adiciona a coluna `empresa_id` à tabela `cliente_anexos`, a preenche com base nos dados existentes e aplica as políticas de segurança (RLS) necessárias. A operação é segura e não deve causar perda de dados, mas um backup é sempre recomendado antes de aplicar migrações.]
  
  ## Metadata:
  - Schema-Category: ["Structural"]
  - Impact-Level: ["Medium"]
  - Requires-Backup: [true]
  - Reversible: [true]
  
  ## Structure Details:
  - Tabela afetada: `public.cliente_anexos`
  - Colunas adicionadas: `empresa_id` (uuid, not null)
  - Constraints adicionados: Foreign Key para `public.empresas`
  - Políticas de RLS: Adicionadas políticas de SELECT, INSERT, UPDATE, DELETE baseadas na função `is_member`.
  
  ## Security Implications:
  - RLS Status: [Enabled]
  - Policy Changes: [Yes]
  - Auth Requirements: [Usuário autenticado e membro da empresa]
  
  ## Performance Impact:
  - Indexes: [Adicionado índice em `empresa_id`]
  - Triggers: [Nenhum]
  - Estimated Impact: [Baixo. A operação de `UPDATE` pode ser lenta em tabelas muito grandes, mas é executada apenas uma vez.]
*/

-- 1. Adicionar a coluna `empresa_id` se ela não existir.
alter table public.cliente_anexos
add column if not exists empresa_id uuid;

-- 2. Criar um índice na nova coluna para otimizar as consultas.
create index if not exists idx_cliente_anexos_empresa_id on public.cliente_anexos(empresa_id);

-- 3. Preencher a coluna `empresa_id` para os anexos existentes, buscando o `empresa_id` do cliente associado.
update public.cliente_anexos ca
set empresa_id = c.empresa_id
from public.clientes c
where ca.cliente_id = c.id
  and ca.empresa_id is null;

-- 4. Tornar a coluna `empresa_id` obrigatória (NOT NULL) após o preenchimento.
--    Este passo é crucial para garantir a integridade dos dados futuros.
alter table public.cliente_anexos
alter column empresa_id set not null;

-- 5. Adicionar a restrição de chave estrangeira de forma idempotente (DROP IF EXISTS + ADD).
alter table public.cliente_anexos
drop constraint if exists cliente_anexos_empresa_id_fkey;

alter table public.cliente_anexos
add constraint cliente_anexos_empresa_id_fkey
foreign key (empresa_id) references public.empresas(id) on delete cascade;

-- 6. Habilitar a segurança em nível de linha (RLS) na tabela.
alter table public.cliente_anexos enable row level security;

-- 7. Criar as políticas de RLS para garantir que os usuários só possam acessar os anexos de sua própria empresa.
-- SELECT
drop policy if exists "cliente_anexos select (membros)" on public.cliente_anexos;
create policy "cliente_anexos select (membros)"
on public.cliente_anexos for select
to authenticated
using ( public.is_member(empresa_id) );

-- INSERT
drop policy if exists "cliente_anexos insert (membros)" on public.cliente_anexos;
create policy "cliente_anexos insert (membros)"
on public.cliente_anexos for insert
to authenticated
with check ( public.is_member(empresa_id) );

-- UPDATE
drop policy if exists "cliente_anexos update (membros)" on public.cliente_anexos;
create policy "cliente_anexos update (membros)"
on public.cliente_anexos for update
to authenticated
using ( public.is_member(empresa_id) )
with check ( public.is_member(empresa_id) );

-- DELETE
drop policy if exists "cliente_anexos delete (membros)" on public.cliente_anexos;
create policy "cliente_anexos delete (membros)"
on public.cliente_anexos for delete
to authenticated
using ( public.is_member(empresa_id) );
