import { Produto, ProdutoImagem } from '../types';
import { IProdutoService } from './interfaces';
import { IProdutoRepository } from '../repositories/interfaces';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class ProdutoService implements IProdutoService {
  public repository: IProdutoRepository;

  constructor(repository: IProdutoRepository) {
    this.repository = repository;
  }

  async getAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Produto[]; count: number }> {
    return this.repository.findAll(options);
  }

  async search(query: string): Promise<Pick<Produto, 'id' | 'nome' | 'precoVenda' | 'codigo' | 'unidade'>[]> {
    return this.repository.search(query);
  }

  async create(data: Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>): Promise<Produto> {
    return this.repository.create(data);
  }

  async update(id: string, data: Partial<Produto>): Promise<Produto> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async uploadImagem(produtoId: string, file: File): Promise<ProdutoImagem> {
    const filePath = await this.repository.uploadImagem(produtoId, file);
    
    const imagemData = {
      produtoId,
      nomeArquivo: file.name,
      path: filePath,
      tamanho: file.size,
      tipo: file.type,
    };
    const { data: newImagem, error } = await this.repository.supabase
      .from('produto_imagens')
      .insert(camelToSnake(imagemData))
      .select()
      .single();

    if (error) {
      await this.repository.supabase.storage.from('produto-imagens').remove([filePath]);
      throw new Error(error.message);
    }
    
    return snakeToCamel(newImagem) as ProdutoImagem;
  }

  async deleteImagem(imagemId: string, filePath: string): Promise<void> {
    return this.repository.deleteImagem(imagemId, filePath);
  }

  getImagemPublicUrl(filePath: string): string {
    const { data } = this.repository.supabase.storage
      .from('produto-imagens')
      .getPublicUrl(filePath);
    return data.publicUrl;
  }
}
