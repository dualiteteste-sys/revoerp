import { z } from 'zod';
import { StatusOS, PrioridadeOS } from '../types';

const itemSchema = z.object({
  id: z.string().optional(),
  servicoId: z.string().optional().nullable(),
  descricao: z.string().min(1, 'Descrição do item é obrigatória.'),
  codigo: z.string().optional().nullable(),
  quantidade: z.coerce.number().min(0.01, 'Quantidade deve ser maior que zero.'),
  preco: z.coerce.number().min(0, 'Preço não pode ser negativo.'),
  desconto: z.coerce.number().min(0).max(100).optional().nullable(),
  valorTotal: z.coerce.number(),
  orcar: z.boolean().default(false),
});

export const ordemServicoSchema = z.object({
  id: z.string().optional().nullable(),
  numero: z.string().optional().nullable(),
  clienteId: z.string().min(1, 'Cliente é obrigatório.'),
  descricaoServico: z.string().optional().nullable(),
  consideracoesFinais: z.string().optional().nullable(),
  itens: z.array(itemSchema).min(1, 'Adicione pelo menos um serviço.').optional(),
  dataInicio: z.date().or(z.string()),
  dataPrevisao: z.date().or(z.string()).optional().nullable(),
  hora: z.string().optional().nullable(),
  dataConclusao: z.date().or(z.string()).optional().nullable(),
  totalServicos: z.number().optional(),
  desconto: z.string().optional().nullable(),
  observacoesServico: z.string().optional().nullable(),
  observacoesInternas: z.string().optional().nullable(),
  vendedorId: z.string().optional().nullable(),
  tecnicoId: z.string().optional().nullable(),
  orcar: z.boolean().default(false),
  formaRecebimento: z.string().optional().nullable(),
  meioPagamento: z.string().optional().nullable(),
  contaBancaria: z.string().optional().nullable(),
  categoriaFinanceira: z.string().optional().nullable(),
  condicaoPagamento: z.string().optional().nullable(),
  anexos: z.array(z.any()).optional(),
  marcadores: z.array(z.string()).optional(),
  status: z.nativeEnum(StatusOS).default(StatusOS.ABERTA),
  prioridade: z.nativeEnum(PrioridadeOS).default(PrioridadeOS.MEDIA),
}).refine(data => data.orcar || (data.itens && data.itens.length > 0), {
    message: "Adicione pelo menos um serviço ou marque como 'Orçar'.",
    path: ["itens"],
});

export type OrdemServicoFormData = z.infer<typeof ordemServicoSchema>;
