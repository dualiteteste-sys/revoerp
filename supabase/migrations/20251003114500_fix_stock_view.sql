/*
          # [VIEW] Recria a view `produtos_com_estoque`
          [Esta operação corrige a view para calcular o estoque atual corretamente a partir da tabela `estoque_movimentos`, em vez de depender de uma coluna inexistente.]

          ## Query Description: [Esta operação é segura. Ela apenas recria uma view (tabela virtual) de consulta, sem alterar ou apagar dados existentes nas tabelas base (`produtos` e `estoque_movimentos`).]
          
          ## Metadata:
          - Schema-Category: ["Structural"]
          - Impact-Level: ["Low"]
          - Requires-Backup: [false]
          - Reversible: [true]
          
          ## Structure Details:
          - View: `public.produtos_com_estoque` (recriada)
          
          ## Security Implications:
          - RLS Status: [N/A]
          - Policy Changes: [No]
          - Auth Requirements: [N/A]
          
          ## Performance Impact:
          - Indexes: [N/A]
          - Triggers: [N/A]
          - Estimated Impact: [Baixo. A consulta na view pode ser um pouco mais lenta em tabelas com milhões de movimentos por produto, mas é a forma correta de calcular o saldo.]
          */

DROP VIEW IF EXISTS public.produtos_com_estoque;

CREATE OR REPLACE VIEW public.produtos_com_estoque AS
SELECT
    p.id,
    p.empresa_id,
    p.nome,
    p.codigo,
    p.unidade,
    p.controlar_estoque,
    p.estoque_minimo,
    p.estoque_maximo,
    p.situacao,
    -- Correção: O estoque atual é a soma de todos os movimentos de estoque.
    COALESCE((
        SELECT SUM(CASE WHEN em.tipo = 'ENTRADA' THEN em.quantidade ELSE -em.quantidade END)
        FROM public.estoque_movimentos em
        WHERE em.produto_id = p.id
    ), 0) AS estoque_atual,
    (
        SELECT json_agg(json_build_object('path', pi.path))
        FROM public.produto_imagens pi
        WHERE pi.produto_id = p.id
    ) AS imagens
FROM
    public.produtos p;

-- Garante que usuários autenticados possam ler a view (as políticas de RLS das tabelas base serão aplicadas)
GRANT SELECT ON public.produtos_com_estoque TO authenticated;
