import { IConfiguracoesService } from './interfaces';
import { ConfiguracoesRepository } from '../repositories/ConfiguracoesRepository';
import { Empresa } from '../types/empresa';

export class ConfiguracoesService implements IConfiguracoesService {
  public repository: ConfiguracoesRepository;

  constructor(repository: ConfiguracoesRepository) {
    this.repository = repository;
  }

  async getEmpresaData(): Promise<Empresa | null> {
    return this.repository.findFirst();
  }

  async getAll(options?: { page?: number; pageSize?: number }): Promise<{ data: Empresa[]; count: number }> {
    return this.repository.findAll(options);
  }

  async findById(id: string): Promise<Empresa | null> {
    return this.repository.findById(id);
  }

  async create(data: Partial<Empresa>, userId: string): Promise<Empresa> {
    return this.repository.create(data, userId);
  }

  async update(id: string, data: Partial<Empresa>): Promise<Empresa> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async saveEmpresaData(data: Partial<Empresa>, logoFile?: File | null, userId?: string): Promise<Empresa> {
    let logoUrl = data.logoUrl;
    if (logoFile) {
      logoUrl = await this.repository.uploadLogo(logoFile);
    }
    
    const dataToSave = { ...data, logoUrl };
    
    if (data.id) {
      return this.repository.update(data.id, dataToSave);
    } else {
      if (!userId) throw new Error("userId é obrigatório para criar uma nova empresa.");
      return this.repository.create(dataToSave, userId);
    }
  }
}
