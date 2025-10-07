import { IEntity } from './base';
import { Produto } from './produto';

export interface EstoqueMovimento extends IEntity {
  produtoId: string;
  tipo: 'ENTRADA' | 'SAIDA';
  quantidade: number;
  data: Date;
  origem?: string;
  observacao?: string;
}

export interface ProdutoComEstoque extends Pick<Produto, 
  'id' | 'nome' | 'codigo' | 'controlarEstoque' | 'estoqueMinimo' | 'estoqueMaximo' | 'unidade' | 'situacao' | 'imagens'
> {
  estoqueAtual: number;
}
