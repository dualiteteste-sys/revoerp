/*
  # [Correção] Políticas de RLS para papel_permissoes
  Adiciona as políticas de INSERT, UPDATE e DELETE que estão faltando na tabela `papel_permissoes`.
  ## Query Description:
  - O erro "RLS bloqueou a operação" ocorre porque a tabela `papel_permissoes` só tinha uma política para SELECT. Esta migração adiciona as políticas para INSERT, UPDATE e DELETE, permitindo que usuários autenticados gerenciem as permissões dos papéis.
  - A operação é segura e não afeta dados existentes.
  ## Metadata:
  - Schema-Category: "Security"
  - Impact-Level: "Low"
  - Requires-Backup: false
  - Reversible: true (DROP POLICY)
*/

-- Permite que usuários autenticados insiram permissões para um papel.
DROP POLICY IF EXISTS "papel_permissoes - insert autenticados" ON public.papel_permissoes;
CREATE POLICY "papel_permissoes - insert autenticados"
ON public.papel_permissoes FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permite que usuários autenticados atualizem permissões de um papel.
DROP POLICY IF EXISTS "papel_permissoes - update autenticados" ON public.papel_permissoes;
CREATE POLICY "papel_permissoes - update autenticados"
ON public.papel_permissoes FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Permite que usuários autenticados removam permissões de um papel.
DROP POLICY IF EXISTS "papel_permissoes - delete autenticados" ON public.papel_permissoes;
CREATE POLICY "papel_permissoes - delete autenticados"
ON public.papel_permissoes FOR DELETE
TO authenticated
USING (true);
