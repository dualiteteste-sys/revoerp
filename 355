import { IEntity } from './base';
import { Cliente } from './cliente';
import { Vendedor } from './vendedor';

export enum StatusPedidoVenda {
  ABERTO = 'ABERTO',
  FATURADO = 'FATURADO',
  CANCELADO = 'CANCELADO'
}

export interface PedidoVendaItem extends IEntity {
  pedidoId: string;
  produtoId?: string;
  servicoId?: string;
  descricao: string;
  codigo?: string;
  unidade?: string;
  quantidade: number;
  valorUnitario: number;
  descontoPercentual?: number;
  valorTotal: number;
}

export interface PedidoVendaAnexo extends IEntity {
    pedidoId: string;
    nomeArquivo: string;
    path: string;
    tamanho: number;
    tipo: string;
}

export interface PedidoVenda extends IEntity {
  numero: string;
  naturezaOperacao: string;
  clienteId: string;
  cliente?: Cliente;
  vendedorId?: string;
  vendedor?: Vendedor;
  enderecoEntregaDiferente: boolean;
  itens: PedidoVendaItem[];
  // Totais
  totalProdutos: number;
  valorIpi?: number;
  valorIcmsSt?: number;
  desconto?: string; // '10%' ou '100.00'
  freteCliente?: number;
  freteEmpresa?: number;
  despesas?: number;
  valorTotal: number;
  // Detalhes da Venda
  dataVenda: Date;
  dataPrevistaEntrega?: Date;
  dataEnvio?: Date;
  dataMaximaDespacho?: Date;
  numeroPedidoEcommerce?: string;
  identificadorPedidoEcommerce?: string;
  numeroPedidoCanalVenda?: string;
  intermediador?: string;
  // Pagamento
  formaRecebimento?: string;
  meioPagamento?: string;
  contaBancaria?: string;
  categoriaFinanceira?: string;
  condicaoPagamento?: string;
  // Transporte
  formaEnvio?: string;
  enviarParaExpedicao: boolean;
  // Dados Adicionais
  deposito?: string;
  observacoes?: string;
  observacoesInternas?: string;
  marcadores?: string[];
  anexos?: PedidoVendaAnexo[];
  status: StatusPedidoVenda;
  pesoBruto?: number;
  pesoLiquido?: number;
  expedido: boolean;
}
