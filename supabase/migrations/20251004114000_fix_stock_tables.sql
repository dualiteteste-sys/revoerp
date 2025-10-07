/*
# [Operation Name]
Create ENUM for Stock Movement Type

## Query Description: [This operation creates a new data type `tipo_movimento_estoque` to ensure that stock movements are strictly categorized as either 'ENTRADA' (entry) or 'SAIDA' (exit). This improves data integrity by preventing invalid movement types.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Type: `tipo_movimento_estoque`

## Security Implications:
- RLS Status: [Not Applicable]
- Policy Changes: [No]
- Auth Requirements: [None]

## Performance Impact:
- Indexes: [Not Applicable]
- Triggers: [Not Applicable]
- Estimated Impact: [None]
*/
create type public.tipo_movimento_estoque as enum ('ENTRADA', 'SAIDA');


/*
# [Operation Name]
Create Stock Movements Table

## Query Description: [This operation creates the `estoque_movimentos` table to track all stock entries and exits for products. It includes an `empresa_id` for multi-tenancy and is essential for accurate stock control.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Medium"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Table: `estoque_movimentos`
- Columns: `id`, `empresa_id`, `produto_id`, `tipo`, `quantidade`, `data`, `origem`, `observacao`, `created_at`, `updated_at`

## Security Implications:
- RLS Status: [Will be enabled in a subsequent step]
- Policy Changes: [No]
- Auth Requirements: [None]

## Performance Impact:
- Indexes: [Will be added for `empresa_id` and `produto_id`]
- Triggers: [Not Applicable]
- Estimated Impact: [Low, as the table is initially empty.]
*/
create table public.estoque_movimentos (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid not null references public.empresas(id) on delete cascade,
  produto_id uuid not null references public.produtos(id) on delete cascade,
  tipo public.tipo_movimento_estoque not null,
  quantidade numeric not null check (quantidade > 0),
  data timestamptz not null default now(),
  origem text,
  observacao text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_estoque_movimentos_empresa_id on public.estoque_movimentos(empresa_id);
create index if not exists idx_estoque_movimentos_produto_id on public.estoque_movimentos(produto_id);


/*
# [Operation Name]
Add Audit Trigger to Stock Movements Table

## Query Description: [This operation attaches an audit trigger to the `estoque_movimentos` table. The trigger will automatically manage the `created_at` and `updated_at` timestamps for every new or updated record, ensuring data consistency.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Table: `estoque_movimentos`
- Trigger: `estoque_movimentos_audit_trg`

## Security Implications:
- RLS Status: [Not Applicable]
- Policy Changes: [No]
- Auth Requirements: [None]

## Performance Impact:
- Indexes: [Not Applicable]
- Triggers: [Added]
- Estimated Impact: [Negligible performance impact on insert/update operations.]
*/
create trigger estoque_movimentos_audit_trg
before insert or update on public.estoque_movimentos
for each row execute function public.set_audit_cols();


/*
# [Operation Name]
Enable RLS for Stock Movements Table

## Query Description: [This operation enables Row-Level Security (RLS) on the `estoque_movimentos` table and applies standard multi-tenant policies. This ensures that users can only view or manage stock movements belonging to their own company, preventing unauthorized data access.]

## Metadata:
- Schema-Category: ["Security"]
- Impact-Level: ["High"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Table: `estoque_movimentos`
- Policies: `select (membros)`, `insert (membros)`, `update (membros)`, `delete (membros)`

## Security Implications:
- RLS Status: [Enabled]
- Policy Changes: [Yes]
- Auth Requirements: [Authenticated users linked to a company]

## Performance Impact:
- Indexes: [Not Applicable]
- Triggers: [Not Applicable]
- Estimated Impact: [Minor overhead on queries to check `is_member` function, but essential for security.]
*/
alter table public.estoque_movimentos enable row level security;

drop policy if exists "estoque_movimentos select (membros)" on public.estoque_movimentos;
create policy "estoque_movimentos select (membros)"
on public.estoque_movimentos for select to authenticated
using ( public.is_member(empresa_id) );

drop policy if exists "estoque_movimentos insert (membros)" on public.estoque_movimentos;
create policy "estoque_movimentos insert (membros)"
on public.estoque_movimentos for insert to authenticated
with check ( public.is_member(empresa_id) );

drop policy if exists "estoque_movimentos update (membros)" on public.estoque_movimentos;
create policy "estoque_movimentos update (membros)"
on public.estoque_movimentos for update to authenticated
using ( public.is_member(empresa_id) )
with check ( public.is_member(empresa_id) );

drop policy if exists "estoque_movimentos delete (membros)" on public.estoque_movimentos;
create policy "estoque_movimentos delete (membros)"
on public.estoque_movimentos for delete to authenticated
using ( public.is_member(empresa_id) );


/*
# [Operation Name]
Recreate Product Stock View

## Query Description: [This operation creates (or replaces) the `produtos_com_estoque` view. This view calculates the current stock level for each product by summing all 'ENTRADA' movements and subtracting all 'SAIDA' movements from the `estoque_movimentos` table. This provides an always-up-to-date stock count.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Medium"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- View: `produtos_com_estoque`

## Security Implications:
- RLS Status: [View will inherit RLS from underlying tables (`produtos`)]
- Policy Changes: [No]
- Auth Requirements: [Authenticated users]

## Performance Impact:
- Indexes: [Not Applicable]
- Triggers: [Not Applicable]
- Estimated Impact: [Queries on this view will be slightly slower than querying a table directly, as it performs calculations on the fly. The impact is generally acceptable for most use cases.]
*/
drop view if exists public.produtos_com_estoque;

create or replace view public.produtos_com_estoque as
select
  p.id,
  p.empresa_id,
  p.nome,
  p.codigo,
  p.controlar_estoque,
  p.estoque_minimo,
  p.estoque_maximo,
  p.unidade,
  p.situacao,
  coalesce(
    (
      select sum(
        case
          when em.tipo = 'ENTRADA' then em.quantidade
          else -em.quantidade
        end
      )
      from public.estoque_movimentos em
      where em.produto_id = p.id
    ),
    p.estoque_inicial,
    0
  ) as estoque_atual,
  (
    select json_agg(pi.*)
    from public.produto_imagens pi
    where pi.produto_id = p.id
  ) as imagens
from
  public.produtos p;
