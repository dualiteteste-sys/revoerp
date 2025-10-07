/*
          # Operation Name
          Align Client Attachments with Multi-Tenant RLS

          ## Query Description: 
          This migration aligns the `cliente_anexos` table with the project's multi-tenant architecture. It adds an `empresa_id` column to ensure that attachments are strictly associated with an organization, preventing any potential cross-tenant data access. It then backfills this column for existing records and enables Row Level Security (RLS) with standard policies. This change is crucial for data isolation and security. A backup is recommended before applying.
          
          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Medium"
          - Requires-Backup: true
          - Reversible: true
          
          ## Structure Details:
          - Table `cliente_anexos`:
            - Adds column `empresa_id` (uuid, not null).
            - Adds foreign key constraint to `empresas`.
            - Adds index on `empresa_id`.
            - Enables Row Level Security.
            - Adds RLS policies for SELECT, INSERT, UPDATE, DELETE.
          
          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes
          - Auth Requirements: User must be a member of the company (`is_member`).
          
          ## Performance Impact:
          - Indexes: Added `idx_cliente_anexos_empresa_id`.
          - Triggers: None
          - Estimated Impact: Low. The backfill query may take a moment on very large tables, but the new index will optimize future queries.
          */

-- Step 1: Add the empresa_id column, allowing null temporarily for backfilling.
alter table public.cliente_anexos add column if not exists empresa_id uuid;

-- Step 2: Backfill the empresa_id for existing attachments from the related client.
update public.cliente_anexos ca
set empresa_id = c.empresa_id
from public.clientes c
where ca.cliente_id = c.id and ca.empresa_id is null;

-- Step 3: Now that data is backfilled, enforce the NOT NULL constraint.
alter table public.cliente_anexos alter column empresa_id set not null;

-- Step 4: Add foreign key constraint to ensure data integrity.
-- This assumes the constraint does not already exist.
alter table public.cliente_anexos 
  add constraint if not exists cliente_anexos_empresa_id_fkey 
  foreign key (empresa_id) 
  references public.empresas(id) 
  on delete cascade;

-- Step 5: Add an index for performance.
create index if not exists idx_cliente_anexos_empresa_id on public.cliente_anexos(empresa_id);

-- Step 6: Enable Row Level Security and apply standard policies.
alter table public.cliente_anexos enable row level security;

drop policy if exists "cliente_anexos select (membros)" on public.cliente_anexos;
create policy "cliente_anexos select (membros)"
on public.cliente_anexos for select to authenticated
using ( public.is_member(empresa_id) );

drop policy if exists "cliente_anexos insert (membros)" on public.cliente_anexos;
create policy "cliente_anexos insert (membros)"
on public.cliente_anexos for insert to authenticated
with check ( public.is_member(empresa_id) );

drop policy if exists "cliente_anexos update (membros)" on public.cliente_anexos;
create policy "cliente_anexos update (membros)"
on public.cliente_anexos for update to authenticated
using ( public.is_member(empresa_id) )
with check ( public.is_member(empresa_id) );

drop policy if exists "cliente_anexos delete (membros)" on public.cliente_anexos;
create policy "cliente_anexos delete (membros)"
on public.cliente_anexos for delete to authenticated
using ( public.is_member(empresa_id) );
