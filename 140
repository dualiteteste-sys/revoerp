export interface PermissionItem {
  id: string;
  label: string;
  helpText: string;
}

export interface PermissionGroup {
  id: string;
  label: string;
  items: PermissionItem[];
}

export interface PermissionTab {
  id: string;
  label: string;
  groups: PermissionGroup[];
}

export const permissionsConfig: PermissionTab[] = [
  {
    id: 'cadastros',
    label: 'Cadastros',
    groups: [
      { id: 'group-cad-embalagens', label: 'Embalagens', items: [{ id: 'cad-embalagens', label: 'Acesso a embalagens', helpText: 'Acesso a cadastro e relatórios de embalagens.' }] },
      { id: 'group-cad-servicos', label: 'Serviços', items: [{ id: 'cad-servicos', label: 'Acesso a serviços', helpText: 'Gerencia itens de serviço no catálogo.' }] },
      {
        id: 'group-cad-produtos',
        label: 'Produtos',
        items: [
          { id: 'cad-produtos', label: 'Acesso a produtos', helpText: 'Permite visualizar e manter o cadastro de produtos.' },
          { id: 'cad-produtos-calc-volumes', label: 'Cálculo automático de volumes', helpText: 'Habilita cálculo de m³/embalagem no cadastro.' },
          { id: 'cad-produtos-rel-precos', label: 'Relatório de Preços dos Produtos', helpText: 'Acessa relatório comparativo de preços.' },
          { id: 'cad-produtos-editar-preco-lista', label: 'Editar preços direto na lista de preços', helpText: 'Permite alteração inline.' },
        ],
      },
      {
        id: 'group-cad-contatos',
        label: 'Clientes e Fornecedores',
        items: [
          { id: 'cad-contatos', label: 'Acesso a clientes e fornecedores', helpText: 'Cadastro de clientes/fornecedores.' },
          { id: 'cad-contatos-editar-limite-credito', label: 'Editar limite de crédito', helpText: 'Autoriza definir/alterar limite.' },
          { id: 'cad-contatos-exportar', label: 'Exportar dados de contatos', helpText: 'Permite exportação (CSV/Excel).' },
        ],
      },
      { id: 'group-cad-vendedores', label: 'Vendedores', items: [{ id: 'cad-vendedores', label: 'Acesso a vendedores', helpText: 'Gestão de cadastro de vendedores.' }] },
      { id: 'group-cad-outros', label: 'Outros', items: [{ id: 'cad-produtos-grade', label: 'Variações nos produtos (grade)', helpText: 'Habilita grade/atributos de variação.' }] },
    ],
  },
  {
    id: 'suprimentos',
    label: 'Suprimentos',
    groups: [
      {
        id: 'group-sup-estoque',
        label: 'Controle de Estoques',
        items: [
          { id: 'sup-estoque', label: 'Acesso ao módulo de estoque', helpText: 'Acesso aos menus de estoque.' },
          { id: 'sup-estoque-depositos', label: 'Depósitos de Estoque', helpText: 'Cadastro/consulta de depósitos.' },
          { id: 'sup-estoque-entradas-saidas', label: 'Entradas e Saídas de Estoque', helpText: 'Lançamentos e ajustes.' },
          { id: 'sup-estoque-saldos', label: 'Saldos em Estoque', helpText: 'Consulta de saldos por depósito.' },
          { id: 'sup-estoque-mais-circulacao', label: 'Produtos com Maior Circulação', helpText: 'Relatório de giro.' },
          { id: 'sup-estoque-sem-mov', label: 'Produtos sem Movimentação', helpText: 'Itens parados.' },
          { id: 'sup-estoque-abaixo-min', label: 'Produtos Abaixo do Estoque Mínimo', helpText: 'Alerta de ruptura.' },
          { id: 'sup-estoque-visao-financeira', label: 'Visão Financeira do Estoque', helpText: 'Valoração e custo médio.' },
          { id: 'sup-estoque-mov-produto', label: 'Movimentação de um Produto', helpText: 'Extrato por item.' },
        ],
      },
      {
        id: 'group-sup-ne',
        label: 'Notas de Entrada',
        items: [
          { id: 'sup-notas-entrada', label: 'Acesso a notas de entrada', helpText: 'Consultas e relatórios de compras.' },
          { id: 'sup-ne-por-operacao', label: 'NF de Compra por Operação', helpText: 'Relatório de NF por operação.' },
          { id: 'sup-ne-por-fornecedor', label: 'NF por Fornecedor', helpText: 'Relatório de NF por fornecedor.' },
          { id: 'sup-ne-por-produto', label: 'NF de Compra por Produto', helpText: 'Relatório de NF por produto.' },
          { id: 'sup-ne-evolucao', label: 'Evolução de NFs de Compra', helpText: 'Relatório de evolução de compras.' },
          { id: 'sup-ne-por-fornecedor-fantasia', label: 'NF por Fornecedor (Fantasia)', helpText: 'Relatório por nome fantasia.' },
          { id: 'sup-ne-rel-numeracao', label: 'Relatório de Numeração de NFs', helpText: 'Relatório de numeração.' },
        ],
      },
      {
        id: 'group-sup-oc',
        label: 'Ordens de Compra',
        items: [
          { id: 'sup-oc', label: 'Acesso ao módulo de OC', helpText: 'Acesso ao módulo de Ordens de Compra.' },
          { id: 'sup-oc-listagem', label: 'Ordens de Compra', helpText: 'Criar/editar/consultar OCs.' },
        ],
      },
      { id: 'group-sup-outros', label: 'Outros', items: [{ id: 'sup-produtos-preco-custo', label: 'Preço de custo nos produtos', helpText: 'Exibe custo no cadastro/consultas.' }] },
    ],
  },
  {
    id: 'vendas',
    label: 'Vendas',
    groups: [
        { id: 'group-ven-ecommerce', label: 'E-commerce', items: [{ id: 'ven-pedidos-ecommerce', label: 'Pedidos no e-commerce', helpText: 'Consulta/gestão de pedidos integrados.' }] },
        { id: 'group-ven-pedidos', label: 'Pedidos de Venda', items: [
            { id: 'ven-pedidos', label: 'Acesso a pedidos de venda', helpText: 'PV: criar, editar, faturar.' },
            { id: 'ven-pedidos-rel-producao', label: 'Relatório de Pedidos para Produção', helpText: 'Ordens/necessidades de produção.' },
        ]},
        { id: 'group-ven-expedicao', label: 'Expedição', items: [
            { id: 'ven-expedicao', label: 'Acesso a expedição', helpText: 'Picking/packing/romaneio.' },
            { id: 'ven-expedicao-relatorio', label: 'Relatório de expedição', helpText: 'Relatório de expedição.' },
        ]},
        { id: 'group-ven-nfs', label: 'Notas Fiscais (Vendas)', items: [
            { id: 'ven-nfs', label: 'Acesso a notas fiscais', helpText: 'Consultas e relatórios fiscais de saída.' },
            { id: 'ven-nfs-itens', label: 'Itens das NFs (consulta)', helpText: 'Consulta de itens das NFs.' },
            { id: 'ven-nfs-por-operacao', label: 'NFs por Operação', helpText: 'Relatório de NFs por operação.' },
            { id: 'ven-nfs-por-cliente', label: 'NFs por Cliente', helpText: 'Relatório de NFs por cliente.' },
            { id: 'ven-nfs-por-produto', label: 'NFs por Produto', helpText: 'Relatório de NFs por produto.' },
            { id: 'ven-nfs-evolucao-faturamento', label: 'Evolução do Faturamento', helpText: 'Relatório de evolução do faturamento.' },
            { id: 'ven-nfs-rel-numeracao', label: 'Relatório de Numeração de NFs', helpText: 'Relatório de numeração de NFs.' },
        ]},
        { id: 'group-ven-crm', label: 'CRM', items: [
            { id: 'ven-crm', label: 'Acesso ao CRM', helpText: 'Acesso ao módulo de CRM.' },
            { id: 'ven-crm-relatorio', label: 'Relatório CRM', helpText: 'Relatório de CRM.' },
        ]},
        { id: 'group-ven-pdv', label: 'PDV', items: [
            { id: 'ven-pdv', label: 'Acesso ao PDV', helpText: 'Acesso ao Ponto de Venda.' },
            { id: 'ven-pdv-caixa', label: 'Controle de Caixa do PDV', helpText: 'Controle de caixa do PDV.' },
            { id: 'ven-pdv-rel-caixa', label: 'Relatório de controle de caixa', helpText: 'Relatório de controle de caixa.' },
        ]},
        { id: 'group-ven-comissoes', label: 'Comissões', items: [{ id: 'ven-comissoes', label: 'Acesso a comissões', helpText: 'Consulta e fechamento de comissões.' }] },
        { id: 'group-ven-propostas', label: 'Propostas Comerciais', items: [
            { id: 'ven-propostas', label: 'Acesso a propostas', helpText: 'Gestão de propostas/orçamentos.' },
            { id: 'ven-propostas-lista', label: 'Propostas Comerciais (lista)', helpText: 'Listagem de propostas.' },
        ]},
        { id: 'group-ven-devolucoes', label: 'Devoluções de venda', items: [{ id: 'ven-devolucoes', label: 'Acesso a devoluções', helpText: 'Autoriza registrar devoluções.' }] },
        { id: 'group-ven-automacoes', label: 'Painel de Automações', items: [{ id: 'ven-painel-automacoes', label: 'Acesso ao painel', helpText: 'Acessa painel de automações.' }] },
        { id: 'group-ven-relatorios', label: 'Relatórios', items: [
            { id: 'ven-rel-vendas', label: 'Acesso a relatórios de vendas', helpText: 'Dash/relatórios de Vendas.' },
            { id: 'ven-rel-financeiro', label: 'Relatório Financeiro de Vendas', helpText: 'Relatório financeiro de vendas.' },
        ]},
    ]
  },
  {
    id: 'financas',
    label: 'Finanças',
    groups: [
      { id: 'group-fin-preferencias', label: 'Preferências', items: [{ id: 'fin-gateway', label: 'Gateway', helpText: 'Configurar meios de pagamento.' }] },
      { id: 'group-fin-cap', label: 'Contas a Pagar', items: [
          { id: 'fin-cap', label: 'Acesso a contas a pagar', helpText: 'Lançar/consultar despesas.' },
          { id: 'fin-cap-relatorio', label: 'Relatório de Contas a Pagar', helpText: 'Relatório de contas a pagar.' },
      ]},
      { id: 'group-fin-car', label: 'Contas a Receber', items: [
          { id: 'fin-car', label: 'Acesso a contas a receber', helpText: 'Lançar/consultar receitas.' },
          { id: 'fin-car-recebimentos', label: 'Recebimentos', helpText: 'Registrar recebimentos.' },
          { id: 'fin-car-relatorio', label: 'Relatório de Contas a Receber', helpText: 'Relatório de contas a receber.' },
      ]},
      { id: 'group-fin-caixa', label: 'Caixa', items: [
          { id: 'fin-caixa', label: 'Acesso ao caixa', helpText: 'Movimentação e conciliações.' },
          { id: 'fin-caixa-por-categoria', label: 'Entradas e Saídas por Categoria', helpText: 'Relatório por categoria.' },
          { id: 'fin-caixa-por-cliente', label: 'Entradas e Saídas por Cliente', helpText: 'Relatório por cliente.' },
      ]},
      { id: 'group-fin-cobrancas', label: 'Cobranças Bancárias', items: [{ id: 'fin-cobrancas', label: 'Acesso a cobranças', helpText: 'Gestão de boletos/arquivos.' }] },
      { id: 'group-fin-extratos', label: 'Extratos Bancários', items: [{ id: 'fin-extratos', label: 'Acesso a extratos', helpText: 'Consulta de extratos bancários.' }] },
      { id: 'group-fin-conta-digital', label: 'Conta Digital', items: [{ id: 'fin-conta-digital', label: 'Acesso a conta digital', helpText: 'Acesso a conta digital.' }] },
      { id: 'group-fin-relatorios', label: 'Relatórios', items: [
          { id: 'fin-rel-fluxo-caixa', label: 'Fluxo de Caixa', helpText: 'Relatório de fluxo de caixa.' },
          { id: 'fin-rel-balancete', label: 'Balancete', helpText: 'Relatório de balancete.' },
      ]},
      { id: 'group-fin-outros', label: 'Outros', items: [
          { id: 'fin-banco-inter', label: 'Banco Inter', helpText: 'Integração específica.' },
          { id: 'fin-fechamento', label: 'Fechamento do período financeiro', helpText: 'Fecha/abre competência.' },
      ]},
    ],
  },
  {
    id: 'servicos',
    label: 'Serviços',
    groups: [
        { id: 'group-srv-os', label: 'Ordens de Serviço', items: [
            { id: 'srv-os', label: 'Acesso a ordens de serviço', helpText: 'Autorização para OS.' },
            { id: 'srv-os-relatorio', label: 'Relatório de Ordens de Serviço', helpText: 'Relatório de OS.' },
        ]},
        { id: 'group-srv-ns', label: 'Notas de Serviço', items: [
            { id: 'srv-ns', label: 'Acesso a notas de serviço', helpText: 'Emissão/consulta.' },
            { id: 'srv-ns-relatorio', label: 'Relatório de Notas de Serviço', helpText: 'Relatório de NS.' },
        ]},
        { id: 'group-srv-contratos', label: 'Contratos', items: [
            { id: 'srv-contratos', label: 'Acesso a contratos', helpText: 'Gestão de contratos.' },
            { id: 'srv-contratos-inicio-fim', label: 'Início e Término de Contratos', helpText: 'Relatório de início e término.' },
            { id: 'srv-contratos-inicio-fim-mes', label: 'Início e Término por Mês', helpText: 'Relatório mensal.' },
        ]},
        { id: 'group-srv-cobrancas', label: 'Cobranças', items: [{ id: 'srv-cobrancas', label: 'Acesso a cobranças', helpText: 'Cobranças recorrentes/avulsas.' }] },
    ],
  },
  {
    id: 'ferramentas',
    label: 'Ferramentas',
    groups: [
        { id: 'group-fer-etiquetas', label: 'Etiquetas', items: [{ id: 'fer-etiq-config', label: 'Configuração de etiquetas', helpText: 'Define tipos/layouts de etiqueta.' }] },
        { id: 'group-fer-outros', label: 'Outros', items: [{ id: 'fer-imp-exp-dados', label: 'Importação e exportação de dados', helpText: 'Autoriza importar/exportar.' }] },
    ],
  },
  {
    id: 'outros',
    label: 'Outros',
    groups: [
        { id: 'group-outros', label: 'Outros', items: [
            { id: 'out-upgrade', label: 'Upgrade de Conta', helpText: 'Acesso à tela de upgrade/planos.' },
            { id: 'out-dashboard', label: 'Dashboard', helpText: 'Acesso ao painel inicial.' },
            { id: 'out-totalizadores-listagens', label: 'Habilitar totalizadores nas listagens', helpText: 'Mostra totais nas listas.' },
            { id: 'out-alterar-dados-empresa', label: 'Alterar Dados da Empresa', helpText: 'Atalho para tela de empresa.' },
            { id: 'out-minha-conta', label: 'Minha conta (ERP)', helpText: 'Preferências da conta.' },
            { id: 'out-nfse', label: 'NFSe', helpText: 'Notas Fiscais de Serviço (config/consulta).' },
            { id: 'out-importacao-nfe-xml', label: 'Importação de NFe via XML', helpText: 'Importer arquivos XML.' },
            { id: 'out-servidor-email', label: 'Configurações do Servidor de E-mail', helpText: 'SMTP/envio de documentos.' },
            { id: 'out-grupos-tags', label: 'Cadastro de Grupos de Tags', helpText: 'Gerir grupos.' },
            { id: 'out-tags', label: 'Cadastro de Tags', helpText: 'CRUD de tags.' },
            { id: 'out-importador-cadastros', label: 'Importador de Cadastros', helpText: 'Wizard de importação.' },
            { id: 'out-sigep-web', label: 'Sigep Web', helpText: 'Integração Correios.' },
            { id: 'out-nfe', label: 'Nota Fiscal Eletrônica', helpText: 'NFe geral.' },
            { id: 'out-api-ws', label: 'API para Web Services', helpText: 'Chaves/escopos de API.' },
            { id: 'out-intelipost', label: 'Integração com Intelipost', helpText: 'Gateway de frete/logística.' },
            { id: 'out-usuarios', label: 'Usuários', helpText: 'Gerir contas/convites.' },
            { id: 'out-pagamentos', label: 'Pagamentos', helpText: 'Central de pagamentos.' },
            { id: 'out-emissao-boletos', label: 'Emissão de Boletos', helpText: 'Gerar boletos.' },
        ]}
    ],
  },
];
