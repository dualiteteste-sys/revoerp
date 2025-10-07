/*
# [Create View] `produtos_com_estoque`
This view calculates the current stock for each product and aggregates their images.

## Query Description:
This operation creates a new database view named `produtos_com_estoque`. It does not modify or delete any existing data. The view provides a real-time calculation of the current stock level for each product by summing up all 'ENTRADA' (entry) movements and subtracting all 'SAIDA' (exit) movements from the `estoque_movimentos` table. It also aggregates associated product images from the `produto_imagens` table into a JSON array. This view is essential for the inventory control module to function correctly.

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: false
- Reversible: true (The view can be dropped without data loss)

## Structure Details:
- View: `public.produtos_com_estoque`
- Source Tables: `public.produtos`, `public.estoque_movimentos`, `public.produto_imagens`
- Columns: `id`, `empresa_id`, `nome`, `codigo`, `controlar_estoque`, `estoque_minimo`, `estoque_maximo`, `unidade`, `situacao`, `estoque_atual` (calculated), `imagens` (aggregated JSON)

## Security Implications:
- RLS Status: RLS from the underlying `produtos` table will be applied to this view. We will define a specific RLS policy for this view to ensure multi-tenancy is respected.
- Policy Changes: Yes, new policies will be added for this view.
- Auth Requirements: Access is governed by RLS policies.

## Performance Impact:
- Indexes: The view's performance depends on indexes on `estoque_movimentos(produto_id)` and `produto_imagens(produto_id)`. These should be created if they don't exist.
- Triggers: No triggers are added.
- Estimated Impact: Low to Medium. Queries on this view might be slightly slower than on a simple table, especially with a large number of stock movements or images. Proper indexing is key.
*/

-- Create the view
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
    (
        SELECT json_agg(json_build_object('id', pi.id, 'path', pi.path, 'nome_arquivo', pi.nome_arquivo, 'tamanho', pi.tamanho, 'tipo', pi.tipo))
        FROM produto_imagens pi
        WHERE pi.produto_id = p.id
    ) AS imagens
FROM
    produtos p
LEFT JOIN (
    SELECT
        produto_id,
        SUM(CASE WHEN tipo = 'ENTRADA' THEN quantidade ELSE -quantidade END) AS estoque_atual
    FROM
        estoque_movimentos
    GROUP BY
        produto_id
) em ON p.id = em.produto_id;


-- RLS Policies for the new view
ALTER VIEW public.produtos_com_estoque ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "produtos_com_estoque select (membros)" ON public.produtos_com_estoque;
CREATE POLICY "produtos_com_estoque select (membros)"
ON public.produtos_com_estoque FOR SELECT
TO authenticated
USING ( public.is_member(empresa_id) );
