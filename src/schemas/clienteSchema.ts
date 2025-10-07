import { z } from 'zod';
		import { TipoPessoa, ContribuinteICMS } from '../types';

		const requiredString = (field: string) => z.string({ required_error: `${field} é obrigatório.` }).min(1, `${field} é obrigatório.`);

		// Schema for PessoaContato
		const pessoaContatoSchema = z.object({
		  id: z.string().optional().nullable(),
		  nome: requiredString('Nome do contato'),
		  setor: z.string().optional().nullable(),
		  email: z.string().email('E-mail do contato inválido').optional().or(z.literal('')),
		  telefone: z.string().optional().nullable(),
		  ramal: z.string().optional().nullable(),
		});

		// Schema for Anexo
		const anexoSchema = z.object({
		  id: z.string(),
		  clienteId: z.string().optional(),
		  nomeArquivo: z.string(),
		  path: z.string(),
		  tamanho: z.number(),
		  tipo: z.string(),
		  createdAt: z.date().or(z.string()).optional(),
		  updatedAt: z.date().or(z.string()).optional(),
		});

		export const clienteSchema = z.object({
		  id: z.string().optional().nullable(),
		  empresaId: z.string().uuid().optional().nullable(),
		  codigo: z.string().optional().nullable(),
		  nome: requiredString('Nome / Razão Social').max(120, 'Máximo de 120 caracteres.'),
		  nomeFantasia: z.string().max(60).optional().nullable(),
		  tipoPessoa: z.nativeEnum(TipoPessoa),
		  cpfCnpj: z.string().optional().nullable(),
		  rg: z.string().max(20).optional().nullable(),
		  inscricaoEstadual: z.string().max(20).optional().nullable(),
		  inscricaoMunicipal: z.string().max(20).optional().nullable(),
		  contribuinteIcms: z.nativeEnum(ContribuinteICMS).optional().nullable(),
		  isCliente: z.boolean().default(true),
		  isFornecedor: z.boolean().default(false),
		  isTransportadora: z.boolean().default(false),
		  
		  // Endereço
		  logradouro: z.string().optional().nullable(),
		  numero: z.string().optional().nullable(),
		  complemento: z.string().optional().nullable(),
		  bairro: z.string().optional().nullable(),
		  cep: z.string().optional().nullable(),
		  cidade: z.string().optional().nullable(),
		  estado: z.string().optional().nullable(),
		  pais: z.string().default('Brasil').optional().nullable(),

		  // Endereço Cobrança
		  cobrancaLogradouro: z.string().optional().nullable(),
		  cobrancaNumero: z.string().optional().nullable(),
		  cobrancaComplemento: z.string().optional().nullable(),
		  cobrancaBairro: z.string().optional().nullable(),
		  cobrancaCep: z.string().optional().nullable(),
		  cobrancaCidade: z.string().optional().nullable(),
		  cobrancaEstado: z.string().optional().nullable(),

		  // Contato
		  telefoneAdicional: z.string().optional().nullable(),
		  celular: z.string().optional().nullable(),
		  email: z.string().email('E-mail inválido.').optional().or(z.literal('')).nullable(),
		  emailNfe: z.string().email('E-mail para NF-e inválido').or(z.literal('')).optional().nullable(),
		  site: z.string().url('URL do site inválida').or(z.literal('')).optional().nullable(),

		  // Dados Complementares
		  estadoCivil: z.string().optional().nullable(),
		  profissao: z.string().optional().nullable(),
		  sexo: z.string().optional().nullable(),
		  dataNascimento: z.date().or(z.string()).optional().nullable(),
		  naturalidade: z.string().optional().nullable(),
		  statusCrm: z.string().optional().nullable(),
		  condicaoPagamentoPadraoId: z.string().optional().nullable(),
		  limiteCredito: z.number().optional().nullable(),

		  // Observações e Anexos
		  observacoes: z.string().optional().nullable(),
		  pessoasContato: z.array(pessoaContatoSchema).optional(),
		  anexos: z.array(anexoSchema).optional(),
		});

		export type ClienteFormData = z.infer<typeof clienteSchema>;
