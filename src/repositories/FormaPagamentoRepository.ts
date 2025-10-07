import { BaseRepository } from './BaseRepository';
import { FormaPagamento } from '../types';
import { IFormaPagamentoRepository } from './interfaces';

export class FormaPagamentoRepository extends BaseRepository<FormaPagamento> implements IFormaPagamentoRepository {
  constructor() {
    super('formas_pagamento');
  }

  protected createEntity(data: Omit<FormaPagamento, 'id' | 'createdAt' | 'updatedAt'>): FormaPagamento {
    return {
      ...data,
      id: '',
      ativo: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
