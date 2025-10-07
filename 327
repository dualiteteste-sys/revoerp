import { FormaPagamentoRepository } from '../../repositories/FormaPagamentoRepository';
import { FormaPagamentoService } from '../FormaPagamentoService';
import { IFormaPagamentoService } from '../interfaces';

export const createFormaPagamentoService = (): IFormaPagamentoService => {
  const repository = new FormaPagamentoRepository();
  return new FormaPagamentoService(repository);
};
