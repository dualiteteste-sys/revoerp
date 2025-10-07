import { IEntity } from './base';
import { PedidoVenda } from './pedidoVenda';

export enum StatusExpedicao {
  AGUARDANDO_ENVIO = 'AGUARDANDO_ENVIO',
  ENVIADO = 'ENVIADO',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO',
}

export interface Expedicao extends IEntity {
  lote: string;
  formaEnvio: string;
  status: StatusExpedicao;
  dataCriacao: Date;
  dataEnvio?: Date;
}

export interface ExpedicaoPedido extends IEntity {
  expedicaoId: string;
  pedidoVendaId: string;
  pedidoVenda?: PedidoVenda;
}
