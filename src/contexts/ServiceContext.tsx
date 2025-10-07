import React, { createContext, ReactNode } from 'react';
import { serviceContainer } from '../compositionRoot';
import { 
  IClienteService, IProdutoService, IServicoService, IVendedorService, 
  IEmbalagemService, IOrdemServicoService, IPedidoVendaService, IFaturaVendaService, 
  INotaFiscalService, IContasReceberService, IContasPagarService, IFluxoCaixaService, 
  IOrdemCompraService, IEstoqueService, ICrmService, IComissoesService, 
  IDevolucaoVendaService, IContratoService, INotaEntradaService, ICobrancasService, 
  IRelatorioService, IExpedicaoService, IConfiguracoesService, ICategoriaFinanceiraService, 
  IFormaPagamentoService, IDashboardService
} from '../services/interfaces';

export interface ServiceContainer {
  cliente: IClienteService;
  produto: IProdutoService;
  servico: IServicoService;
  vendedor: IVendedorService;
  embalagem: IEmbalagemService;
  ordemServico: IOrdemServicoService;
  pedidoVenda: IPedidoVendaService;
  faturaVenda: IFaturaVendaService;
  notaFiscal: INotaFiscalService;
  contasReceber: IContasReceberService;
  contasPagar: IContasPagarService;
  fluxoCaixa: IFluxoCaixaService;
  ordemCompra: IOrdemCompraService;
  estoque: IEstoqueService;
  crm: ICrmService;
  comissoes: IComissoesService;
  devolucaoVenda: IDevolucaoVendaService;
  contrato: IContratoService;
  notaEntrada: INotaEntradaService;
  cobrancas: ICobrancasService;
  relatorio: IRelatorioService;
  expedicao: IExpedicaoService;
  configuracoes: IConfiguracoesService;
  categoriaFinanceira: ICategoriaFinanceiraService;
  formaPagamento: IFormaPagamentoService;
  dashboard: IDashboardService;
}

export const ServiceContext = createContext<Omit<ServiceContainer, 'user'>>(serviceContainer);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ServiceContext.Provider value={serviceContainer}>
      {children}
    </ServiceContext.Provider>
  );
};
