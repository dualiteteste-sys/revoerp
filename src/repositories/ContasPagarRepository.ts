import { BaseRepository } from './BaseRepository';
import { ContaPagar, ContaPagarAnexo } from '../types';
import { snakeToCamel, camelToSnake } from '../lib/utils';

export class ContasPagarRepository extends BaseRepository<ContaPagar> {
  constructor() {
    super('contas_pagar');
  }

  protected createEntity(data: any): ContaPagar {
    return data as ContaPagar;
  }

  async findAll(): Promise<ContaPagar[]> {
    const selectString = 'id, descricao, data_vencimento, data_pagamento, valor, status, fornecedor:clientes!fornecedor_id ( id, nome )';
    const { data } = await super.findAll({}, selectString);
    return data || [];
  }

  async findById(id: string): Promise<ContaPagar | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*, fornecedor:clientes!fornecedor_id ( id, nome )')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
        this.handleError('findById', error);
    }
    if (!data) return null;
    
    const conta = snakeToCamel(data) as ContaPagar;

    const { data: anexosData, error: anexosError } = await this.supabase
        .from('contas_pagar_anexos')
        .select('*')
        .eq('conta_pagar_id', id);
    this.handleError('findById (anexos)', anexosError);
    conta.anexos = snakeToCamel(anexosData || []) as ContaPagarAnexo[];

    return conta;
  }

  async create(data: Partial<Omit<ContaPagar, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ContaPagar> {
    const { anexos, ...contaData } = data;
    const newConta = await super.create(contaData as any);

    if (anexos && anexos.length > 0) {
      const anexosParaInserir = anexos.map(anexo => ({
        ...camelToSnake(anexo),
        conta_pagar_id: newConta.id,
      }));
      const { data: insertedAnexos, error: anexosError } = await this.supabase
        .from('contas_pagar_anexos')
        .insert(anexosParaInserir)
        .select();
      this.handleError('create (anexos)', anexosError);
      newConta.anexos = snakeToCamel(insertedAnexos || []) as ContaPagarAnexo[];
    }

    return newConta;
  }

  async update(id: string, updates: Partial<ContaPagar>): Promise<ContaPagar> {
    const { anexos, ...contaUpdates } = updates;
    const updatedConta = await super.update(id, contaUpdates);

    if (anexos) {
        const novosAnexos = anexos.filter(a => !a.id);
        if(novosAnexos.length > 0) {
            const anexosParaInserir = novosAnexos.map(anexo => ({
              ...camelToSnake(anexo),
              conta_pagar_id: id,
            }));
            const { data: insertedAnexos, error: anexosError } = await this.supabase
              .from('contas_pagar_anexos')
              .insert(anexosParaInserir)
              .select();
            this.handleError('update (anexos)', anexosError);
            updatedConta.anexos = [...(updatedConta.anexos || []), ...snakeToCamel(insertedAnexos || []) as ContaPagarAnexo[]];
        }
    }

    return updatedConta;
  }

  async uploadAnexo(contaId: string, file: File): Promise<string> {
    const filePath = `contas-a-pagar/${contaId}/${Date.now()}-${file.name}`;
    const { error } = await this.supabase.storage
      .from('anexos-financeiro')
      .upload(filePath, file);

    if (error) {
      this.handleError('uploadAnexo', error);
      throw new Error(error.message);
    }
    return filePath;
  }

  async deleteAnexo(anexoId: string, filePath: string): Promise<void> {
    const { error: dbError } = await this.supabase
      .from('contas_pagar_anexos')
      .delete()
      .eq('id', anexoId);
    this.handleError('deleteAnexo (db)', dbError);

    const { error: storageError } = await this.supabase.storage
      .from('anexos-financeiro')
      .remove([filePath]);
    this.handleError('deleteAnexo (storage)', storageError);
  }
}
