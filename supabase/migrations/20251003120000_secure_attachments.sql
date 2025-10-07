/*
  # [Structural] Criação de Tabelas e Políticas para Anexos Seguros

  ## Query Description: [Esta operação cria as tabelas de anexos para os módulos de Contas a Pagar, Contas a Receber e Contratos, aplicando políticas de segurança (RLS) para garantir o isolamento de dados entre empresas. Também cria e protege os buckets de armazenamento de arquivos correspondentes.]

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true

  ## Structure Details:
  - Tabelas Criadas: public.contas_pagar_anexos, public.contas_receber_anexos, public.contrato_anexos
  - Buckets Criados: anexos-financeiro, anexos-gerais

  ## Security Implications:
  - RLS Status: Enabled
  - Policy Changes: Yes (novas policies para tabelas e buckets)
  - Auth Requirements: Usuário autenticado e membro da empresa.

  ## Performance Impact:
  - Indexes: Added
  - Triggers: None
  - Estimated Impact: Baixo.
*/

-- Tabela de Anexos para Contas a Pagar
create table if not exists public.contas_pagar_anexos (
  id uuid primary key default gen_random_uuid(),
  conta_pagar_id uuid not null, -- Chave estrangeira para 'contas_pagar' a ser adicionada quando a tabela existir.
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  nome_arquivo text not null,
  path text not null,
  tamanho int not null,
  tipo text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_contas_pagar_anexos_conta_id on public.contas_pagar_anexos(conta_pagar_id);
create index if not exists idx_contas_pagar_anexos_empresa_id on public.contas_pagar_anexos(empresa_id);

alter table public.contas_pagar_anexos enable row level security;
drop policy if exists "contas_pagar_anexos select (membros)" on public.contas_pagar_anexos;
create policy "contas_pagar_anexos select (membros)" on public.contas_pagar_anexos for select to authenticated using ( public.is_member(empresa_id) );
drop policy if exists "contas_pagar_anexos insert (membros)" on public.contas_pagar_anexos;
create policy "contas_pagar_anexos insert (membros)" on public.contas_pagar_anexos for insert to authenticated with check ( public.is_member(empresa_id) );
drop policy if exists "contas_pagar_anexos update (membros)" on public.contas_pagar_anexos;
create policy "contas_pagar_anexos update (membros)" on public.contas_pagar_anexos for update to authenticated using ( public.is_member(empresa_id) ) with check ( public.is_member(empresa_id) );
drop policy if exists "contas_pagar_anexos delete (membros)" on public.contas_pagar_anexos;
create policy "contas_pagar_anexos delete (membros)" on public.contas_pagar_anexos for delete to authenticated using ( public.is_member(empresa_id) );

-- Tabela de Anexos para Contas a Receber
create table if not exists public.contas_receber_anexos (
  id uuid primary key default gen_random_uuid(),
  conta_receber_id uuid not null, -- Chave estrangeira para 'contas_receber' a ser adicionada quando a tabela existir.
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  nome_arquivo text not null,
  path text not null,
  tamanho int not null,
  tipo text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_contas_receber_anexos_conta_id on public.contas_receber_anexos(conta_receber_id);
create index if not exists idx_contas_receber_anexos_empresa_id on public.contas_receber_anexos(empresa_id);

alter table public.contas_receber_anexos enable row level security;
drop policy if exists "contas_receber_anexos select (membros)" on public.contas_receber_anexos;
create policy "contas_receber_anexos select (membros)" on public.contas_receber_anexos for select to authenticated using ( public.is_member(empresa_id) );
drop policy if exists "contas_receber_anexos insert (membros)" on public.contas_receber_anexos;
create policy "contas_receber_anexos insert (membros)" on public.contas_receber_anexos for insert to authenticated with check ( public.is_member(empresa_id) );
drop policy if exists "contas_receber_anexos update (membros)" on public.contas_receber_anexos;
create policy "contas_receber_anexos update (membros)" on public.contas_receber_anexos for update to authenticated using ( public.is_member(empresa_id) ) with check ( public.is_member(empresa_id) );
drop policy if exists "contas_receber_anexos delete (membros)" on public.contas_receber_anexos;
create policy "contas_receber_anexos delete (membros)" on public.contas_receber_anexos for delete to authenticated using ( public.is_member(empresa_id) );

-- Tabela de Anexos para Contratos
create table if not exists public.contrato_anexos (
  id uuid primary key default gen_random_uuid(),
  contrato_id uuid not null, -- Chave estrangeira para 'contratos' a ser adicionada quando a tabela existir.
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  nome_arquivo text not null,
  path text not null,
  tamanho int not null,
  tipo text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_contrato_anexos_contrato_id on public.contrato_anexos(contrato_id);
create index if not exists idx_contrato_anexos_empresa_id on public.contrato_anexos(empresa_id);

alter table public.contrato_anexos enable row level security;
drop policy if exists "contrato_anexos select (membros)" on public.contrato_anexos;
create policy "contrato_anexos select (membros)" on public.contrato_anexos for select to authenticated using ( public.is_member(empresa_id) );
drop policy if exists "contrato_anexos insert (membros)" on public.contrato_anexos;
create policy "contrato_anexos insert (membros)" on public.contrato_anexos for insert to authenticated with check ( public.is_member(empresa_id) );
drop policy if exists "contrato_anexos update (membros)" on public.contrato_anexos;
create policy "contrato_anexos update (membros)" on public.contrato_anexos for update to authenticated using ( public.is_member(empresa_id) ) with check ( public.is_member(empresa_id) );
drop policy if exists "contrato_anexos delete (membros)" on public.contrato_anexos;
create policy "contrato_anexos delete (membros)" on public.contrato_anexos for delete to authenticated using ( public.is_member(empresa_id) );

-- Buckets de Armazenamento e Políticas
insert into storage.buckets (id, name, public)
values ('anexos-financeiro', 'anexos-financeiro', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('anexos-gerais', 'anexos-gerais', false)
on conflict (id) do nothing;

-- Policies para anexos-financeiro
drop policy if exists "anexos_financeiro_select_member" on storage.objects;
create policy "anexos_financeiro_select_member" on storage.objects for select to authenticated using ( bucket_id = 'anexos-financeiro' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );
drop policy if exists "anexos_financeiro_insert_member" on storage.objects;
create policy "anexos_financeiro_insert_member" on storage.objects for insert to authenticated with check ( bucket_id = 'anexos-financeiro' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );
drop policy if exists "anexos_financeiro_update_member" on storage.objects;
create policy "anexos_financeiro_update_member" on storage.objects for update to authenticated using ( bucket_id = 'anexos-financeiro' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );
drop policy if exists "anexos_financeiro_delete_member" on storage.objects;
create policy "anexos_financeiro_delete_member" on storage.objects for delete to authenticated using ( bucket_id = 'anexos-financeiro' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );

-- Policies para anexos-gerais
drop policy if exists "anexos_gerais_select_member" on storage.objects;
create policy "anexos_gerais_select_member" on storage.objects for select to authenticated using ( bucket_id = 'anexos-gerais' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );
drop policy if exists "anexos_gerais_insert_member" on storage.objects;
create policy "anexos_gerais_insert_member" on storage.objects for insert to authenticated with check ( bucket_id = 'anexos-gerais' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );
drop policy if exists "anexos_gerais_update_member" on storage.objects;
create policy "anexos_gerais_update_member" on storage.objects for update to authenticated using ( bucket_id = 'anexos-gerais' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );
drop policy if exists "anexos_gerais_delete_member" on storage.objects;
create policy "anexos_gerais_delete_member" on storage.objects for delete to authenticated using ( bucket_id = 'anexos-gerais' and public.is_member( (regexp_matches(name, '^([^/]+)/'))[1]::uuid ) );
