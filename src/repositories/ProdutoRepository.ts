import { BaseRepository } from './BaseRepository';
import { Produto, ProdutoImagem, ProdutoAnuncio, ProdutoFornecedor } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class ProdutoRepository extends BaseRepository<Produto> {
  constructor() {
    super('produtos');
  }

  protected createEntity(data: Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>): Produto {
    return {
      ...data,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      imagens: [],
      anuncios: [],
      fornecedores: [],
      permitirVendas: true,
    };
  }

  async search(query: string): Promise<Pick<Produto, 'id' | 'nome' | 'precoVenda' | 'codigo' | 'unidade'>[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('id, nome, preco_venda, codigo, unidade')
      .or(`nome.ilike.%${query}%,codigo.eq.${query},codigo_barras.eq.${query}`)
      .eq('situacao', 'Ativo')
      .limit(10);
    this.handleError('search', error);
    return snakeToCamel(data || []) as Pick<Produto, 'id' | 'nome' | 'precoVenda' | 'codigo' | 'unidade'>[];
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Produto[]; count: number }> {
    // Otimizado: Carrega apenas os campos necessários para a listagem.
    const selectString = 'id, nome, codigo, preco_venda, controlar_estoque, estoque_inicial, situacao';
    const { data: productsData, count } = await super.findAll(options, selectString);

    if (!productsData) {
        return { data: [], count: 0 };
    }
    
    // Inicializa relações como arrays vazios para consistência da UI
    const finalProdutos = productsData.map(p => ({
      ...p,
      imagens: [],
      anuncios: [],
      fornecedores: []
    }));

    return {
      data: finalProdutos,
      count: count || 0,
    };
  }

  async findById(id: string): Promise<Produto | null> {
    const { data: productData, error: productError } = await this.supabase
      .from(this.tableName)
      .select('*, imagens:produto_imagens(*), anuncios:produto_anuncios(*)')
      .eq('id', id)
      .single();

    if (productError && productError.code !== 'PGRST116') {
        this.handleError('findById (product)', productError);
    }
    if (!productData) return null;

    const produto = snakeToCamel(productData) as Produto;

    const { data: fornecedoresData, error: fornecedoresError } = await this.supabase
      .from('produtos_fornecedores')
      .select('*, fornecedor:clientes(id, nome)')
      .eq('produto_id', id);

    this.handleError('findById (suppliers)', fornecedoresError);

    produto.fornecedores = snakeToCamel(fornecedoresData || []) as ProdutoFornecedor[];

    return produto;
  }

  async create(data: Partial<Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Produto> {
    const { anuncios, fornecedores, ...produtoData } = data;
    const newProduto = await super.create(produtoData as any);

    if (anuncios && anuncios.length > 0) {
      const anunciosParaInserir = anuncios.map(anuncio => ({
        ...camelToSnake(anuncio),
        produto_id: newProduto.id,
      }));
      const { data: insertedAnuncios, error: anunciosError } = await this.supabase
        .from('produto_anuncios')
        .insert(anunciosParaInserir)
        .select();
      this.handleError('create (anuncios)', anunciosError);
      newProduto.anuncios = snakeToCamel(insertedAnuncios || []) as ProdutoAnuncio[];
    }

    if (fornecedores && fornecedores.length > 0) {
        const fornecedoresParaInserir = fornecedores.map(f => ({
          produto_id: newProduto.id,
          fornecedor_id: f.fornecedorId,
          codigo_no_fornecedor: f.codigoNoFornecedor,
        }));
        const { data: insertedFornecedores, error: fornecedoresError } = await this.supabase
          .from('produtos_fornecedores')
          .insert(fornecedoresParaInserir)
          .select();
        this.handleError('create (fornecedores)', fornecedoresError);
        newProduto.fornecedores = snakeToCamel(insertedFornecedores || []) as ProdutoFornecedor[];
    }

    return newProduto;
  }

  async update(id: string, updates: Partial<Produto>): Promise<Produto> {
    const { anuncios, fornecedores, ...produtoUpdates } = updates;
    const updatedProduto = await super.update(id, produtoUpdates);

    await this.supabase.from('produto_anuncios').delete().eq('produto_id', id);
    if (anuncios && anuncios.length > 0) {
      const anunciosParaInserir = anuncios.map(anuncio => ({
        ...camelToSnake(anuncio),
        produto_id: id,
      }));
      const { data: insertedAnuncios, error: anunciosError } = await this.supabase
        .from('produto_anuncios')
        .insert(anunciosParaInserir)
        .select();
      this.handleError('update (anuncios)', anunciosError);
      updatedProduto.anuncios = snakeToCamel(insertedAnuncios || []) as ProdutoAnuncio[];
    } else {
      updatedProduto.anuncios = [];
    }

    await this.supabase.from('produtos_fornecedores').delete().eq('produto_id', id);
    if (fornecedores && fornecedores.length > 0) {
        const fornecedoresParaInserir = fornecedores.map(f => ({
            produto_id: id,
            fornecedor_id: f.fornecedorId,
            codigo_no_fornecedor: f.codigoNoFornecedor,
        }));
        const { data: insertedFornecedores, error: fornecedoresError } = await this.supabase
            .from('produtos_fornecedores')
            .insert(fornecedoresParaInserir)
            .select();
        this.handleError('update (fornecedores)', fornecedoresError);
        updatedProduto.fornecedores = snakeToCamel(insertedFornecedores || []) as ProdutoFornecedor[];
    } else {
        updatedProduto.fornecedores = [];
    }

    const reloadedProduto = await this.findById(id);
    if (!reloadedProduto) throw new Error("Falha ao recarregar o produto após a atualização.");

    return reloadedProduto;
  }

  async uploadImagem(produtoId: string, file: File): Promise<string> {
    const filePath = `${produtoId}/${Date.now()}-${file.name}`;
    const { error } = await this.supabase.storage
      .from('produto-imagens')
      .upload(filePath, file);

    if (error) {
      this.handleError('uploadImagem', error);
      throw new Error(error.message);
    }
    return filePath;
  }

  async deleteImagem(imagemId: string, filePath: string): Promise<void> {
    const { error: dbError } = await this.supabase
      .from('produto_imagens')
      .delete()
      .eq('id', imagemId);
    this.handleError('deleteImagem (db)', dbError);

    const { error: storageError } = await this.supabase.storage
      .from('produto-imagens')
      .remove([filePath]);
    this.handleError('deleteImagem (storage)', storageError);
  }
}
