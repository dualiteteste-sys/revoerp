import { Cliente, Anexo } from '../types';
import { IClienteService } from './interfaces';
import { IClienteRepository } from '../repositories/interfaces';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class ClienteService implements IClienteService {
  public repository: IClienteRepository;

  constructor(repository: IClienteRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Cliente[]; count: number }> {
    return this.repository.findAll(options);
  }

  async getById(id: string): Promise<Cliente | null> {
    return this.repository.findById(id);
  }

  async search(query: string, type: 'cliente' | 'fornecedor'): Promise<Pick<Cliente, 'id' | 'nome'>[]> {
    return this.repository.search(query, type);
  }

  async create(data: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>): Promise<Cliente> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<Cliente>): Promise<Cliente> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async uploadAnexo(clienteId: string, file: File): Promise<Anexo> {
    const filePath = await this.repository.uploadAnexo(clienteId, file);
    
    // Após o upload, cria o registro no banco de dados
    const anexoData = {
      clienteId,
      nomeArquivo: file.name,
      path: filePath,
      tamanho: file.size,
      tipo: file.type,
    };
    const { data: newAnexo, error } = await this.repository.supabase
      .from('cliente_anexos')
      .insert(camelToSnake(anexoData))
      .select()
      .single();

    if (error) {
      // Se falhar, tenta remover o arquivo que já foi upado
      await this.repository.supabase.storage.from('cliente-anexos').remove([filePath]);
      throw new Error(error.message);
    }
    
    return snakeToCamel(newAnexo) as Anexo;
  }

  async deleteAnexo(anexoId: string, filePath: string): Promise<void> {
    return this.repository.deleteAnexo(anexoId, filePath);
  }

  getAnexoPublicUrl(filePath: string): string {
    const { data } = this.repository.supabase.storage
      .from('cliente-anexos')
      .getPublicUrl(filePath);
    return data.publicUrl;
  }
}
