import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PageLoader } from './components/layout/PageLoader';
import { AppProviders } from './contexts/AppProviders';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import MainLayout from './layouts/MainLayout';

const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Clientes = lazy(() => import('./pages/Clientes').then(module => ({ default: module.Clientes })));
const Produtos = lazy(() => import('./pages/Produtos').then(module => ({ default: module.Produtos })));
const Servicos = lazy(() => import('./pages/Servicos').then(module => ({ default: module.Servicos })));
const Vendedores = lazy(() => import('./pages/Vendedores').then(module => ({ default: module.Vendedores })));
const Embalagens = lazy(() => import('./pages/Embalagens').then(module => ({ default: module.Embalagens })));
const OrdensServico = lazy(() => import('./pages/OrdensServico').then(module => ({ default: module.OrdensServico })));
const PedidosVenda = lazy(() => import('./pages/PedidosVenda').then(module => ({ default: module.PedidosVenda })));
const NotasFiscais = lazy(() => import('./pages/NotasFiscais').then(module => ({ default: module.NotasFiscais })));
const NovaFaturaVenda = lazy(() => import('./pages/NovaFaturaVenda').then(module => ({ default: module.NovaFaturaVenda })));
const Expedicao = lazy(() => import('./pages/Expedicao').then(module => ({ default: module.Expedicao })));
const ContasReceber = lazy(() => import('./pages/ContasReceber').then(module => ({ default: module.ContasReceber })));
const ContasPagar = lazy(() => import('./pages/ContasPagar').then(module => ({ default: module.ContasPagar })));
const Caixa = lazy(() => import('./pages/Caixa').then(module => ({ default: module.Caixa })));
const RelatoriosFinanceiros = lazy(() => import('./pages/RelatoriosFinanceiros').then(module => ({ default: module.RelatoriosFinanceiros })));
const EmDesenvolvimento = lazy(() => import('./pages/EmDesenvolvimento').then(module => ({ default: module.EmDesenvolvimento })));
const OrdensCompra = lazy(() => import('./pages/OrdensCompra').then(module => ({ default: module.OrdensCompra })));
const ControleEstoque = lazy(() => import('./pages/ControleEstoque').then(module => ({ default: module.ControleEstoque })));
const CRM = lazy(() => import('./pages/CRM').then(module => ({ default: module.CRM })));
const PDV = lazy(() => import('./pages/PDV').then(module => ({ default: module.PDV })));
const Comissoes = lazy(() => import('./pages/Comissoes').then(module => ({ default: module.Comissoes })));
const DevolucaoVenda = lazy(() => import('./pages/DevolucaoVenda').then(module => ({ default: module.DevolucaoVenda })));
const Contratos = lazy(() => import('./pages/Contratos').then(module => ({ default: module.Contratos })));
const NotasEntrada = lazy(() => import('./pages/NotasEntrada').then(module => ({ default: module.NotasEntrada })));
const Cobrancas = lazy(() => import('./pages/Cobrancas').then(module => ({ default: module.Cobrancas })));
const SettingsRoutes = lazy(() => import('./pages/configuracoes'));

function App() {
  return (
    <Router>
      <AppProviders>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800">
          <Toaster position="bottom-right" />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={
                <ProtectedRoute>
                  <MainLayout>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/clientes" element={<Clientes />} />
                        <Route path="/produtos" element={<Produtos />} />
                        <Route path="/servicos" element={<Servicos />} />
                        <Route path="/vendedores" element={<Vendedores />} />
                        <Route path="/embalagens" element={<Embalagens />} />
                        <Route path="/cadastros/relatorios" element={<EmDesenvolvimento modulo="Relatórios de Cadastros" />} />
                        <Route path="/ordens-compra" element={<OrdensCompra />} />
                        <Route path="/controle-estoque" element={<ControleEstoque />} />
                        <Route path="/notas-entrada" element={<NotasEntrada />} />
                        <Route path="/suprimentos/relatorios" element={<EmDesenvolvimento modulo="Relatórios de Suprimentos" />} />
                        <Route path="/ordens-servico" element={<OrdensServico />} />
                        <Route path="/servicos/relatorios" element={<EmDesenvolvimento modulo="Relatórios de Serviços" />} />
                        <Route path="/notas-servico" element={<EmDesenvolvimento modulo="Notas de Serviço" />} />
                        <Route path="/servicos/cobrancas" element={<Cobrancas />} />
                        <Route path="/pedidos-vendas" element={<PedidosVenda />} />
                        <Route path="/notas-fiscais" element={<NotasFiscais />} />
                        <Route path="/notas-fiscais/novo/:pedidoId" element={<NovaFaturaVenda />} />
                        <Route path="/expedicao" element={<Expedicao />} />
                        <Route path="/crm" element={<CRM />} />
                        <Route path="/automacoes" element={<EmDesenvolvimento modulo="Painel de Automações" />} />
                        <Route path="/pdv" element={<PDV />} />
                        <Route path="/propostas-comerciais" element={<EmDesenvolvimento modulo="Propostas Comerciais" />} />
                        <Route path="/comissoes" element={<Comissoes />} />
                        <Route path="/devolucao-venda" element={<DevolucaoVenda />} />
                        <Route path="/contratos" element={<Contratos />} />
                        <Route path="/caixa" element={<Caixa />} />
                        <Route path="/contas-receber" element={<ContasReceber />} />
                        <Route path="/contas-pagar" element={<ContasPagar />} />
                        <Route path="/cobrancas-bancarias" element={<EmDesenvolvimento modulo="Cobranças Bancárias" />} />
                        <Route path="/extrato-bancario" element={<EmDesenvolvimento modulo="Extrato Bancário" />} />
                        <Route path="/financeiro/relatorios" element={<RelatoriosFinanceiros />} />
                        <Route path="/suporte" element={<EmDesenvolvimento modulo="Suporte" />} />
                        <Route path="/configuracoes/*" element={<SettingsRoutes />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </MainLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </div>
      </AppProviders>
    </Router>
  );
}

export default App;
