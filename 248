import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SettingsLayout from '../../layouts/SettingsLayout';
import { RouteErrorBoundary } from '../../components/ui/RouteErrorBoundary';

const DadosEmpresa = lazy(() => import('./DadosEmpresa'));
const ServidorEmail = lazy(() => import('./ServidorEmail'));
const SettingsPlaceholder = lazy(() => import('./SettingsPlaceholder'));
const CategoriasFinanceiras = lazy(() => import('./CategoriasFinanceiras'));
const FormasPagamento = lazy(() => import('./FormasPagamento'));
const Usuarios = lazy(() => import('./Usuarios'));
const Papeis = lazy(() => import('./Papeis'));
const UsuarioPermissoes = lazy(() => import('./UsuarioPermissoes'));

const SettingsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<SettingsLayout />} errorElement={<RouteErrorBoundary />}>
        <Route path="/" element={<Navigate to="geral/alterar-dados-da-empresa" replace />} />
        
        {/* Geral */}
        <Route path="geral/alterar-dados-da-empresa" element={<DadosEmpresa />} />
        <Route path="geral/usuarios" element={<Usuarios />} />
        <Route path="geral/papeis-e-permissoes" element={<Papeis />} />
        <Route path="geral/usuarios/:id/permissoes" element={<UsuarioPermissoes />} />
        <Route path="geral/servidor-de-email" element={<ServidorEmail />} />
        <Route path="geral/envio-de-documentos" element={<SettingsPlaceholder title="Configurações do Envio de Documentos" />} />
        <Route path="geral/etiquetas" element={<SettingsPlaceholder title="Configurações das Etiquetas" />} />
        <Route path="geral/agenda" element={<SettingsPlaceholder title="Configurações da Agenda" />} />
        <Route path="geral/cancelamento-da-conta" element={<SettingsPlaceholder title="Solicitar Cancelamento da Conta" />} />
        <Route path="geral/interface-do-usuario" element={<SettingsPlaceholder title="Interface do Usuário" />} />
        <Route path="geral/token-api" element={<SettingsPlaceholder title="Token API" />} />
        <Route path="geral/configuracoes-de-api" element={<SettingsPlaceholder title="Configurações de API" />} />

        {/* Cadastros */}
        <Route path="cadastros/clientes" element={<SettingsPlaceholder title="Configurações do Cadastro de Clientes" />} />
        <Route path="cadastros/produtos" element={<SettingsPlaceholder title="Configurações do Cadastro de Produtos" />} />
        <Route path="cadastros/variacoes-de-produtos" element={<SettingsPlaceholder title="Configurações de Variações de Produtos" />} />
        <Route path="cadastros/atributos-de-produtos" element={<SettingsPlaceholder title="Configurações de Atributos de Produtos" />} />
        <Route path="cadastros/marcas-de-produtos" element={<SettingsPlaceholder title="Configurações de Marcas de Produtos" />} />
        <Route path="cadastros/tabelas-de-medidas" element={<SettingsPlaceholder title="Tabelas de Medidas" />} />
        <Route path="cadastros/tags" element={<SettingsPlaceholder title="Configurações das Tags" />} />
        <Route path="cadastros/tipos-de-contato" element={<SettingsPlaceholder title="Tipos de Contato" />} />
        <Route path="cadastros/linhas-de-produto" element={<SettingsPlaceholder title="Linhas de Produto" />} />

        {/* Suprimentos */}
        <Route path="suprimentos/depositos-de-estoque" element={<SettingsPlaceholder title="Depósitos de Estoque" />} />
        <Route path="suprimentos/estoque" element={<SettingsPlaceholder title="Configurações de Estoque" />} />
        <Route path="suprimentos/envio-de-documentos" element={<SettingsPlaceholder title="Configurações do Envio de Documentos (Suprimentos)" />} />
        <Route path="suprimentos/marcadores-oc" element={<SettingsPlaceholder title="Configurações dos Marcadores nas Ordens de Compra" />} />
        <Route path="suprimentos/ordens-de-compra" element={<SettingsPlaceholder title="Configurações de Ordens de Compra" />} />

        {/* Vendas */}
        <Route path="vendas/pdv" element={<SettingsPlaceholder title="Configurações do PDV" />} />
        <Route path="vendas/propostas-comerciais" element={<SettingsPlaceholder title="Configurações das Propostas Comerciais" />} />
        <Route path="vendas/pedidos-de-venda" element={<SettingsPlaceholder title="Configurações dos Pedidos de Venda" />} />
        <Route path="vendas/envio-de-documentos" element={<SettingsPlaceholder title="Configurações do Envio de Documentos (Vendas)" />} />
        <Route path="vendas/marcadores-nas-vendas" element={<SettingsPlaceholder title="Configurações dos Marcadores nas Vendas" />} />
        <Route path="vendas/marcadores-nas-propostas" element={<SettingsPlaceholder title="Configurações dos Marcadores nas Propostas Comerciais" />} />
        <Route path="vendas/marcadores-nas-devolucoes" element={<SettingsPlaceholder title="Configurações dos Marcadores nas Devoluções de Vendas" />} />
        <Route path="vendas/devolucoes-de-vendas" element={<SettingsPlaceholder title="Configurações das Devoluções de Vendas" />} />
        <Route path="vendas/expedicao/formas-de-envio" element={<SettingsPlaceholder title="Formas de Envio" />} />
        <Route path="vendas/expedicao/configuracoes" element={<SettingsPlaceholder title="Configurações da Expedição" />} />
        <Route path="vendas/expedicao/intelipost" element={<SettingsPlaceholder title="Configurações da Intelipost" />} />
        <Route path="vendas/crm/configuracoes" element={<SettingsPlaceholder title="Configurações do CRM" />} />
        <Route path="vendas/crm/marcadores" element={<SettingsPlaceholder title="Configurações dos Marcadores no CRM" />} />
        <Route path="vendas/crm/estagios" element={<SettingsPlaceholder title="Configurações dos Estágios no Funil do CRM" />} />

        {/* Notas Fiscais */}
        <Route path="notas-fiscais/dados-da-empresa" element={<SettingsPlaceholder title="Dados da Empresa (NF)" />} />
        <Route path="notas-fiscais/certificado-digital" element={<SettingsPlaceholder title="Configuração do Certificado Digital" />} />
        <Route path="notas-fiscais/ambiente" element={<SettingsPlaceholder title="Ambiente das Notas Fiscais" />} />
        <Route path="notas-fiscais/naturezas-entrada" element={<SettingsPlaceholder title="Naturezas de Operação de Entrada" />} />
        <Route path="notas-fiscais/naturezas-saida" element={<SettingsPlaceholder title="Naturezas de Operação de Saída" />} />
        <Route path="notas-fiscais/venda/nfe" element={<SettingsPlaceholder title="Configuração da NFe" />} />
        <Route path="notas-fiscais/venda/difal-nao-contribuinte" element={<SettingsPlaceholder title="ICMS DIFAL para Não Contribuinte" />} />
        <Route path="notas-fiscais/venda/difal-st" element={<SettingsPlaceholder title="Cálculo de ST para Consumidor Contribuinte - DIFAL" />} />
        <Route path="notas-fiscais/venda/intermediadores" element={<SettingsPlaceholder title="Cadastro de Intermediadores" />} />
        <Route path="notas-fiscais/venda/marcadores" element={<SettingsPlaceholder title="Marcadores nas Notas de Saída" />} />
        <Route path="notas-fiscais/entrada/configuracoes" element={<SettingsPlaceholder title="Configuração das Notas de Entrada" />} />
        <Route path="notas-fiscais/entrada/marcadores" element={<SettingsPlaceholder title="Marcadores nas Notas de Entrada" />} />
        <Route path="notas-fiscais/servico/nfse" element={<SettingsPlaceholder title="Configuração da NFSe" />} />
        <Route path="notas-fiscais/servico/marcadores" element={<SettingsPlaceholder title="Marcadores nas Notas de Serviço" />} />

        {/* Finanças */}
        <Route path="financas/geral" element={<SettingsPlaceholder title="Configurações Gerais (Finanças)" />} />
        <Route path="financas/categorias" element={<CategoriasFinanceiras />} />
        <Route path="financas/formas-de-pagamento" element={<FormasPagamento />} />
        <Route path="financas/contas-bancarias" element={<SettingsPlaceholder title="Cadastro de Contas Bancárias" />} />
        <Route path="financas/gateways" element={<SettingsPlaceholder title="Cadastro de Gateways" />} />
        <Route path="financas/contas-financeiras" element={<SettingsPlaceholder title="Cadastro de Contas Financeiras" />} />
        <Route path="financas/contas-a-pagar" element={<SettingsPlaceholder title="Configurações do Contas a Pagar" />} />
        <Route path="financas/contas-a-receber" element={<SettingsPlaceholder title="Configurações do Contas a Receber" />} />
        <Route path="financas/envio-de-documentos" element={<SettingsPlaceholder title="Configurações do Envio de Documentos (Finanças)" />} />
        <Route path="financas/marcadores-caixa" element={<SettingsPlaceholder title="Marcadores no Caixa" />} />
        <Route path="financas/marcadores-cap" element={<SettingsPlaceholder title="Marcadores nas Contas a Pagar" />} />
        <Route path="financas/marcadores-car" element={<SettingsPlaceholder title="Marcadores nas Contas a Receber" />} />

        {/* Serviços */}
        <Route path="servicos/ordens-de-servico" element={<SettingsPlaceholder title="Configurações das Ordens de Serviço" />} />
        <Route path="servicos/contratos" element={<SettingsPlaceholder title="Configurações dos Contratos" />} />
        <Route path="servicos/envio-de-documentos" element={<SettingsPlaceholder title="Configurações do Envio de Documentos (Serviços)" />} />
        <Route path="servicos/marcadores-os" element={<SettingsPlaceholder title="Marcadores nas Ordens de Serviço" />} />
        <Route path="servicos/marcadores-contratos" element={<SettingsPlaceholder title="Marcadores nos Contratos" />} />
        <Route path="servicos/cnaes" element={<SettingsPlaceholder title="Cadastro de CNAEs" />} />
        <Route path="servicos/campos-adicionais-os" element={<SettingsPlaceholder title="Campos Adicionais para Ordens de Serviço" />} />

        {/* E-commerce */}
        <Route path="ecommerce/geral" element={<SettingsPlaceholder title="Configurações Gerais (E-commerce)" />} />
        <Route path="ecommerce/integracoes" element={<SettingsPlaceholder title="Integrações" />} />
        <Route path="ecommerce/token-api" element={<SettingsPlaceholder title="Token API (E-commerce)" />} />

        <Route path="*" element={<Navigate to="geral/alterar-dados-da-empresa" replace />} />
      </Route>
    </Routes>
  );
};

export default SettingsRoutes;
