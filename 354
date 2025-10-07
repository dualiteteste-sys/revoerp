import { IEntity } from './base';
import { Cliente } from './cliente';
import { Servico } from './servico';
import { Vendedor } from './vendedor';

export enum StatusOS {
  ABERTA = 'ABERTA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
  ORCAMENTO = 'ORCAMENTO',
}

export enum PrioridadeOS {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE'
}

export interface OrdemServicoItem extends IEntity {
  ordemServicoId: string;
  servicoId?: string;
  servico?: Servico;
  descricao: string;
  codigo?: string;
  quantidade: number;
  preco: number;
  desconto: number;
  valorTotal: number;
  orcar: boolean;
}

export interface OrdemServicoAnexo extends IEntity {
  ordemServicoId: string;
  nomeArquivo: string;
  path: string;
  tamanho: number;
  tipo: string;
}

export interface OrdemServico extends IEntity {
  numero: string;
  clienteId: string;
  cliente?: Cliente;
  descricaoServico?: string;
  consideracoesFinais?: string;
  itens: OrdemServicoItem[];
  dataInicio: Date;
  dataPrevisao?: Date;
  hora?: string;
  dataConclusao?: Date;
  totalServicos: number;
  desconto?: string; // Pode ser '10%' ou '100.00'
  observacoesServico?: string;
  observacoesInternas?: string;
  vendedorId?: string;
  vendedor?: Vendedor;
  comissaoPercentual?: number;
  valorComissao?: number;
  tecnicoId?: string;
  tecnico?: Vendedor;
  orcar: boolean;
  formaRecebimento?: string;
  meioPagamento?: string;
  contaBancaria?: string;
  categoriaFinanceira?: string;
  condicaoPagamento?: string;
  anexos: OrdemServicoAnexo[];
  marcadores?: string[];
  status: StatusOS;
  prioridade: PrioridadeOS;
}
