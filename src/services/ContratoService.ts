import { Contrato, ContratoAnexo } from '../types';
import { IContratoService } from './interfaces';
import { IContratoRepository } from '../repositories/interfaces';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class ContratoService implements IContratoService {
  public repository: IContratoRepository;

  constructor(repository: IContratoRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Contrato[]; count: number }> {
    return this.repository.findAll(options);
  }

  async create(data: Omit<Contrato, 'id' | 'createdAt' | 'updatedAt' | 'anexos'>): Promise<Contrato> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<Contrato>): Promise<Contrato> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async uploadAnexo(contratoId: string, file: File): Promise<ContratoAnexo> {
    const filePath = await this.repository.uploadAnexo(contratoId, file);
    
    const anexoData = {
      contratoId,
      nomeArquivo: file.name,
      path: filePath,
      tamanho: file.size,
      tipo: file.type,
    };
    const { data: newAnexo, error } = await this.repository.supabase
      .from('contrato_anexos')
      .insert(camelToSnake(anexoData))
      .select()
      .single();

    if (error) {
      await this.repository.supabase.storage.from('anexos-gerais').remove([filePath]);
      throw new Error(error.message);
    }
    
    return snakeToCamel(newAnexo) as ContratoAnexo;
  }

  async deleteAnexo(anexoId: string, filePath: string): Promise<void> {
    return this.repository.deleteAnexo(anexoId, filePath);
  }

  getAnexoPublicUrl(filePath: string): string {
    const { data } = this.repository.supabase.storage
      .from('anexos-gerais')
      .getPublicUrl(filePath);
    return data.publicUrl;
  }
}
