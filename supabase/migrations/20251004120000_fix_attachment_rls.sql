/*
  # [Fix] RLS Policies for Attachments
  [This migration fixes an error where set-returning functions were used in RLS policies. It introduces stable helper functions to check for membership before creating the correct policies for attachment tables and storage buckets.]

  ## Query Description: [This operation creates helper functions and replaces Row Level Security (RLS) policies on attachment-related tables and storage buckets. This is a critical security fix to prevent data leaks between tenants. No data will be lost.]
  
  ## Metadata:
  - Schema-Category: ["Structural", "Security"]
  - Impact-Level: ["Medium"]
  - Requires-Backup: [false]
  - Reversible: [true]
  
  ## Structure Details:
  - Functions Created: is_conta_pagar_member, is_conta_receber_member, is_contrato_member
  - Tables Affected: contas_pagar_anexos, contas_receber_anexos, contrato_anexos
  - Storage Buckets Affected: anexos-financeiro, anexos-gerais
  
  ## Security Implications:
  - RLS Status: [Enabled]
  - Policy Changes: [Yes]
  - Auth Requirements: [Authenticated user]
  
  ## Performance Impact:
  - Indexes: [No change]
  - Triggers: [No change]
  - Estimated Impact: [Low. The new functions are stable and should be performant.]
*/

-- Helper function for contas_pagar
create or replace function public.is_conta_pagar_member(p_conta_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_empresa_id uuid;
begin
  select empresa_id into v_empresa_id from public.contas_pagar where id = p_conta_id;
  if v_empresa_id is null then
    return false;
  end if;
  return public.is_member(v_empresa_id);
end;
$$;
grant execute on function public.is_conta_pagar_member(uuid) to authenticated;

-- Helper function for contas_receber
create or replace function public.is_conta_receber_member(p_conta_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_empresa_id uuid;
begin
  select empresa_id into v_empresa_id from public.contas_receber where id = p_conta_id;
  if v_empresa_id is null then
    return false;
  end if;
  return public.is_member(v_empresa_id);
end;
$$;
grant execute on function public.is_conta_receber_member(uuid) to authenticated;

-- Helper function for contratos
create or replace function public.is_contrato_member(p_contrato_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  v_empresa_id uuid;
begin
  select empresa_id into v_empresa_id from public.contratos where id = p_contrato_id;
  if v_empresa_id is null then
    return false;
  end if;
  return public.is_member(v_empresa_id);
end;
$$;
grant execute on function public.is_contrato_member(uuid) to authenticated;


-- Create tables with IF NOT EXISTS
create table if not exists public.contas_pagar_anexos (
  id uuid primary key default gen_random_uuid(),
  conta_pagar_id uuid not null references public.contas_pagar(id) on delete cascade,
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  nome_arquivo text not null,
  path text not null,
  tamanho integer not null,
  tipo text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_contas_pagar_anexos_conta_id on public.contas_pagar_anexos(conta_pagar_id);
create index if not exists idx_contas_pagar_anexos_empresa_id on public.contas_pagar_anexos(empresa_id);

create table if not exists public.contas_receber_anexos (
  id uuid primary key default gen_random_uuid(),
  conta_receber_id uuid not null references public.contas_receber(id) on delete cascade,
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  nome_arquivo text not null,
  path text not null,
  tamanho integer not null,
  tipo text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_contas_receber_anexos_conta_id on public.contas_receber_anexos(conta_receber_id);
create index if not exists idx_contas_receber_anexos_empresa_id on public.contas_receber_anexos(empresa_id);

create table if not exists public.contrato_anexos (
  id uuid primary key default gen_random_uuid(),
  contrato_id uuid not null references public.contratos(id) on delete cascade,
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  nome_arquivo text not null,
  path text not null,
  tamanho integer not null,
  tipo text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_contrato_anexos_contrato_id on public.contrato_anexos(contrato_id);
create index if not exists idx_contrato_anexos_empresa_id on public.contrato_anexos(empresa_id);


-- Apply triggers to new tables
do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'contas_pagar_anexos_audit_trg') then
    create trigger contas_pagar_anexos_audit_trg before insert or update on public.contas_pagar_anexos for each row execute function public.set_audit_cols();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'contas_receber_anexos_audit_trg') then
    create trigger contas_receber_anexos_audit_trg before insert or update on public.contas_receber_anexos for each row execute function public.set_audit_cols();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'contrato_anexos_audit_trg') then
    create trigger contrato_anexos_audit_trg before insert or update on public.contrato_anexos for each row execute function public.set_audit_cols();
  end if;
end;
$$;


-- Enable RLS and drop old policies if they exist
alter table public.contas_pagar_anexos enable row level security;
drop policy if exists "contas_pagar_anexos_policy" on public.contas_pagar_anexos;
drop policy if exists "contas_pagar_anexos_access_policy" on public.contas_pagar_anexos;

alter table public.contas_receber_anexos enable row level security;
drop policy if exists "contas_receber_anexos_policy" on public.contas_receber_anexos;
drop policy if exists "contas_receber_anexos_access_policy" on public.contas_receber_anexos;

alter table public.contrato_anexos enable row level security;
drop policy if exists "contrato_anexos_policy" on public.contrato_anexos;
drop policy if exists "contrato_anexos_access_policy" on public.contrato_anexos;


-- Create correct RLS policies using helper functions
create policy "contas_pagar_anexos_access_policy" on public.contas_pagar_anexos for all to authenticated
using ( public.is_member(empresa_id) ) with check ( public.is_member(empresa_id) );

create policy "contas_receber_anexos_access_policy" on public.contas_receber_anexos for all to authenticated
using ( public.is_member(empresa_id) ) with check ( public.is_member(empresa_id) );

create policy "contrato_anexos_access_policy" on public.contrato_anexos for all to authenticated
using ( public.is_member(empresa_id) ) with check ( public.is_member(empresa_id) );


-- Create storage buckets if they don't exist
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values 
  ('anexos-financeiro', 'anexos-financeiro', false, 2097152, null),
  ('anexos-gerais', 'anexos-gerais', false, 2097152, null)
on conflict (id) do nothing;


-- Drop old storage policies
drop policy if exists "anexos_financeiro_access_policy" on storage.objects;
drop policy if exists "anexos_gerais_access_policy" on storage.objects;
drop policy if exists "anexos_financeiro_insert" on storage.objects;
drop policy if exists "anexos_financeiro_select" on storage.objects;
drop policy if exists "anexos_financeiro_update" on storage.objects;
drop policy if exists "anexos_financeiro_delete" on storage.objects;
drop policy if exists "anexos_gerais_insert" on storage.objects;
drop policy if exists "anexos_gerais_select" on storage.objects;
drop policy if exists "anexos_gerais_update" on storage.objects;
drop policy if exists "anexos_gerais_delete" on storage.objects;


-- Create correct storage policies
-- Bucket: anexos-financeiro
create policy "anexos_financeiro_select" on storage.objects for select to authenticated using (
  bucket_id = 'anexos-financeiro' and (
    (name like 'contas-a-pagar/%' and public.is_conta_pagar_member((regexp_matches(name, '^contas-a-pagar/([^/]+)/'))[1]::uuid)) or
    (name like 'contas-a-receber/%' and public.is_conta_receber_member((regexp_matches(name, '^contas-a-receber/([^/]+)/'))[1]::uuid))
  )
);
create policy "anexos_financeiro_insert" on storage.objects for insert to authenticated with check (
  bucket_id = 'anexos-financeiro' and (
    (name like 'contas-a-pagar/%' and public.is_conta_pagar_member((regexp_matches(name, '^contas-a-pagar/([^/]+)/'))[1]::uuid)) or
    (name like 'contas-a-receber/%' and public.is_conta_receber_member((regexp_matches(name, '^contas-a-receber/([^/]+)/'))[1]::uuid))
  )
);
create policy "anexos_financeiro_update" on storage.objects for update to authenticated using (
  bucket_id = 'anexos-financeiro' and (
    (name like 'contas-a-pagar/%' and public.is_conta_pagar_member((regexp_matches(name, '^contas-a-pagar/([^/]+)/'))[1]::uuid)) or
    (name like 'contas-a-receber/%' and public.is_conta_receber_member((regexp_matches(name, '^contas-a-receber/([^/]+)/'))[1]::uuid))
  )
);
create policy "anexos_financeiro_delete" on storage.objects for delete to authenticated using (
  bucket_id = 'anexos-financeiro' and (
    (name like 'contas-a-pagar/%' and public.is_conta_pagar_member((regexp_matches(name, '^contas-a-pagar/([^/]+)/'))[1]::uuid)) or
    (name like 'contas-a-receber/%' and public.is_conta_receber_member((regexp_matches(name, '^contas-a-receber/([^/]+)/'))[1]::uuid))
  )
);

-- Bucket: anexos-gerais
create policy "anexos_gerais_select" on storage.objects for select to authenticated using (
  bucket_id = 'anexos-gerais' and (
    (name like 'contratos/%' and public.is_contrato_member((regexp_matches(name, '^contratos/([^/]+)/'))[1]::uuid))
  )
);
create policy "anexos_gerais_insert" on storage.objects for insert to authenticated with check (
  bucket_id = 'anexos-gerais' and (
    (name like 'contratos/%' and public.is_contrato_member((regexp_matches(name, '^contratos/([^/]+)/'))[1]::uuid))
  )
);
create policy "anexos_gerais_update" on storage.objects for update to authenticated using (
  bucket_id = 'anexos-gerais' and (
    (name like 'contratos/%' and public.is_contrato_member((regexp_matches(name, '^contratos/([^/]+)/'))[1]::uuid))
  )
);
create policy "anexos_gerais_delete" on storage.objects for delete to authenticated using (
  bucket_id = 'anexos-gerais' and (
    (name like 'contratos/%' and public.is_contrato_member((regexp_matches(name, '^contratos/([^/]+)/'))[1]::uuid))
  )
);
