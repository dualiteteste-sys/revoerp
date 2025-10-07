import { BaseRepository } from './BaseRepository';
import { Contrato, ContratoAnexo } from '../types';
import { snakeToCamel, camelToSnake } from '../lib/utils';

export class ContratoRepository extends BaseRepository<Contrato> {
  constructor() {
    super('contratos');
  }

  protected createEntity(data: any): Contrato {
    return data as Contrato;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Contrato[]; count: number }> {
    const selectString = `id, descricao, valor, situacao, data_contrato, cliente:clientes ( id, nome )`;
    return super.findAll(options, selectString);
  }
  
  async findById(id: string): Promise<Contrato | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*, cliente:clientes ( id, nome )')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
        this.handleError('findById', error);
    }
    if (!data) return null;
    
    const contrato = snakeToCamel(data) as Contrato;

    const { data: anexosData, error: anexosError } = await this.supabase
        .from('contrato_anexos')
        .select('*')
        .eq('contrato_id', id);
    this.handleError('findById (anexos)', anexosError);
    contrato.anexos = snakeToCamel(anexosData || []) as ContratoAnexo[];

    return contrato;
  }

  async create(data: Partial<Omit<Contrato, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Contrato> {
    const { anexos, ...contratoData } = data;
    const newContrato = await super.create(contratoData as any);

    if (anexos && anexos.length > 0) {
      const anexosParaInserir = anexos.map(anexo => ({
        ...camelToSnake(anexo),
        contrato_id: newContrato.id,
      }));
      const { data: insertedAnexos, error: anexosError } = await this.supabase
        .from('contrato_anexos')
        .insert(anexosParaInserir)
        .select();
      this.handleError('create (anexos)', anexosError);
      newContrato.anexos = snakeToCamel(insertedAnexos || []) as ContratoAnexo[];
    }

    return newContrato;
  }

  async update(id: string, updates: Partial<Contrato>): Promise<Contrato> {
    const { anexos, ...contratoUpdates } = updates;
    const updatedContrato = await super.update(id, contratoUpdates);

    if (anexos) {
        const novosAnexos = anexos.filter(a => !a.id);
        if(novosAnexos.length > 0) {
            const anexosParaInserir = novosAnexos.map(anexo => ({
              ...camelToSnake(anexo),
              contrato_id: id,
            }));
            const { data: insertedAnexos, error: anexosError } = await this.supabase
              .from('contrato_anexos')
              .insert(anexosParaInserir)
              .select();
            this.handleError('update (anexos)', anexosError);
            updatedContrato.anexos = [...(updatedContrato.anexos || []), ...snakeToCamel(insertedAnexos || []) as ContratoAnexo[]];
        }
    }

    return updatedContrato;
  }

  async uploadAnexo(contratoId: string, file: File): Promise<string> {
    const filePath = `contratos/${contratoId}/${Date.now()}-${file.name}`;
    const { error } = await this.supabase.storage
      .from('anexos-gerais')
      .upload(filePath, file);

    if (error) {
      this.handleError('uploadAnexo', error);
      throw new Error(error.message);
    }
    return filePath;
  }

  async deleteAnexo(anexoId: string, filePath: string): Promise<void> {
    const { error: dbError } = await this.supabase
      .from('contrato_anexos')
      .delete()
      .eq('id', anexoId);
    this.handleError('deleteAnexo (db)', dbError);

    const { error: storageError } = await this.supabase.storage
      .from('anexos-gerais')
      .remove([filePath]);
    this.handleError('deleteAnexo (storage)', storageError);
  }
}
