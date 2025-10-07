import {
  SlidersHorizontal,
  Users,
  Warehouse,
  ShoppingCart,
  Receipt,
  DollarSign,
  Wrench,
  Store,
  Icon,
  KeyRound,
} from 'lucide-react';

export interface SettingsMenuItem {
  id: string;
  label: string;
  icon: Icon;
  children: {
    id: string;
    label: string;
    path: string;
    children?: {
      id: string;
      label: string;
      path: string;
    }[];
  }[];
}

export const settingsMenuItems: SettingsMenuItem[] = [
  {
    id: 'geral',
    label: 'Geral',
    icon: SlidersHorizontal,
    children: [
      { id: 'alterar-dados-empresa', label: 'Alterar dados da empresa', path: '/configuracoes/geral/alterar-dados-da-empresa' },
      { id: 'usuarios', label: 'Usuários e permissões', path: '/configuracoes/geral/usuarios' },
      { id: 'papeis-permissoes', label: 'Papéis e Permissões', path: '/configuracoes/geral/papeis-e-permissoes' },
      { id: 'servidor-email', label: 'Configurações do servidor de e-mail', path: '/configuracoes/geral/servidor-de-email' },
      { id: 'envio-documentos', label: 'Configurações do envio de documentos', path: '/configuracoes/geral/envio-de-documentos' },
      { id: 'etiquetas', label: 'Configurações das etiquetas', path: '/configuracoes/geral/etiquetas' },
      { id: 'agenda', label: 'Configurações da agenda', path: '/configuracoes/geral/agenda' },
      { id: 'cancelamento-conta', label: 'Solicitar cancelamento da conta', path: '/configuracoes/geral/cancelamento-da-conta' },
      {
        id: 'outras-configuracoes',
        label: 'Outras configurações',
        path: '#',
        children: [
          { id: 'interface-usuario', label: 'Interface do usuário', path: '/configuracoes/geral/interface-do-usuario' },
          { id: 'token-api', label: 'Token API', path: '/configuracoes/geral/token-api' },
          { id: 'configuracoes-api', label: 'Configurações de API', path: '/configuracoes/geral/configuracoes-de-api' },
        ],
      },
    ],
  },
  {
    id: 'cadastros',
    label: 'Cadastros',
    icon: Users,
    children: [
      { id: 'clientes', label: 'Configurações do cadastro de clientes', path: '/configuracoes/cadastros/clientes' },
      { id: 'produtos', label: 'Configurações do cadastro de produtos', path: '/configuracoes/cadastros/produtos' },
      { id: 'variacoes-produtos', label: 'Configurações de variações de produtos', path: '/configuracoes/cadastros/variacoes-de-produtos' },
      { id: 'atributos-produtos', label: 'Configurações de atributos de produtos', path: '/configuracoes/cadastros/atributos-de-produtos' },
      { id: 'marcas-produtos', label: 'Configurações de marcas de produtos', path: '/configuracoes/cadastros/marcas-de-produtos' },
      { id: 'tabelas-medidas', label: 'Tabelas de medidas', path: '/configuracoes/cadastros/tabelas-de-medidas' },
      { id: 'tags', label: 'Configurações das tags', path: '/configuracoes/cadastros/tags' },
      { id: 'tipos-contato', label: 'Tipos de contato', path: '/configuracoes/cadastros/tipos-de-contato' },
      { id: 'linhas-produto', label: 'Linhas de produto', path: '/configuracoes/cadastros/linhas-de-produto' },
    ],
  },
  {
    id: 'suprimentos',
    label: 'Suprimentos',
    icon: Warehouse,
    children: [
      { id: 'depositos-estoque', label: 'Depósitos de estoque', path: '/configuracoes/suprimentos/depositos-de-estoque' },
      { id: 'estoque', label: 'Configurações de estoque', path: '/configuracoes/suprimentos/estoque' },
      { id: 'envio-documentos-suprimentos', label: 'Configurações do envio de documentos', path: '/configuracoes/suprimentos/envio-de-documentos' },
      { id: 'marcadores-oc', label: 'Configurações dos marcadores nas ordens de compra', path: '/configuracoes/suprimentos/marcadores-oc' },
      { id: 'ordens-compra', label: 'Configurações de ordens de compra', path: '/configuracoes/suprimentos/ordens-de-compra' },
    ],
  },
  {
    id: 'vendas',
    label: 'Vendas',
    icon: ShoppingCart,
    children: [
        { id: 'pdv', label: 'Configurações do PDV', path: '/configuracoes/vendas/pdv' },
        { id: 'propostas-comerciais', label: 'Configurações das propostas comerciais', path: '/configuracoes/vendas/propostas-comerciais' },
        { id: 'pedidos-venda', label: 'Configurações dos pedidos de venda', path: '/configuracoes/vendas/pedidos-de-venda' },
        { id: 'envio-documentos-vendas', label: 'Configurações do envio de documentos', path: '/configuracoes/vendas/envio-de-documentos' },
        { id: 'marcadores-nas-vendas', label: 'Configurações dos marcadores nas vendas', path: '/configuracoes/vendas/marcadores-nas-vendas' },
        { id: 'marcadores-nas-propostas', label: 'Configurações dos marcadores nas propostas comerciais', path: '/configuracoes/vendas/marcadores-nas-propostas' },
        { id: 'marcadores-nas-devolucoes', label: 'Configurações dos marcadores nas devoluções de vendas', path: '/configuracoes/vendas/marcadores-nas-devolucoes' },
        { id: 'devolucoes-vendas', label: 'Configurações das devoluções de vendas', path: '/configuracoes/vendas/devolucoes-de-vendas' },
        {
            id: 'expedicao-logistica',
            label: 'Expedição e Logística',
            path: '#',
            children: [
                { id: 'formas-envio', label: 'Formas de envio', path: '/configuracoes/vendas/expedicao/formas-de-envio' },
                { id: 'configuracoes-expedicao', label: 'Configurações da expedição', path: '/configuracoes/vendas/expedicao/configuracoes' },
                { id: 'intelipost', label: 'Configurações da Intelipost', path: '/configuracoes/vendas/expedicao/intelipost' },
            ]
        },
        {
            id: 'crm',
            label: 'CRM',
            path: '#',
            children: [
                { id: 'configuracoes-crm', label: 'Configurações do CRM', path: '/configuracoes/vendas/crm/configuracoes' },
                { id: 'marcadores-crm', label: 'Configurações dos marcadores no CRM', path: '/configuracoes/vendas/crm/marcadores' },
                { id: 'estagios-crm', label: 'Configurações dos estágios no funil do CRM', path: '/configuracoes/vendas/crm/estagios' },
            ]
        }
    ]
  },
  {
    id: 'notas-fiscais',
    label: 'Notas fiscais',
    icon: Receipt,
    children: [
        {
            id: 'configuracoes-gerais-nf',
            label: 'Configurações gerais',
            path: '#',
            children: [
                { id: 'dados-empresa-nf', label: 'Dados da empresa', path: '/configuracoes/notas-fiscais/dados-da-empresa' },
                { id: 'certificado-digital', label: 'Configuração do certificado digital', path: '/configuracoes/notas-fiscais/certificado-digital' },
                { id: 'ambiente-nf', label: 'Ambiente das notas fiscais', path: '/configuracoes/notas-fiscais/ambiente' },
                { id: 'naturezas-entrada', label: 'Naturezas de operação de entrada (tributação)', path: '/configuracoes/notas-fiscais/naturezas-entrada' },
                { id: 'naturezas-saida', label: 'Naturezas de operação de saída (tributação)', path: '/configuracoes/notas-fiscais/naturezas-saida' },
            ]
        },
        {
            id: 'nf-venda',
            label: 'Notas fiscais de venda',
            path: '#',
            children: [
                { id: 'config-nfe', label: 'Configuração da NFe', path: '/configuracoes/notas-fiscais/venda/nfe' },
                { id: 'difal-nao-contribuinte', label: 'ICMS DIFAL para não contribuinte', path: '/configuracoes/notas-fiscais/venda/difal-nao-contribuinte' },
                { id: 'difal-st', label: 'Cálculo diferenciado de ST para consumidor contribuintes – DIFAL', path: '/configuracoes/notas-fiscais/venda/difal-st' },
                { id: 'intermediadores', label: 'Cadastro de intermediadores', path: '/configuracoes/notas-fiscais/venda/intermediadores' },
                { id: 'marcadores-nf-saida', label: 'Marcadores nas notas de saída', path: '/configuracoes/notas-fiscais/venda/marcadores' },
            ]
        },
        {
            id: 'nf-entrada',
            label: 'Notas fiscais de entrada',
            path: '#',
            children: [
                { id: 'config-nf-entrada', label: 'Configuração das notas de entrada', path: '/configuracoes/notas-fiscais/entrada/configuracoes' },
                { id: 'marcadores-nf-entrada', label: 'Marcadores nas notas de entrada', path: '/configuracoes/notas-fiscais/entrada/marcadores' },
            ]
        },
        {
            id: 'nf-servico',
            label: 'Notas fiscais de serviço',
            path: '#',
            children: [
                { id: 'config-nfse', label: 'Configuração da NFSe', path: '/configuracoes/notas-fiscais/servico/nfse' },
                { id: 'marcadores-nf-servico', label: 'Marcadores nas notas de serviço', path: '/configuracoes/notas-fiscais/servico/marcadores' },
            ]
        }
    ]
  },
  {
    id: 'financas',
    label: 'Finanças',
    icon: DollarSign,
    children: [
      { id: 'geral-financas', label: 'Configurações gerais', path: '/configuracoes/financas/geral' },
      { id: 'categorias', label: 'Categorias de receita e despesa', path: '/configuracoes/financas/categorias' },
      { id: 'formas-pagamento', label: 'Formas de pagamento', path: '/configuracoes/financas/formas-de-pagamento' },
      { id: 'contas-bancarias', label: 'Cadastro de contas bancárias', path: '/configuracoes/financas/contas-bancarias' },
      { id: 'gateways', label: 'Cadastro de gateways', path: '/configuracoes/financas/gateways' },
      { id: 'contas-financeiras', label: 'Cadastro de contas financeiras', path: '/configuracoes/financas/contas-financeiras' },
      { id: 'contas-pagar', label: 'Configurações do contas a pagar', path: '/configuracoes/financas/contas-a-pagar' },
      { id: 'contas-receber', label: 'Configurações do contas a receber', path: '/configuracoes/financas/contas-a-receber' },
      { id: 'envio-documentos-financas', label: 'Configurações do envio de documentos', path: '/configuracoes/financas/envio-de-documentos' },
      { id: 'marcadores-caixa', label: 'Marcadores no caixa', path: '/configuracoes/financas/marcadores-caixa' },
      { id: 'marcadores-cap', label: 'Marcadores nas contas a pagar', path: '/configuracoes/financas/marcadores-cap' },
      { id: 'marcadores-car', label: 'Marcadores nas contas a receber', path: '/configuracoes/financas/marcadores-car' },
    ],
  },
  {
    id: 'servicos',
    label: 'Serviços',
    icon: Wrench,
    children: [
      { id: 'ordens-servico', label: 'Configurações das ordens de serviço', path: '/configuracoes/servicos/ordens-de-servico' },
      { id: 'contratos', label: 'Configurações dos contratos', path: '/configuracoes/servicos/contratos' },
      { id: 'envio-documentos-servicos', label: 'Configurações do envio de documentos', path: '/configuracoes/servicos/envio-de-documentos' },
      { id: 'marcadores-os', label: 'Marcadores nas ordens de serviço', path: '/configuracoes/servicos/marcadores-os' },
      { id: 'marcadores-contratos', label: 'Marcadores nos contratos', path: '/configuracoes/servicos/marcadores-contratos' },
      { id: 'cnaes', label: 'Cadastro de CNAEs', path: '/configuracoes/servicos/cnaes' },
      { id: 'campos-adicionais-os', label: 'Campos adicionais para ordens de serviço', path: '/configuracoes/servicos/campos-adicionais-os' },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: Store,
    children: [
      { id: 'geral-ecommerce', label: 'Configurações gerais', path: '/configuracoes/ecommerce/geral' },
      { id: 'integracoes', label: 'Integrações', path: '/configuracoes/ecommerce/integracoes' },
      { id: 'token-api-ecommerce', label: 'Token API', path: '/configuracoes/ecommerce/token-api' },
    ],
  },
];
