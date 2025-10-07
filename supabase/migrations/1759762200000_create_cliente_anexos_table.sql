/*
  # Criação da Tabela de Anexos de Clientes
  [Este script cria a tabela 'cliente_anexos' para armazenar arquivos vinculados aos clientes, garantindo a separação de dados por empresa (multi-tenant).]

  ## Query Description: [Cria uma nova tabela e suas políticas de segurança. Não há risco de perda de dados, pois a tabela não existe.]
  
  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true
  
  ## Structure Details:
  - Table: public.cliente_anexos
  - Columns: id, cliente_id, empresa_id, nome_arquivo, path, tamanho, tipo, created_at, updated_at
  
  ## Security Implications:
  - RLS Status: Enabled
  - Policy Changes: Yes (criação de 4 policies para SELECT, INSERT, UPDATE, DELETE)
  - Auth Requirements: Usuário autenticado e membro da empresa.
  
  ## Performance Impact:
  - Indexes: Adiciona índices em `cliente_id` e `empresa_id`.
  - Triggers: Nenhum.
  - Estimated Impact: Baixo.
*/

-- 1. Cria a tabela 'cliente_anexos'
create table if not exists public.cliente_anexos (
    id uuid not null primary key default gen_random_uuid(),
    cliente_id uuid not null references public.clientes(id) on delete cascade,
    empresa_id uuid not null references public.empresas(id) on delete cascade,
    nome_arquivo text not null,
    path text not null,
    tamanho integer not null,
    tipo text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- 2. Adiciona comentários para clareza
comment on table public.cliente_anexos is 'Armazena anexos vinculados a um cliente.';
comment on column public.cliente_anexos.empresa_id is 'ID da empresa para isolamento de dados (multi-tenant).';

-- 3. Cria índices para otimização de consultas
create index if not exists idx_cliente_anexos_cliente_id on public.cliente_anexos(cliente_id);
create index if not exists idx_cliente_anexos_empresa_id on public.cliente_anexos(empresa_id);

-- 4. Ativa a Row Level Security (RLS)
alter table public.cliente_anexos enable row level security;

-- 5. Cria as políticas de RLS para garantir o isolamento dos dados
drop policy if exists "anexos select (membros)" on public.cliente_anexos;
create policy "anexos select (membros)"
on public.cliente_anexos for select to authenticated
using ( public.is_member(empresa_id) );

drop policy if exists "anexos insert (membros)" on public.cliente_anexos;
create policy "anexos insert (membros)"
on public.cliente_anexos for insert to authenticated
with check ( public.is_member(empresa_id) );

drop policy if exists "anexos update (membros)" on public.cliente_anexos;
create policy "anexos update (membros)"
on public.cliente_anexos for update to authenticated
using ( public.is_member(empresa_id) );

drop policy if exists "anexos delete (membros)" on public.cliente_anexos;
create policy "anexos delete (membros)"
on public.cliente_anexos for delete to authenticated
using ( public.is_member(empresa_id) );
