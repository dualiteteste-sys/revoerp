import { IEntity } from './base';
import { Cliente } from './cliente';
import { Produto } from './produto';

export enum StatusNotaEntrada {
  EM_DIGITACAO = 'EM_DIGITACAO',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
}

export interface NotaEntradaItem extends IEntity {
  notaEntradaId: string;
  produtoId: string;
  produto?: Produto;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface NotaEntrada extends IEntity {
  numero: string;
  fornecedorId: string;
  fornecedor?: Cliente;
  dataEntrada: Date;
  valorTotal: number;
  status: StatusNotaEntrada;
  observacoes?: string;
  itens: NotaEntradaItem[];
}
