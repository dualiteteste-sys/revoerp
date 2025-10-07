import { BaseRepository } from './BaseRepository';
import { Empresa } from '../types/empresa';
import { camelToSnake, snakeToCamel } from '../lib/utils';
import { IConfiguracoesRepository } from './interfaces';

export class ConfiguracoesRepository extends BaseRepository<Empresa> implements IConfiguracoesRepository {
  constructor() {
    super('empresas');
  }

  protected createEntity(data: any): Empresa {
    return data as Empresa;
  }

  async findFirst(): Promise<Empresa | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`*, substitutosTributarios:empresa_substitutos_tributarios(*)`)
      .limit(1)
      .maybeSingle();

    if (error) this.handleError('findFirst', error);
    return snakeToCamel(data) as Empresa | null;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Empresa[]; count: number }> {
    return super.findAll(options);
  }

  async findById(id: string): Promise<Empresa | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select(`*, substitutosTributarios:empresa_substitutos_tributarios(*)`)
      .eq('id', id)
      .single();
    if (error && error.code !== 'PGRST116') this.handleError('findById', error);
    return snakeToCamel(data) as Empresa | null;
  }

  async create(data: Partial<Empresa>, userId: string): Promise<Empresa> {
    try {
      const { substitutosTributarios, ...mainData } = data;
      const id = crypto.randomUUID();

      const payload = {
        ...camelToSnake(mainData),
        id,
        created_by: userId, // CRÍTICO: Adiciona o created_by para a política de RLS
      };
      
      // IMPORTANTE: Não encadeia .select() para usar 'return=minimal' por padrão
      const { error } = await this.supabase.from(this.tableName).insert(payload);
      if (error) throw error;
      
      const newEmpresa = { ...data, id, created_by: userId } as Empresa;

      if (substitutosTributarios && substitutosTributarios.length > 0) {
        await this.updateSubstitutos(id, substitutosTributarios);
      }

      return newEmpresa;
    } catch (err) {
      this.handleError('empresas repository (create)', err);
    }
  }

  async update(id: string, data: Partial<Empresa>): Promise<Empresa> {
    const { substitutosTributarios, ...mainData } = data;
    await super.update(id, mainData);
    return this.updateSubstitutos(id, substitutosTributarios || []);
  }

  private async updateSubstitutos(empresaId: string, substitutos: any[]): Promise<Empresa> {
    const { error: deleteError } = await this.supabase.from('empresa_substitutos_tributarios').delete().eq('empresa_id', empresaId);
    if (deleteError) this.handleError('updateSubstitutos (delete)', deleteError);

    if (substitutos && substitutos.length > 0) {
      const paraInserir = substitutos.filter(st => st.uf && st.ie).map(st => ({ empresa_id: empresaId, uf: st.uf, ie: st.ie }));
      if (paraInserir.length > 0) {
        const { error: insertError } = await this.supabase.from('empresa_substitutos_tributarios').insert(paraInserir);
        if (insertError) this.handleError('updateSubstitutos (insert)', insertError);
      }
    }
    return (await this.findById(empresaId))!;
  }

  async uploadLogo(file: File): Promise<string> {
    const filePath = `public/${Date.now()}-${file.name}`;
    const { error } = await this.supabase.storage.from('logos').upload(filePath, file, { cacheControl: '3600', upsert: true });
    if (error) this.handleError('uploadLogo', error);
    const { data } = this.supabase.storage.from('logos').getPublicUrl(filePath);
    return data.publicUrl;
  }
}
