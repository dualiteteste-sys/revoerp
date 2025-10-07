import { BaseRepository } from './BaseRepository';
import { ContaReceber, ContaReceberAnexo } from '../types';
import { snakeToCamel, camelToSnake } from '../lib/utils';

export class ContasReceberRepository extends BaseRepository<ContaReceber> {
  constructor() {
    super('contas_receber');
  }

  protected createEntity(data: any): ContaReceber {
    return data as ContaReceber;
  }

  async findAll(options: { page?: number; pageSize?: number } = {}): Promise<{ data: ContaReceber[]; count: number }> {
    const selectString = `
      id, descricao, data_vencimento, data_pagamento, valor, status,
      cliente:clientes!cliente_id ( id, nome ),
      fatura:faturas_venda!fatura_id (
        id,
        numero_fatura
      )
    `;
    const { data: contasData, count } = await super.findAll(options, selectString);
    
    return {
      data: contasData || [],
      count: count || 0,
    };
  }

  async findByCompetencia(competencia: string): Promise<Pick<ContaReceber, 'id' | 'contratoId' | 'dataVencimento'>[]> {
    const [ano, mes] = competencia.split('-').map(Number);
    const startDate = new Date(ano, mes - 1, 1).toISOString();
    const endDate = new Date(ano, mes, 1).toISOString(); // Primeiro dia do próximo mês

    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('id, contrato_id, data_vencimento')
      .gte('data_vencimento', startDate)
      .lt('data_vencimento', endDate)
      .not('contrato_id', 'is', null);

    this.handleError('findByCompetencia', error);
    return snakeToCamel(data || []) as Pick<ContaReceber, 'id' | 'contratoId' | 'dataVencimento'>[];
  }

  async findById(id: string): Promise<ContaReceber | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*, cliente:clientes!cliente_id ( id, nome )')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') {
        this.handleError('findById', error);
    }
    if (!data) return null;
    
    const conta = snakeToCamel(data) as ContaReceber;

    const { data: anexosData, error: anexosError } = await this.supabase
        .from('contas_receber_anexos')
        .select('*')
        .eq('conta_receber_id', id);
    this.handleError('findById (anexos)', anexosError);
    conta.anexos = snakeToCamel(anexosData || []) as ContaReceberAnexo[];

    return conta;
  }
  
  async create(data: Partial<Omit<ContaReceber, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ContaReceber> {
    const { anexos, ...contaData } = data;
    const newConta = await super.create(contaData as any);

    if (anexos && anexos.length > 0) {
      const anexosParaInserir = anexos.map(anexo => ({
        ...camelToSnake(anexo),
        conta_receber_id: newConta.id,
      }));
      const { data: insertedAnexos, error: anexosError } = await this.supabase
        .from('contas_receber_anexos')
        .insert(anexosParaInserir)
        .select();
      this.handleError('create (anexos)', anexosError);
      newConta.anexos = snakeToCamel(insertedAnexos || []) as ContaReceberAnexo[];
    }

    return newConta;
  }

  async update(id: string, updates: Partial<ContaReceber>): Promise<ContaReceber> {
    const { anexos, ...contaUpdates } = updates;
    const updatedConta = await super.update(id, contaUpdates);

    if (anexos) {
        const novosAnexos = anexos.filter(a => !a.id);
        if(novosAnexos.length > 0) {
            const anexosParaInserir = anexos.map(anexo => ({
              ...camelToSnake(anexo),
              conta_receber_id: id,
            }));
            const { data: insertedAnexos, error: anexosError } = await this.supabase
              .from('contas_receber_anexos')
              .insert(anexosParaInserir)
              .select();
            this.handleError('update (anexos)', anexosError);
            updatedConta.anexos = [...(updatedConta.anexos || []), ...snakeToCamel(insertedAnexos || []) as ContaReceberAnexo[]];
        }
    }

    return updatedConta;
  }

  async uploadAnexo(contaId: string, file: File): Promise<string> {
    const filePath = `contas-a-receber/${contaId}/${Date.now()}-${file.name}`;
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
      .from('contas_receber_anexos')
      .delete()
      .eq('id', anexoId);
    this.handleError('deleteAnexo (db)', dbError);

    const { error: storageError } = await this.supabase.storage
      .from('anexos-financeiro')
      .remove([filePath]);
    this.handleError('deleteAnexo (storage)', storageError);
  }
}
