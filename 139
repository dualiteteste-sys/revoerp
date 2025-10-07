import React from 'react';
import { 
  Home, Users, Package, Wrench, FileText, UserCheck, Box, ShoppingCart, 
  Receipt, Truck, RotateCcw, DollarSign, Wallet, CreditCard, ClipboardList,
  Warehouse, ArrowLeftRight, FileInput, BarChart3, HeartHandshake, Bot,
  Store, DraftingCompass, Percent, Banknote, FileClock, Handshake, BookUser, Settings, LifeBuoy
} from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  children?: MenuItem[];
  isExternal?: boolean;
  isDivider?: boolean;
  gradient?: string;
}

export const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard', gradient: 'from-blue-500 to-indigo-600' },
  {
    id: 'cadastros',
    label: 'Cadastros',
    icon: Users,
    gradient: 'from-green-500 to-teal-600',
    children: [
      { id: 'clientes', label: 'Clientes e Fornecedores', icon: Users, path: '/clientes' },
      { id: 'produtos', label: 'Produtos', icon: Package, path: '/produtos' },
      { id: 'servicos-cadastro', label: 'Serviços', icon: Wrench, path: '/servicos' },
      { id: 'vendedores', label: 'Vendedores', icon: UserCheck, path: '/vendedores' },
      { id: 'embalagens', label: 'Embalagens', icon: Box, path: '/embalagens' },
      { id: 'relatorios-cadastros', label: 'Relatórios', icon: FileText, path: '/cadastros/relatorios' }
    ]
  },
  {
    id: 'suprimentos',
    label: 'Suprimentos',
    icon: Warehouse,
    gradient: 'from-orange-500 to-amber-600',
    children: [
      { id: 'ordens-compra', label: 'Ordens de Compra', icon: ShoppingCart, path: '/ordens-compra' },
      { id: 'notas-entrada', label: 'Notas de Entrada', icon: FileInput, path: '/notas-entrada' },
      { id: 'controle-estoque', label: 'Controle de Estoques', icon: BarChart3, path: '/controle-estoque' },
      { id: 'relatorios-suprimentos', label: 'Relatórios', icon: FileText, path: '/suprimentos/relatorios' }
    ]
  },
  {
    id: 'vendas',
    label: 'Vendas',
    icon: ShoppingCart,
    gradient: 'from-red-500 to-rose-600',
    children: [
      { id: 'pedidos-vendas', label: 'Pedidos de Vendas', icon: ShoppingCart, path: '/pedidos-vendas' },
      { id: 'propostas-comerciais', label: 'Propostas Comerciais', icon: DraftingCompass, path: '/propostas-comerciais' },
      { id: 'crm', label: 'CRM', icon: HeartHandshake, path: '/crm' },
      { id: 'pdv', label: 'PDV', icon: Store, path: '/pdv' },
      { id: 'notas-fiscais', label: 'Notas Fiscais', icon: Receipt, path: '/notas-fiscais' },
      { id: 'expedicao', label: 'Expedição', icon: Truck, path: '/expedicao' },
      { id: 'comissoes', label: 'Comissões', icon: Percent, path: '/comissoes' },
      { id: 'automacoes', label: 'Painel de Automações', icon: Bot, path: '/automacoes' },
      { id: 'devolucao-venda', label: 'Devolução de Venda', icon: RotateCcw, path: '/devolucao-venda' },
      { id: 'relatorios-vendas', label: 'Relatórios', icon: FileText, path: '/vendas/relatorios' }
    ]
  },
  {
    id: 'servicos',
    label: 'Serviços',
    icon: Wrench,
    gradient: 'from-cyan-500 to-sky-600',
    children: [
      { id: 'ordens-servico', label: 'Ordens de Serviço', icon: ClipboardList, path: '/ordens-servico' },
      { id: 'contratos', label: 'Contratos', icon: Handshake, path: '/contratos' },
      { id: 'notas-servico', label: 'Notas de Serviço', icon: FileClock, path: '/notas-servico' },
      { id: 'cobrancas-servicos', label: 'Cobranças', icon: Banknote, path: '/servicos/cobrancas' },
      { id: 'relatorios-servicos', label: 'Relatórios', icon: FileText, path: '/servicos/relatorios' }
    ]
  },
  {
    id: 'financeiro',
    label: 'Financeiro',
    icon: DollarSign,
    gradient: 'from-emerald-500 to-lime-600',
    children: [
      { id: 'caixa', label: 'Caixa', icon: Wallet, path: '/caixa' },
      { id: 'contas-receber', label: 'Contas a Receber', icon: CreditCard, path: '/contas-receber' },
      { id: 'contas-pagar', label: 'Contas a Pagar', icon: CreditCard, path: '/contas-pagar' },
      { id: 'cobrancas-bancarias', label: 'Cobranças Bancárias', icon: Banknote, path: '/cobrancas-bancarias' },
      { id: 'extrato-bancario', label: 'Extrato Bancário', icon: BookUser, path: '/extrato-bancario' },
      { id: 'relatorios-financeiro', label: 'Relatórios', icon: FileText, path: '/financeiro/relatorios' }
    ]
  },
  { id: 'divider', label: '', icon: () => null, isDivider: true },
  { id: 'configuracoes', label: 'Configurações', icon: Settings, path: '/configuracoes', gradient: 'from-slate-500 to-gray-600' },
  { id: 'suporte', label: 'Suporte', icon: LifeBuoy, path: '/suporte', gradient: 'from-violet-500 to-purple-600' }
];
