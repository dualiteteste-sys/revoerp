import { z } from 'zod';
import { TipoPessoaVendedor, ContribuinteICMS, SituacaoVendedor, RegraComissao, TipoComissaoVendedor } from '../types';

const requiredString = (field: string) => z.string({ required_error: `${field} é obrigatório.` }).min(1, `${field} é obrigatório.`);

export const vendedorSchema = z.object({
  id: z.string().optional().nullable(),
  nome: requiredString('Nome'),
  fantasia: z.string().optional().nullable(),
  codigo: z.string().optional().nullable(),
  tipoPessoa: z.nativeEnum(TipoPessoaVendedor),
  cpfCnpj: requiredString('CPF/CNPJ'),
  contribuinte: z.nativeEnum(ContribuinteICMS),
  inscricaoEstadual: z.string().optional().nullable(),
  
  // Endereço
  cep: z.string().optional().nullable(),
  cidade: z.string().optional().nullable(),
  uf: z.string().optional().nullable(),
  logradouro: z.string().optional().nullable(),
  bairro: z.string().optional().nullable(),
  numero: z.string().optional().nullable(),
  complemento: z.string().optional().nullable(),

  // Contato
  telefone: z.string().optional().nullable(),
  celular: z.string().optional().nullable(),
  email: requiredString('E-mail').email('E-mail inválido.'),

  // Situação
  situacao: z.nativeEnum(SituacaoVendedor),
  deposito: z.string().optional().nullable(),
  emailComunicacoes: z.string().email('E-mail inválido.').or(z.literal('')).optional().nullable(),

  // Acesso
  usuarioSistema: z.string().optional().nullable(),

  // Comissionamento
  regraLiberacaoComissao: z.nativeEnum(RegraComissao),
  tipoComissao: z.nativeEnum(TipoComissaoVendedor),
  aliquotaComissao: z.coerce.number().optional().nullable(),
  desconsiderarComissaoLinhaProduto: z.boolean().default(false),

  // Observações
  observacoes: z.string().optional().nullable(),
  ativo: z.boolean().default(true),
});

export type VendedorFormData = z.infer<typeof vendedorSchema>;
