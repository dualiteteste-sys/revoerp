import { IEntity } from './base';
import { Cliente } from './cliente';

export enum ContratoSituacao {
  ATIVO = 'Ativo',
  DEMONSTRACAO = 'Demonstração',
  INATIVO = 'Inativo',
  ISENTO = 'Isento',
  BAIXADO = 'Baixado',
  ENCERRADO = 'Encerrado',
}

export enum ContratoVencimentoRegra {
  MES_CORRENTE = 'No mês corrente',
  MES_SEGUINTE = 'No mês seguinte',
}

export enum ContratoPeriodicidade {
  MENSAL = 'Mensal',
  BIMESTRAL = 'Bimestral',
  TRIMESTRAL = 'Trimestral',
  SEMESTRAL = 'Semestral',
  ANUAL = 'Anual',
}

export interface ContratoAnexo extends IEntity {
  contratoId: string;
  nomeArquivo: string;
  path: string;
  tamanho: number;
  tipo: string;
}

export interface Contrato extends IEntity {
  clienteId: string;
  cliente?: Cliente;
  descricao: string;
  situacao: ContratoSituacao;
  dataContrato: Date;
  valor: number;
  vencimentoRegra: ContratoVencimentoRegra;
  diaVencimento: number;
  periodicidade: ContratoPeriodicidade;
  categoriaId?: string;
  formaRecebimento?: string;
  emitirNf: boolean;
  dadosAdicionais?: any;
  marcadores?: string[];
  anexos?: ContratoAnexo[];
  // Campos da View
  clienteNome?: string;
  contasEmAberto?: number;
  ultimoPagamento?: Date;
}
