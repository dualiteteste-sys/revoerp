import { IEntity } from './base';
import { ContribuinteICMS } from './cliente';

export enum TipoPessoaVendedor {
  FISICA = 'Física',
  JURIDICA = 'Jurídica',
  ESTRANGEIRO = 'Estrangeiro',
  ESTRANGEIRO_NO_BRASIL = 'Estrangeiro no Brasil',
}

export enum SituacaoVendedor {
  ATIVO_COM_ACESSO = 'Ativo com acesso ao sistema',
  ATIVO_SEM_ACESSO = 'Ativo sem acesso ao sistema',
  INATIVO = 'Inativo',
}

export enum RegraComissao {
  LIBERACAO_PARCIAL = 'Liberação parcial (pelo pagamento)',
  LIBERACAO_TOTAL_PEDIDO = 'Liberação total (no faturamento)',
  LIBERACAO_TOTAL_PAGAMENTO = 'Liberação total (no pagamento)',
}

export enum TipoComissaoVendedor {
  FIXA = 'Comissão com alíquota fixa',
  POR_DESCONTO = 'Comissão com alíquota conforme descontos',
}

export interface Vendedor extends IEntity {
  // Identificação
  nome: string;
  fantasia?: string;
  codigo?: string;
  tipoPessoa: TipoPessoaVendedor;
  cpfCnpj: string;
  contribuinte: ContribuinteICMS;
  inscricaoEstadual?: string;
  // Endereço
  cep: string;
  cidade: string;
  uf: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento?: string;
  // Contatos
  telefone?: string;
  celular?: string;
  email: string;
  // Situação
  situacao: SituacaoVendedor;
  deposito?: string;
  emailComunicacoes?: string;
  // Acesso
  usuarioSistema?: string;
  acessoRestritoHorario: boolean;
  acessoRestritoIp: boolean;
  ipsPermitidos?: string;
  perfilAcessoContatos?: string;
  modulosAcessiveis: string[];
  podeIncluirProdutosNaoCadastrados: boolean;
  podeEmitirCobrancas: boolean;
  // Comissionamento
  regraLiberacaoComissao: RegraComissao;
  tipoComissao: TipoComissaoVendedor;
  aliquotaComissao?: number;
  desconsiderarComissaoLinhaProduto: boolean;
  // Observações
  observacoes?: string;
  // Controle Interno
  ativo: boolean;
  // Relação com Auth
  userId?: string;
  userPermissions?: string[];
}
