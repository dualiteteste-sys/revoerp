import { IEntity } from './base';

		// Enums Cliente
		export enum TipoPessoa {
		  FISICA = 'FISICA',
		  JURIDICA = 'JURIDICA',
		  ESTRANGEIRO = 'ESTRANGEIRO',
		}

		export enum ContribuinteICMS {
		  CONTRIBUINTE = 'CONTRIBUINTE',
		  CONTRIBUINTE_ISENTO = 'CONTRIBUINTE_ISENTO',
		  NAO_CONTRIBUINTE = 'NAO_CONTRIBUINTE',
		}

		export enum ClienteSituacao {
		    ATIVO = 'Ativo',
		    INATIVO = 'Inativo',
		}

		export interface PessoaContato extends IEntity {
		  clienteId: string;
		  nome: string;
		  setor?: string;
		  email?: string;
		  telefone?: string;
		  ramal?: string;
		}

		export interface Anexo extends IEntity {
		    clienteId: string;
		    nomeArquivo: string;
		    path: string;
		    tamanho: number;
		    tipo: string;
		}

		export interface Cliente extends IEntity {
		  empresaId: string;
		  // Dados Gerais
		  codigo: string;
		  nome: string;
		  nomeFantasia?: string;
		  tipoPessoa: TipoPessoa;
		  cpfCnpj: string;
		  rg?: string;
		  inscricaoEstadual?: string;
		  inscricaoMunicipal?: string;
		  contribuinteIcms: ContribuinteICMS;
		  isCliente: boolean;
		  isFornecedor: boolean;
		  isTransportadora: boolean;
		  // Endereço
		  logradouro: string;
		  numero: string;
		  complemento?: string;
		  bairro: string;
		  cep: string;
		  cidade: string;
		  estado: string;
		  pais: string;
		  // Endereço Cobrança
		  cobrancaLogradouro?: string;
		  cobrancaNumero?: string;
		  cobrancaComplemento?: string;
		  cobrancaBairro?: string;
		  cobrancaCep?: string;
		  cobrancaCidade?: string;
		  cobrancaEstado?: string;
		  // Contato
		  telefone?: string;
		  telefoneAdicional?: string;
		  celular: string;
		  email: string;
		  emailNfe?: string;
		  site?: string;
		  // Dados Complementares
		  estadoCivil?: string;
		  profissao?: string;
		  sexo?: string;
		  dataNascimento?: Date;
		  naturalidade?: string;
		  statusCrm?: string;
		  condicaoPagamentoPadraoId?: string;
		  limiteCredito?: number;
		  // Observações
		  observacoes?: string;
		  // Relações
		  pessoasContato?: PessoaContato[];
		  anexos?: Anexo[];
		  // Campos de Fornecedor
		  prazoMedioEntregaDias?: number;
		  categoriaDespesaPadraoId?: string;
		  // Campos de Transportadora
		  placaVeiculo?: string;
		  ufPlaca?: string;
		  registroAntt?: string;
		  observacoesFrete?: string;
		  // Campos de Cliente
		  situacaoCliente?: ClienteSituacao;
		  tabelaPrecoPadraoId?: string;
		}
