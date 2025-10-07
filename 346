import { IEntity } from './base';
import { PedidoVenda } from './pedidoVenda';
import { Cliente } from './cliente';

export interface DevolucaoVendaItem extends IEntity {
  devolucaoVendaId: string;
  pedidoVendaItemId: string;
  produtoId?: string;
  servicoId?: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
}

export interface DevolucaoVenda extends IEntity {
  numero: string;
  pedidoVendaId: string;
  pedidoVenda?: PedidoVenda;
  clienteId: string;
  cliente?: Cliente;
  dataDevolucao: Date;
  valorTotalDevolvido: number;
  observacoes?: string;
  itens: DevolucaoVendaItem[];
}
