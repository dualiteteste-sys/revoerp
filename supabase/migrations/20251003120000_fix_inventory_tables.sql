-- Migration to create the 'estoque_movimentos' table and the 'produtos_com_estoque' view.

/*
# [Structural] Create 'estoque_movimentos' table
This operation creates the 'estoque_movimentos' table, which is essential for tracking all inventory movements (entries and exits).

## Query Description:
- Creates a new table named `estoque_movimentos`.
- No existing data is affected as this is a new table.
- This table is fundamental for the inventory control module to function correctly.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (can be dropped)

## Structure Details:
- Table: `estoque_movimentos`
- Columns: `id`, `empresa_id`, `produto_id`, `tipo`, `quantidade`, `data`, `origem`, `observacao`, `created_at`, `updated_at`, `created_by`

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes (new policies for the table)
- Auth Requirements: Authenticated users who are members of the company.

## Performance Impact:
- Indexes: Added on `produto_id` and `empresa_id`.
- Triggers: None.
- Estimated Impact: Low, as it's a new table.
*/

-- 1. Create ENUM type for movement type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'tipo_movimento_estoque') THEN
        CREATE TYPE public.tipo_movimento_estoque AS ENUM ('ENTRADA', 'SAIDA');
    END IF;
END$$;


-- 2. Create 'estoque_movimentos' table
CREATE TABLE IF NOT EXISTS public.estoque_movimentos (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    empresa_id uuid NOT NULL,
    produto_id uuid NOT NULL,
    tipo public.tipo_movimento_estoque NOT NULL,
    quantidade numeric NOT NULL,
    data timestamp with time zone NOT NULL DEFAULT now(),
    origem text,
    observacao text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by uuid NOT NULL DEFAULT auth.uid(),
    CONSTRAINT estoque_movimentos_pkey PRIMARY KEY (id),
    CONSTRAINT estoque_movimentos_empresa_id_fkey FOREIGN KEY (empresa_id) REFERENCES public.empresas(id) ON DELETE CASCADE,
    CONSTRAINT estoque_movimentos_produto_id_fkey FOREIGN KEY (produto_id) REFERENCES public.produtos(id) ON DELETE CASCADE
);

-- 3. Add Indexes
CREATE INDEX IF NOT EXISTS idx_estoque_movimentos_produto_id ON public.estoque_movimentos(produto_id);
CREATE INDEX IF NOT EXISTS idx_estoque_movimentos_empresa_id ON public.estoque_movimentos(empresa_id);

-- 4. Add RLS Policies
ALTER TABLE public.estoque_movimentos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "estoque_movimentos select (membros)" ON public.estoque_movimentos;
CREATE POLICY "estoque_movimentos select (membros)"
ON public.estoque_movimentos FOR SELECT TO authenticated
USING ( public.is_member(empresa_id) );

DROP POLICY IF EXISTS "estoque_movimentos insert (membros)" ON public.estoque_movimentos;
CREATE POLICY "estoque_movimentos insert (membros)"
ON public.estoque_movimentos FOR INSERT TO authenticated
WITH CHECK ( public.is_member(empresa_id) );

DROP POLICY IF EXISTS "estoque_movimentos update (membros)" ON public.estoque_movimentos;
CREATE POLICY "estoque_movimentos update (membros)"
ON public.estoque_movimentos FOR UPDATE TO authenticated
USING ( public.is_member(empresa_id) )
WITH CHECK ( public.is_member(empresa_id) );

DROP POLICY IF EXISTS "estoque_movimentos delete (membros)" ON public.estoque_movimentos;
CREATE POLICY "estoque_movimentos delete (membros)"
ON public.estoque_movimentos FOR DELETE TO authenticated
USING ( public.is_member(empresa_id) );

/*
# [Structural] Create or Replace 'produtos_com_estoque' view
This operation creates or replaces the `produtos_com_estoque` view, which calculates the current stock for each product.

## Query Description:
- Creates a view that joins `produtos`, `estoque_movimentos`, and `produto_imagens`.
- It calculates `estoque_atual` by summing up all 'ENTRADA' and subtracting all 'SAIDA' movements for each product.
- It also aggregates product images into a JSON array for easy retrieval.
- This fixes the previous error where the view depended on a non-existent table.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (can be dropped)

## Structure Details:
- View: `produtos_com_estoque`
- Depends on: `produtos`, `estoque_movimentos`, `produto_imagens`

## Security Implications:
- RLS Status: RLS from the underlying tables (`produtos`, `estoque_movimentos`) will be enforced.
- Policy Changes: No
- Auth Requirements: Authenticated users.

## Performance Impact:
- Indexes: None (it's a view).
- Triggers: None.
- Estimated Impact: Low. Queries on this view will depend on the performance of the underlying tables.
*/

-- 5. Create or replace the view
CREATE OR REPLACE VIEW public.produtos_com_estoque AS
SELECT
    p.id,
    p.empresa_id,
    p.nome,
    p.codigo,
    p.controlar_estoque,
    p.estoque_minimo,
    p.estoque_maximo,
    p.unidade,
    p.situacao,
    COALESCE(em.estoque_atual, 0) AS estoque_atual,
    pi.imagens
FROM
    public.produtos p
LEFT JOIN (
    SELECT
        em_sub.produto_id,
        SUM(CASE WHEN em_sub.tipo = 'ENTRADA' THEN em_sub.quantidade ELSE -em_sub.quantidade END) AS estoque_atual
    FROM
        public.estoque_movimentos em_sub
    GROUP BY
        em_sub.produto_id
) em ON p.id = em.produto_id
LEFT JOIN (
    SELECT
        pi_sub.produto_id,
        json_agg(json_build_object('id', pi_sub.id, 'path', pi_sub.path)) AS imagens
    FROM
        public.produto_imagens pi_sub
    GROUP BY
        pi_sub.produto_id
) pi ON p.id = pi.produto_id;
