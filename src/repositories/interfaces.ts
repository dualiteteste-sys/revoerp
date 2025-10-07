import {
		  Cliente, Anexo, Produto, ProdutoImagem, Servico, Vendedor, Embalagem, OrdemServico,
		  PedidoVenda, PedidoVendaItem, FaturaVenda, ContaReceber, ContaPagar, FluxoCaixa,
		  OrdemCompra, OrdemCompraItem, ProdutoComEstoque, EstoqueMovimento, CrmOportunidade,
		  Comissao, DevolucaoVenda, DevolucaoVendaItem, Contrato, ContratoAnexo, NotaEntrada,
		  NotaEntradaItem, DREMensal, Expedicao, ContaPagarAnexo, ContaReceberAnexo,
		  CategoriaFinanceira, FormaPagamento, DashboardStats, FaturamentoMensal, Papel
		} from '../types';
		import { Empresa } from '../types/empresa';
		import { IRepository } from '../types/base';
		import { VisaoCobranca } from '../repositories/CobrancasRepository';

		// --- REPOSITORIES ---

		export interface IConfiguracoesRepository extends IRepository<Empresa> {
		  findFirst(): Promise<Empresa | null>;
		  uploadLogo(file: File): Promise<string>;
		  create(data: Partial<Empresa>, userId: string): Promise<Empresa>;
		}

		export interface IClienteRepository extends IRepository<Cliente> {
		  search(query: string, type: 'cliente' | 'fornecedor'): Promise<Pick<Cliente, 'id' | 'nome'>[]>;
		  uploadAnexo(clienteId: string, file: File): Promise<string>;
		  deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		  supabase: any;
		}
		export interface IProdutoRepository extends IRepository<Produto> {
		  search(query: string): Promise<Pick<Produto, 'id' | 'nome' | 'precoVenda' | 'codigo' | 'unidade'>[]>;
		  uploadImagem(produtoId: string, file: File): Promise<string>;
		  deleteImagem(imagemId: string, filePath: string): Promise<void>;
		  supabase: any;
		}
		export interface IServicoRepository extends IRepository<Servico> {}
		export interface IVendedorRepository extends IRepository<Vendedor> {
		  search(query: string): Promise<Pick<Vendedor, 'id' | 'nome'>[]>;
		  getPermissions(userId: string): Promise<string[]>;
		  setPermissions(userId: string, permissions: string[]): Promise<void>;
		}
		export interface IEmbalagemRepository extends IRepository<Embalagem> {}
		export interface IOrdemServicoRepository extends IRepository<OrdemServico> {}
		export interface IPedidoVendaRepository extends IRepository<PedidoVenda> {
		    createWithItems(pedidoData: Partial<Omit<PedidoVenda, 'id' | 'createdAt' | 'updatedAt'>>, itensData: Omit<any, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]): Promise<PedidoVenda>;
		}
		export interface IFaturaVendaRepository extends IRepository<FaturaVenda> {}
		export interface INotaFiscalRepository extends IRepository<FaturaVenda> {}
		export interface IContasReceberRepository extends IRepository<ContaReceber> {
		  findByCompetencia(competencia: string): Promise<Pick<ContaReceber, 'id' | 'contratoId' | 'dataVencimento'>[]>;
		  uploadAnexo(contaId: string, file: File): Promise<string>;
		  deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		  supabase: any;
		}
		export interface IContasPagarRepository extends IRepository<ContaPagar> {
		    uploadAnexo(contaId: string, file: File): Promise<string>;
		    deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		    supabase: any;
		}
		export interface IFluxoCaixaRepository extends IRepository<FluxoCaixa> {}
		export interface IOrdemCompraRepository extends IRepository<OrdemCompra> {
		    createWithItems(ordemData: Partial<Omit<OrdemCompra, 'id' | 'createdAt' | 'updatedAt'>>, itensData: Omit<any, 'id' | 'createdAt' | 'updatedAt' | 'ordemCompraId'>[]): Promise<OrdemCompra>;
		    supabase: any;
		}
		export interface IEstoqueRepository {
		    findAll(options?: { page?: number; pageSize?: number }): Promise<{ data: ProdutoComEstoque[]; count: number }>;
		    findHistoryByProductId(produtoId: string): Promise<EstoqueMovimento[]>;
		    createMovimento(movimento: Omit<EstoqueMovimento, 'id' | 'createdAt' | 'updatedAt'>): Promise<EstoqueMovimento>;
		}
		export interface ICrmRepository extends IRepository<CrmOportunidade> {}
		export interface IComissoesRepository {
		    findAll(options?: { page?: number; pageSize?: number }): Promise<{ data: Comissao[]; count: number }>;
		}
		export interface IDevolucaoVendaRepository extends IRepository<DevolucaoVenda> {
		    createWithItems(devolucaoData: Omit<DevolucaoVenda, 'id' | 'createdAt' | 'updatedAt' | 'itens'>, itensData: Omit<any, 'id' | 'createdAt' | 'updatedAt' | 'devolucaoVendaId'>[]): Promise<DevolucaoVenda>;
		}
		export interface IContratoRepository extends IRepository<Contrato> {
		    uploadAnexo(contratoId: string, file: File): Promise<string>;
		    deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		    supabase: any;
		}
		export interface INotaEntradaRepository extends IRepository<NotaEntrada> {
		    createWithItems(notaData: Omit<NotaEntrada, 'id' | 'createdAt' | 'updatedAt' | 'itens'>, itensData: Omit<any, 'id' | 'createdAt' | 'updatedAt' | 'notaEntradaId'>[]): Promise<NotaEntrada>;
		    supabase: any;
		}
		export interface ICobrancasRepository extends IRepository<ContaReceber> {
		    getVisaoCobrancas(competencia: string): Promise<VisaoCobranca[]>;
		    getContratosParaFaturar(competencia: string): Promise<Contrato[]>;
		    supabase: any;
		}
		export interface IRelatorioRepository {
		    getDREMensal(): Promise<DREMensal[]>;
		}
		export interface IExpedicaoRepository extends IRepository<any> {
		    findPedidosParaExpedir(formaEnvio: string, incluirSemForma: boolean): Promise<PedidoVenda[]>;
		    gerarExpedicao(expedicaoData: Omit<Expedicao, 'id' | 'createdAt' | 'updatedAt'>, pedidoIds: string[]): Promise<Expedicao>;
		}
		export interface ICategoriaFinanceiraRepository extends IRepository<CategoriaFinanceira> {}
		export interface IFormaPagamentoRepository extends IRepository<FormaPagamento> {}
		export interface IDashboardRepository {
		    getDashboardStats(empresaId: string): Promise<DashboardStats>;
		    getFaturamentoMensal(empresaId: string): Promise<FaturamentoMensal[]>;
		}
		export interface IPapelRepository extends IRepository<Papel> {
		  getPermissions(papelId: string): Promise<string[]>;
		  setPermissions(papelId: string, permissionIds: string[]): Promise<void>;
		}


		// --- SERVICES ---

		export interface IConfiguracoesService {
		  getEmpresaData(): Promise<Empresa | null>;
		  saveEmpresaData(data: Partial<Empresa>, logoFile?: File | null, userId?: string): Promise<Empresa>;
		  getAll(options?: { page?: number; pageSize?: number }): Promise<{ data: Empresa[]; count: number }>;
		  findById(id: string): Promise<Empresa | null>;
		  create(data: Partial<Empresa>, userId: string): Promise<Empresa>;
		  update(id: string, data: Partial<Empresa>): Promise<Empresa>;
		  delete(id: string): Promise<void>;
		}

		export interface IClienteService extends IRepository<Cliente> {
		  search(query: string, type: 'cliente' | 'fornecedor'): Promise<Pick<Cliente, 'id' | 'nome'>[]>;
		  uploadAnexo(clienteId: string, file: File): Promise<Anexo>;
		  deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		  getAnexoPublicUrl(filePath: string): string;
		}
		export interface IProdutoService extends IRepository<Produto> {
		  search(query: string): Promise<Pick<Produto, 'id' | 'nome' | 'precoVenda' | 'codigo' | 'unidade'>[]>;
		  uploadImagem(produtoId: string, file: File): Promise<ProdutoImagem>;
		  deleteImagem(imagemId: string, filePath: string): Promise<void>;
		  getImagemPublicUrl(filePath: string): string;
		}
		export interface IServicoService extends IRepository<Servico> {}
		export interface IVendedorService extends IRepository<Vendedor> {
		  search(query: string): Promise<Pick<Vendedor, 'id' | 'nome'>[]>;
		  getPermissions(userId: string): Promise<string[]>;
		  setPermissions(userId: string, permissions: string[]): Promise<void>;
		}
		export interface IEmbalagemService extends IRepository<Embalagem> {}
		export interface IOrdemServicoService {
		  getAllOrdensServico(): Promise<OrdemServico[]>;
		  createOrdemServico(data: Partial<Omit<OrdemServico, 'id' | 'createdAt' | 'updatedAt'>>): Promise<OrdemServico>;
		  updateOrdemServico(id: string, data: Partial<OrdemServico>): Promise<OrdemServico>;
		}
		export interface IPedidoVendaService {
		  getAllPedidosVenda(options?: { page?: number; pageSize?: number }): Promise<{ data: PedidoVenda[]; count: number }>;
		  createPedidoVenda(pedidoData: Partial<Omit<PedidoVenda, 'id' | 'createdAt' | 'updatedAt'>>, itensData: Omit<PedidoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]): Promise<PedidoVenda>;
		}
		export interface IFaturaVendaService {
		  getAllFaturas(options?: { page?: number; pageSize?: number }): Promise<{ data: FaturaVenda[]; count: number }>;
		  faturarPedido(pedidoId: string): Promise<FaturaVenda>;
		}
		export interface INotaFiscalService {
		  getAllFaturas(options?: { page?: number; pageSize?: number }): Promise<{ data: FaturaVenda[]; count: number }>;
		}
		export interface IContasReceberService {
		    getAllContasReceber(options?: { page?: number; pageSize?: number }): Promise<{ data: ContaReceber[]; count: number }>;
		    createContaReceber(data: Partial<Omit<ContaReceber, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ContaReceber>;
		    updateContaReceber(id: string, data: Partial<ContaReceber>): Promise<ContaReceber>;
		    liquidarConta(id: string): Promise<ContaReceber>;
		    uploadAnexo(contaId: string, file: File): Promise<ContaReceberAnexo>;
		    deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		    getAnexoPublicUrl(filePath: string): string;
		}
		export interface IContasPagarService {
		    getAllContasPagar(): Promise<ContaPagar[]>;
		    createContaPagar(data: Partial<Omit<ContaPagar, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ContaPagar>;
		    updateContaPagar(id: string, data: Partial<ContaPagar>): Promise<ContaPagar>;
		    liquidarConta(id: string): Promise<ContaPagar>;
		    uploadAnexo(contaId: string, file: File): Promise<ContaPagarAnexo>;
		    deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		    getAnexoPublicUrl(filePath: string): string;
		}
		export interface IFluxoCaixaService {
		    getAllMovimentacoes(): Promise<FluxoCaixa[]>;
		}
		export interface IOrdemCompraService {
		    getAll(options?: { page?: number; pageSize?: number }): Promise<{ data: OrdemCompra[]; count: number }>;
		    createWithItems(ordemData: Partial<Omit<OrdemCompra, 'id' | 'createdAt' | 'updatedAt'>>, itensData: Omit<OrdemCompraItem, 'id' | 'createdAt' | 'updatedAt' | 'ordemCompraId'>[]): Promise<OrdemCompra>;
		}
		export interface IEstoqueService {
		    getProdutosComEstoque(options?: { page?: number; pageSize?: number }): Promise<{ data: ProdutoComEstoque[]; count: number }>;
		    getHistoricoProduto(produtoId: string): Promise<EstoqueMovimento[]>;
		    createMovimento(movimento: Omit<EstoqueMovimento, 'id' | 'createdAt' | 'updatedAt'>): Promise<EstoqueMovimento>;
		}
		export interface ICrmService extends IRepository<CrmOportunidade> {}
		export interface IComissoesService {
		    getAll(options?: { page?: number; pageSize?: number }): Promise<{ data: Comissao[]; count: number }>;
		}
		export interface IDevolucaoVendaService {
		    getAll(options?: { page?: number; pageSize?: number }): Promise<{ data: DevolucaoVenda[]; count: number }>;
		    create(devolucaoData: Omit<DevolucaoVenda, 'id' | 'createdAt' | 'updatedAt' | 'itens'>, itensData: Omit<DevolucaoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'devolucaoVendaId'>[]): Promise<DevolucaoVenda>;
		}
		export interface IContratoService extends IRepository<Contrato> {
		    uploadAnexo(contratoId: string, file: File): Promise<ContratoAnexo>;
		    deleteAnexo(anexoId: string, filePath: string): Promise<void>;
		    getAnexoPublicUrl(filePath: string): string;
		}
		export interface INotaEntradaService {
		    getAll(options?: { page?: number; pageSize?: number }): Promise<{ data: NotaEntrada[]; count: number }>;
		    create(notaData: Omit<NotaEntrada, 'id' | 'createdAt' | 'updatedAt' | 'itens' | 'status'>, itensData: Omit<NotaEntradaItem, 'id' | 'createdAt' | 'updatedAt' | 'notaEntradaId'>[]): Promise<NotaEntrada>;
		    finalizarNota(notaId: string): Promise<void>;
		}
		export interface ICobrancasService {
		    getVisaoCobrancas(competencia: string): Promise<VisaoCobranca[]>;
		    gerarCobrancas(competencia: string): Promise<{ geradas: number; existentes: number }>;
		    enviarBoletos(cobrancasIds: string[]): Promise<void>;
		}
		export interface IRelatorioService {
		    getDREMensal(): Promise<DREMensal[]>;
		}
		export interface IExpedicaoService {
		    getPedidosParaExpedir(formaEnvio: string, incluirSemForma: boolean): Promise<PedidoVenda[]>;
		    gerarExpedicao(formaEnvio: string, pedidoIds: string[]): Promise<Expedicao>;
		}
		export interface ICategoriaFinanceiraService extends IRepository<CategoriaFinanceira> {}
		export interface IFormaPagamentoService extends IRepository<FormaPagamento> {}
		export interface IDashboardService {
		    getDashboardStats(empresaId: string): Promise<DashboardStats>;
		    getFaturamentoMensal(empresaId: string): Promise<FaturamentoMensal[]>;
		}
		export interface IPapelService extends IRepository<Papel> {
		  getPermissions(papelId: string): Promise<string[]>;
		  setPermissions(papelId: string, permissionIds: string[]): Promise<void>;
		}
