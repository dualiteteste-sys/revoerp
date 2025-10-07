import { IEntity } from './base';

export enum TipoProduto {
    SIMPLES = 'Simples',
    COM_VARIACOES = 'Com variações',
    KIT = 'Kit',
    FABRICADO = 'Fabricado',
    MATERIA_PRIMA = 'Matéria Prima'
}

export enum SituacaoProduto {
    ATIVO = 'Ativo',
    INATIVO = 'Inativo'
}

export enum OrigemProduto {
    NACIONAL = '0 - Nacional',
    ESTRANGEIRA_DIRETA = '1 - Estrangeira (Imp. Direta)',
    ESTRANGEIRA_INTERNO = '2 - Estrangeira (Merc. Interno)',
    NACIONAL_CONTEUDO_40_70 = '3 - Nacional (Imp. > 40%)',
    NACIONAL_PROCESSO_BASICO = '4 - Nacional (Proc. Básico)',
    NACIONAL_CONTEUDO_INF_40 = '5 - Nacional (Imp. <= 40%)',
    ESTRANGEIRA_DIRETA_SEM_SIMILAR = '6 - Estrangeira (Imp. Direta, s/ similar)',
    ESTRANGEIRA_INTERNO_SEM_SIMILAR = '7 - Estrangeira (Merc. Interno, s/ similar)',
    NACIONAL_CONTEUDO_SUP_70 = '8 - Nacional (Imp. > 70%)'
}

export enum TipoEmbalagemProduto {
    PACOTE_CAIXA = 'Pacote / Caixa',
    ENVELOPE = 'Envelope',
    ROLO_CILINDRICO = 'Rolo / Cilindrico'
}

export enum EmbalagemProduto {
    CUSTOMIZADA = 'Embalagem customizada',
    FLEX = 'Caixa de Encomenda Flex',
    CE01 = 'Caixa de Encomenda CE – 01',
    CE02 = 'Caixa de Encomenda CE – 02',
    CE03 = 'Caixa de Encomenda CE – 03',
    CE07 = 'Caixa de Encomenda CE – 07',
    B5 = 'Caixa de Encomenda 5B',
    B6 = 'Caixa de Encomenda 6B',
    VAI_VEM = 'Caixa de Encomenda Vai e Vem',
    B = 'Caixa de Encomenda B',
    B2 = 'Caixa de Encomenda 2B',
    B4 = 'Caixa de Encomenda 4B',
    T01 = 'Caixa de Encomenda Temática 01',
    T02 = 'Caixa de Encomenda Temática 02',
    T03 = 'Caixa de Encomenda Temática 03',
    NOVA = 'Criar nova embalagem ...'
}

export interface ProdutoImagem extends IEntity {
    produtoId: string;
    path: string;
    nomeArquivo: string;
    tamanho: number;
    tipo: string;
    url?: string;
}

export interface ProdutoAtributo {
    id: string; // Apenas para uso no lado do cliente (React key)
    atributo: string;
    valor: string;
}

export interface ProdutoAnuncio {
    id: string; // Apenas para uso no lado do cliente (React key)
    ecommerce: string;
    identificador: string;
    descricao?: string;
}

export interface ProdutoFornecedor {
    id: string; // Apenas para uso no lado do cliente (React key)
    produtoId: string;
    fornecedorId: string;
    codigoNoFornecedor: string;
    fornecedor?: { nome: string }; // Populado via JOIN
}

export interface Produto extends IEntity {
    // Aba Dados Gerais
    tipoProduto: TipoProduto;
    nome: string;
    codigoBarras?: string;
    codigo?: string;
    origem: OrigemProduto;
    unidade: string;
    ncm: string;
    cest?: string;
    precoVenda: number;
    pesoLiquido?: number;
    pesoBruto?: number;
    volumes?: number;
    tipoEmbalagem?: TipoEmbalagemProduto;
    embalagem?: EmbalagemProduto;
    largura?: number;
    altura?: number;
    comprimento?: number;
    controlarEstoque: boolean;
    estoqueInicial?: number;
    estoqueMinimo?: number;
    estoqueMaximo?: number;
    controlarLotes: boolean;
    localizacao?: string;
    diasPreparacao?: number;
    situacao: SituacaoProduto;
    
    // Aba Dados Complementares
    marca?: string;
    tabelaMedidas?: string;
    descricaoComplementar?: string;
    linkVideo?: string;
    slug?: string;
    keywords?: string;
    tituloSeo?: string;
    descricaoSeo?: string;

    // Aba Outros
    unidadePorCaixa?: number;
    custo?: number;
    linhaProduto?: string;
    garantia?: string;
    markup?: number;
    permitirVendas: boolean;
    gtinTributavel?: string;
    unidadeTributavel?: string;
    fatorConversao?: number;
    codigoEnquadramentoIpi?: string;
    valorIpiFixo?: number;
    exTipi?: string;
    observacoesProduto?: string;

    // Relações e JSON
    imagens: ProdutoImagem[];
    atributos?: ProdutoAtributo[];
    anuncios?: ProdutoAnuncio[];
    fornecedores?: ProdutoFornecedor[];
}
