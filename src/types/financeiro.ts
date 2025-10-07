import { IEntity } from './base';
import { PedidoVenda } from './pedidoVenda';
import { Cliente } from './cliente';
import { Contrato } from './contrato';

export enum StatusFatura {
  EMITIDA = 'EMITIDA',
  PAGA = 'PAGA',
  VENCIDA = 'VENCIDA',
  CANCELADA = 'CANCELADA'
}

export enum StatusContaReceber {
  A_RECEBER = 'A_RECEBER',
  RECEBIDO = 'RECEBIDO',
  VENCIDO = 'VENCIDO'
}

export enum StatusContaPagar {
  A_PAGAR = 'A_PAGAR',
  PAGO = 'PAGO',
  VENCIDO = 'VENCIDO'
}

export enum OcorrenciaConta {
    UNICA = 'Única',
    RECORRENTE = 'Recorrente',
}

export enum TipoMovimentoCaixa {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA'
}

export enum TipoCategoriaFinanceira {
    RECEITA = 'RECEITA',
    DESPESA = 'DESPESA'
}

export interface CategoriaFinanceira extends IEntity {
    descricao: string;
    tipo: TipoCategoriaFinanceira;
    ativo: boolean;
}

export interface FormaPagamento extends IEntity {
    descricao: string;
    ativo: boolean;
}

export interface FaturaVenda extends IEntity {
  pedidoId: string;
  pedido?: PedidoVenda; // Populado via JOIN
  numeroFatura: string;
  dataEmissao: Date;
  dataVencimento: Date;
  valorTotal: number;
  status: StatusFatura;
}

export interface ContaReceberAnexo extends IEntity {
    contaReceberId: string;
    nomeArquivo: string;
    path: string;
    tamanho: number;
    tipo: string;
}

export interface ContaReceber extends IEntity {
  faturaId?: string;
  fatura?: FaturaVenda;
  clienteId?: string;
  cliente?: Cliente;
  contratoId?: string; // Adicionado para vínculo com Contratos
  descricao?: string;
  valor: number;
  dataVencimento: Date;
  dataPagamento?: Date;
  status: StatusContaReceber;
  ocorrencia?: OcorrenciaConta;
  formaRecebimento?: string;
  numeroDocumento?: string;
  historico?: string;
  categoriaId?: string;
  marcadores?: string[];
  anexos?: ContaReceberAnexo[];
}

export interface ContaPagarAnexo extends IEntity {
    contaPagarId: string;
    nomeArquivo: string;
    path: string;
    tamanho: number;
    tipo: string;
}

export interface ContaPagar extends IEntity {
  descricao: string;
  valor: number;
  dataVencimento: Date;
  dataPagamento?: Date;
  status: StatusContaPagar;
  fornecedorId?: string;
  fornecedor?: Cliente; // Populado via JOIN
  formaPagamento?: string;
  numeroDocumento?: string;
  historico?: string;
  categoriaId?: string;
  ocorrencia: OcorrenciaConta;
  competencia?: string; // Mês/Ano
  marcadores?: string[];
  anexos?: ContaPagarAnexo[];
}

export interface FluxoCaixa extends IEntity {
  data: Date;
  descricao: string;
  valor: number;
  tipo: TipoMovimentoCaixa;
  contaReceberId?: string;
  contaPagarId?: string;
}
