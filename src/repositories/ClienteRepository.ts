import { BaseRepository } from './BaseRepository';
import { Cliente, PessoaContato, Anexo } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';
import { IClienteRepository } from './interfaces';

export class ClienteRepository extends BaseRepository<Cliente> implements IClienteRepository {
  constructor() {
    super('clientes');
  }

  protected createEntity(data: Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>): Cliente {
    return {
      ...data,
      id: '',
      isCliente: false,
      isFornecedor: false,
      isTransportadora: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async search(query: string, type: 'cliente' | 'fornecedor'): Promise<Pick<Cliente, 'id' | 'nome'>[]> {
    let request = this.supabase
      .from(this.tableName)
      .select('id, nome')
      .ilike('nome', `%${query}%`);

    if (type === 'cliente') {
      request = request.eq('is_cliente', true);
    } else if (type === 'fornecedor') {
      request = request.eq('is_fornecedor', true);
    }

    const { data, error } = await request.limit(10);
    this.handleError(`search (${type})`, error);
    return snakeToCamel(data || []) as Pick<Cliente, 'id' | 'nome'>[];
  }

  async create(data: Partial<Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Cliente> {
    const { pessoasContato, anexos, ...clienteData } = data;

    const newCliente = await super.create(clienteData as any);

    if (pessoasContato && pessoasContato.length > 0) {
      const contatosParaInserir = pessoasContato.map(contato => ({
        ...camelToSnake(contato),
        cliente_id: newCliente.id,
      }));
      const { data: insertedContatos, error: contatosError } = await this.supabase
        .from('pessoas_contato')
        .insert(contatosParaInserir)
        .select();
      this.handleError('create (pessoasContato)', contatosError);
      newCliente.pessoasContato = snakeToCamel(insertedContatos || []) as PessoaContato[];
    }

    newCliente.anexos = [];

    return newCliente;
  }

  async update(id: string, updates: Partial<Cliente>): Promise<Cliente> {
    const { pessoasContato, anexos, ...clienteUpdates } = updates;
    const updatedCliente = await super.update(id, clienteUpdates);

    await this.supabase.from('pessoas_contato').delete().eq('cliente_id', id);
    if (pessoasContato && pessoasContato.length > 0) {
      const contatosParaInserir = pessoasContato.map(contato => ({
        ...camelToSnake(contato),
        cliente_id: id,
      }));
      const { data: insertedContatos, error: contatosError } = await this.supabase
        .from('pessoas_contato')
        .insert(contatosParaInserir)
        .select();
      this.handleError('update (pessoasContato)', contatosError);
      updatedCliente.pessoasContato = snakeToCamel(insertedContatos || []) as PessoaContato[];
    }

    if (anexos) {
        const novosAnexos = anexos.filter(a => !a.id);
        if(novosAnexos.length > 0) {
            const anexosParaInserir = novosAnexos.map(anexo => ({
              ...camelToSnake(anexo),
              cliente_id: id,
            }));
            const { data: insertedAnexos, error: anexosError } = await this.supabase
              .from('cliente_anexos')
              .insert(anexosParaInserir)
              .select();
            this.handleError('update (anexos)', anexosError);
            updatedCliente.anexos = [...(updatedCliente.anexos || []), ...snakeToCamel(insertedAnexos || []) as Anexo[]];
        }
    }

    return updatedCliente;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: Cliente[]; count: number }> {
    // Otimizado: Carrega apenas os campos necessários para a listagem.
    const selectString = 'id, nome, nome_fantasia, cpf_cnpj, email, celular, telefone_adicional';
    return super.findAll(options, selectString);
  }
  
  async findById(id: string): Promise<Cliente | null> {
    // Sobrescreve o findById para carregar todas as relações necessárias para o formulário.
    const { data: clienteData, error } = await this.supabase
      .from(this.tableName)
      .select('*, pessoas_contato(*), anexos:cliente_anexos(*)')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
      this.handleError('findById', error);
    }
    if (!clienteData) return null;

    return snakeToCamel(clienteData) as Cliente | null;
  }

  async uploadAnexo(clienteId: string, file: File): Promise<string> {
    const filePath = `${clienteId}/${Date.now()}-${file.name}`;
    const { error } = await this.supabase.storage
      .from('cliente-anexos')
      .upload(filePath, file);

    if (error) {
      this.handleError('uploadAnexo', error);
      throw new Error(error.message);
    }
    return filePath;
  }

  async deleteAnexo(anexoId: string, filePath: string): Promise<void> {
    const { error: dbError } = await this.supabase
      .from('cliente_anexos')
      .delete()
      .eq('id', anexoId);
    this.handleError('deleteAnexo (db)', dbError);

    const { error: storageError } = await this.supabase.storage
      .from('cliente-anexos')
      .remove([filePath]);
    this.handleError('deleteAnexo (storage)', storageError);
  }
}
