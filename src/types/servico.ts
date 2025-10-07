import { IEntity } from './base';

export enum SituacaoServico {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO'
}

export interface Servico extends IEntity {
  descricao: string;
  codigo?: string;
  preco: number;
  unidade?: string;
  situacao: SituacaoServico;
  codigoServico?: string;
  nbs?: string;
  descricaoComplementar?: string;
  observacoes?: string;
}
