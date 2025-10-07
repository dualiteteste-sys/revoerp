import { IEntity } from './base';
import { Cliente } from './cliente';

export enum FretePorConta {
    CIF = 'CIF',
    FOB = 'FOB',
}

export enum StatusOrdemCompra {
    ABERTA = 'ABERTA',
    RECEBIDA = 'RECEBIDA',
    CANCELADA = 'CANCELADA',
}

export interface OrdemCompraAnexo extends IEntity {
    ordemCompraId: string;
    nomeArquivo: string;
    path: string;
    tamanho: number;
    tipo: string;
}

export interface OrdemCompraItem extends IEntity {
    ordemCompraId: string;
    produtoId?: string;
    descricao: string;
    codigo?: string;
    unidade?: string;
    quantidade: number;
    precoUnitario: number;
    ipi?: number;
    precoTotal: number;
}

export interface OrdemCompra extends IEntity {
    numero: string;
    fornecedorId: string;
    fornecedor?: Cliente;
    itens: OrdemCompraItem[];
    totalProdutos: number;
    desconto?: string;
    frete?: number;
    totalIpi?: number;
    totalIcmsSt?: number;
    totalGeral: number;
    numeroNoFornecedor?: string;
    dataCompra: Date;
    dataPrevista?: Date;
    condicaoPagamento?: string;
    categoriaId?: string;
    transportadorNome?: string;
    fretePorConta: FretePorConta;
    observacoes?: string;
    marcadores?: string[];
    observacoesInternas?: string;
    status: StatusOrdemCompra;
    anexos?: OrdemCompraAnexo[];
}
