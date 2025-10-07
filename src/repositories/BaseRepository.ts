import { IRepository, IEntity } from '../types';
import { supabase } from '../lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import { snakeToCamel, camelToSnake } from '../lib/utils';

type RepoErrorPayload = { code?: string; message: string; hint?: string | null; details?: string | null; };

export class RepositoryError extends Error {
  code?: string;
  details?: string | null;
  hint?: string | null;

  constructor(err: RepoErrorPayload) {
    super(err.message);
    this.name = 'RepositoryError';
    this.code = err.code;
    this.details = err.details;
    this.hint = err.hint;
  }
}

export abstract class BaseRepository<T extends IEntity> implements IRepository<T> {
  protected supabase = supabase;
  protected tableName: string;
  constructor(tableName: string) {
    this.tableName = tableName;
  }
  
  protected handleError(ctx: string, err: any): never {
    const code = err?.code ?? err?.error?.code;
    const message = err?.message ?? err?.error?.message ?? String(err);

    if (code === '42501' || /permission denied/i.test(message)) {
      throw new RepositoryError({
        code: '42501',
        message: `RLS bloqueou a operação em ${ctx}. Verifique políticas e/ou SELECT pós-insert.`,
        details: err?.details ?? null,
        hint: err?.hint ?? null,
      });
    }

    throw new RepositoryError({
      code,
      message: `[${ctx}] ${message}`,
      details: err?.details ?? null,
      hint: err?.hint ?? null,
    });
  }

  async findAll(
    options: { page?: number; pageSize?: number } = {},
    select: string = '*'
  ): Promise<{ data: T[]; count: number }> {
    const { page = 1, pageSize = 10 } = options;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, error, count } = await this.supabase
      .from(this.tableName)
      .select(select, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);
    if (error) this.handleError(`findAll with select: ${select}`, error);
    return {
      data: (snakeToCamel(data || []) as T[]),
      count: count || 0,
    };
  }
  async findById(id: string): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') {
      this.handleError('findById', error);
    }
    return snakeToCamel(data) as T | null;
  }
  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const entityToInsert = camelToSnake(entity);
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(entityToInsert)
      .select()
      .single();
    if (error) this.handleError('create', error);
    if (!data) throw new Error('Falha ao criar, nenhum dado retornado.');
    return snakeToCamel(data) as T;
  }
  async update(id: string, updates: Partial<T>): Promise<T> {
    const { id: entityId, createdAt, updatedAt, ...restOfUpdates } = updates;
    const updatesToApply = camelToSnake({ ...restOfUpdates, updated_at: new Date() });
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(updatesToApply)
      .eq('id', id)
      .select()
      .single();
    if (error) this.handleError('update', error);
    if (!data) throw new Error('Falha ao atualizar, nenhum dado retornado.');
    return snakeToCamel(data) as T;
  }
  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    if (error) this.handleError('delete', error);
  }
  protected abstract createEntity(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T;
}
