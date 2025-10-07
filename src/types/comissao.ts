import { IEntity } from './base';

export enum StatusComissao {
  PENDENTE = 'Pendente',
  LIBERADA = 'Liberada',
  PAGA = 'Paga',
  CANCELADA = 'Cancelada',
}

export interface Comissao extends IEntity {
  pedidoVendaId: string;
  vendedorId: string;
  vendedorNome: string;
  clienteNome: string;
  dataVenda: Date;
  valorVenda: number;
  baseComissao: number;
  percentualComissao: number;
  valorComissao: number;
  status: StatusComissao;
  dataPagamento?: Date;
}
