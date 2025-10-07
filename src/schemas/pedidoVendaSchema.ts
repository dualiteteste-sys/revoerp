import { z } from 'zod';
import { StatusPedidoVenda, FretePorConta } from '../types';

const itemSchema = z.object({
  id: z.string().optional(),
  produtoId: z.string().optional().nullable(),
  servicoId: z.string().optional().nullable(),
  descricao: z.string().min(1, 'Descrição do item é obrigatória.'),
  codigo: z.string().optional().nullable(),
  unidade: z.string().optional().nullable(),
  quantidade: z.coerce.number().min(0.01, 'Quantidade deve ser maior que zero.'),
  valorUnitario: z.coerce.number().min(0, 'Preço não pode ser negativo.'),
  descontoPercentual: z.coerce.number().min(0).max(100).optional().nullable(),
  valorTotal: z.coerce.number(),
});

export const pedidoVendaSchema = z.object({
  id: z.string().optional().nullable(),
  numero: z.string().optional().nullable(),
  naturezaOperacao: z.string().min(1, 'Natureza da operação é obrigatória.'),
  clienteId: z.string().min(1, 'Cliente é obrigatório.'),
  vendedorId: z.string().optional().nullable(),
  enderecoEntregaDiferente: z.boolean().default(false),
  
  itens: z.array(itemSchema).min(1, 'Adicione pelo menos um item ao pedido.'),

  // Totais e Ajustes
  totalProdutos: z.number().optional(),
  valorIpi: z.number().optional().nullable(),
  valorIcmsSt: z.number().optional().nullable(),
  desconto: z.string().optional().nullable(),
  freteCliente: z.number().optional().nullable(),
  freteEmpresa: z.number().optional().nullable(),
  despesas: z.number().optional().nullable(),
  valorTotal: z.number().optional(),

  // Datas
  dataVenda: z.date().or(z.string()),
  dataPrevistaEntrega: z.date().or(z.string()).optional().nullable(),
  dataEnvio: z.date().or(z.string()).optional().nullable(),
  dataMaximaDespacho: z.date().or(z.string()).optional().nullable(),

  // E-commerce
  numeroPedidoEcommerce: z.string().optional().nullable(),
  identificadorPedidoEcommerce: z.string().optional().nullable(),
  numeroPedidoCanalVenda: z.string().optional().nullable(),
  intermediador: z.string().optional().nullable(),

  // Pagamento
  formaRecebimento: z.string().optional().nullable(),
  meioPagamento: z.string().optional().nullable(),
  contaBancaria: z.string().optional().nullable(),
  categoriaFinanceira: z.string().optional().nullable(),
  condicaoPagamento: z.string().optional().nullable(),

  // Transporte
  formaEnvio: z.string().optional().nullable(),
  enviarParaExpedicao: z.boolean().default(true),

  // Adicionais
  deposito: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
  observacoesInternas: z.string().optional().nullable(),
  marcadores: z.array(z.string()).optional(),
  anexos: z.array(z.any()).optional(),
  status: z.nativeEnum(StatusPedidoVenda).default(StatusPedidoVenda.ABERTO),
  pesoBruto: z.number().optional().nullable(),
  pesoLiquido: z.number().optional().nullable(),
});

export type PedidoVendaFormData = z.infer<typeof pedidoVendaSchema>;
