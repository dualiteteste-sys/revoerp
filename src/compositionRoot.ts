import { ServiceContainer } from './contexts/ServiceContext';
import { createClienteService } from './services/factories/clienteServiceFactory';
import { createProdutoService } from './services/factories/produtoServiceFactory';
import { createServicoService } from './services/factories/servicoServiceFactory';
import { createVendedorService } from './services/factories/vendedorServiceFactory';
import { createEmbalagemService } from './services/factories/embalagemServiceFactory';
import { createOrdemServicoService } from './services/factories/ordemServicoServiceFactory';
import { createPedidoVendaService } from './services/factories/pedidoVendaServiceFactory';
import { createFaturaVendaService } from './services/factories/faturaVendaServiceFactory';
import { createNotaFiscalService } from './services/factories/notaFiscalServiceFactory';
import { createContasReceberService } from './services/factories/contasReceberServiceFactory';
import { createContasPagarService } from './services/factories/contasPagarServiceFactory';
import { createFluxoCaixaService } from './services/factories/fluxoCaixaServiceFactory';
import { createOrdemCompraService } from './services/factories/ordemCompraServiceFactory';
import { createEstoqueService } from './services/factories/estoqueServiceFactory';
import { createCrmService } from './services/factories/crmServiceFactory';
import { createComissoesService } from './services/factories/comissoesServiceFactory';
import { createDevolucaoVendaService } from './services/factories/devolucaoVendaServiceFactory';
import { createContratoService } from './services/factories/contratoServiceFactory';
import { createNotaEntradaService } from './services/factories/notaEntradaServiceFactory';
import { createCobrancasService } from './services/factories/cobrancasServiceFactory';
import { createRelatorioService } from './services/factories/relatorioServiceFactory';
import { createExpedicaoService } from './services/factories/expedicaoServiceFactory';
import { createConfiguracoesService } from './services/factories/configuracoesServiceFactory';
import { createCategoriaFinanceiraService } from './services/factories/categoriaFinanceiraServiceFactory';
import { createFormaPagamentoService } from './services/factories/formaPagamentoServiceFactory';
import { createDashboardService } from './services/factories/dashboardServiceFactory';
import { createPapelService } from './services/factories/papelServiceFactory';

// Use a factory to create the service container.
// This ensures that all dependencies are injected correctly and consistently.
export const serviceContainer: Omit<ServiceContainer, 'user'> = {
  cliente: createClienteService(),
  produto: createProdutoService(),
  servico: createServicoService(),
  vendedor: createVendedorService(),
  embalagem: createEmbalagemService(),
  ordemServico: createOrdemServicoService(),
  pedidoVenda: createPedidoVendaService(),
  faturaVenda: createFaturaVendaService(),
  notaFiscal: createNotaFiscalService(),
  contasReceber: createContasReceberService(),
  contasPagar: createContasPagarService(),
  fluxoCaixa: createFluxoCaixaService(),
  ordemCompra: createOrdemCompraService(),
  estoque: createEstoqueService(),
  crm: createCrmService(),
  comissoes: createComissoesService(),
  devolucaoVenda: createDevolucaoVendaService(),
  contrato: createContratoService(),
  notaEntrada: createNotaEntradaService(),
  cobrancas: createCobrancasService(),
  relatorio: createRelatorioService(),
  expedicao: createExpedicaoService(),
  configuracoes: createConfiguracoesService(),
  categoriaFinanceira: createCategoriaFinanceiraService(),
  formaPagamento: createFormaPagamentoService(),
  dashboard: createDashboardService(),
  papel: createPapelService(),
};
