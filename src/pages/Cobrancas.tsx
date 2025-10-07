import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Filter, Mail, MoreVertical, CheckCircle, AlertCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { DataTable } from '../components/ui/DataTable';
import { useCobrancas } from '../hooks/data/useCobrancas';
import { VisaoCobranca } from '../repositories/CobrancasRepository';
import { GerarCobrancasModal } from '../components/cobrancas/GerarCobrancasModal';
import { EnviarBoletosModal } from '../components/cobrancas/EnviarBoletosModal';
import toast from 'react-hot-toast';

export const Cobrancas: React.FC = () => {
  const { cobrancas, loading, error, competencia, setCompetencia, gerarCobrancas, enviarBoletos, totais, loadCobrancas } = useCobrancas();
  const [filtro, setFiltro] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [isGerarModalOpen, setIsGerarModalOpen] = useState(false);
  const [isEnviarModalOpen, setIsEnviarModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCobrancas(competencia);
  }, [competencia, loadCobrancas]);

  const cobrancasFiltradas = cobrancas.filter(c =>
    c.clienteNome.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleSelectRow = (clienteId: string) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clienteId)) {
        newSet.delete(clienteId);
      } else {
        newSet.add(clienteId);
      }
      return newSet;
    });
  };

  const handleGerarCobrancas = async () => {
    setIsSubmitting(true);
    await gerarCobrancas();
    setIsSubmitting(false);
    setIsGerarModalOpen(false);
  };

  const handleEnviarBoletos = async () => {
    const idsParaEnviar = selectedRows.size > 0 ? Array.from(selectedRows) : cobrancasFiltradas.map(c => c.clienteId);
    if (idsParaEnviar.length === 0) {
      toast.error('Nenhuma cobrança selecionada para envio.');
      return;
    }
    setIsEnviarModalOpen(true);
  };

  const confirmEnviarBoletos = async () => {
    setIsSubmitting(true);
    await enviarBoletos(Array.from(selectedRows));
    setIsSubmitting(false);
    setIsEnviarModalOpen(false);
  };

  const handleCompetenciaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompetencia(e.target.value);
  };

  const changeMonth = (amount: number) => {
    const [year, month] = competencia.split('-').map(Number);
    const newDate = new Date(year, month - 1 + amount, 1);
    const newCompetencia = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
    setCompetencia(newCompetencia);
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('pt-BR');

  const getStatusIcon = (status: VisaoCobranca['statusIntegracao']) => {
    const iconProps = { size: 18 };
    switch (status) {
      case 'enviado': return <CheckCircle {...iconProps} className="text-green-500" title="Enviado" />;
      case 'erro': return <XCircle {...iconProps} className="text-red-500" title="Erro" />;
      default: return <AlertCircle {...iconProps} className="text-yellow-500" title="Pendente" />;
    }
  };

  const columns = useMemo(() => [
    { header: '', accessorKey: 'select', cell: (item: VisaoCobranca) => <input type="checkbox" className="form-checkbox" checked={selectedRows.has(item.clienteId)} onChange={() => handleSelectRow(item.clienteId)} /> },
    { header: 'Cliente', accessorKey: 'clienteNome', cell: (item: VisaoCobranca) => <p className="font-medium text-gray-800">{item.clienteNome}</p> },
    { header: 'Fone', accessorKey: 'clienteTelefone' },
    { header: 'Contratos', accessorKey: 'valorTotal', cell: (item: VisaoCobranca) => <a href="#" className="text-blue-600 hover:underline">{formatCurrency(item.valorTotal)} ({item.contratosCount})</a>, className: 'text-right' },
    { header: 'Vencimento', accessorKey: 'dataVencimento', cell: (item: VisaoCobranca) => formatDate(item.dataVencimento) },
    { header: 'Integrações', accessorKey: 'statusIntegracao', cell: (item: VisaoCobranca) => <div className="flex justify-center">{getStatusIcon(item.statusIntegracao)}</div>, className: 'text-center' },
  ], [selectedRows]);

  return (
    <div>
      <Header title="Cobranças de Contratos" subtitle="Gere e envie as cobranças mensais dos seus contratos de serviço" />

      <GlassCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[250px]">
            <GlassInput placeholder="Pesquise por cliente" value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full max-w-xs" />
            <div className="flex items-center gap-2 p-2 bg-glass-200 rounded-xl border border-white/20">
              <GlassButton icon={ChevronLeft} size="sm" onClick={() => changeMonth(-1)} />
              <input type="month" value={competencia} onChange={handleCompetenciaChange} className="glass-input p-2 text-sm" />
              <GlassButton icon={ChevronRight} size="sm" onClick={() => changeMonth(1)} />
            </div>
            <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
          </div>
          <div className="flex items-center gap-2">
            <GlassButton icon={Mail} variant="secondary" onClick={handleEnviarBoletos}>Enviar Boletos</GlassButton>
            <GlassButton onClick={() => setIsGerarModalOpen(true)}>Gerar Cobranças</GlassButton>
            <GlassButton icon={MoreVertical} variant="secondary" />
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <DataTable
          data={cobrancasFiltradas}
          columns={columns}
          loading={loading}
          error={error}
          entityName="Cobrança"
        />
        <div className="flex justify-between items-center mt-4 px-2">
            <p className="text-sm text-gray-600">{totais.quantidade} clientes listados</p>
            <p className="text-sm text-gray-600">Valor total: <span className="font-bold text-gray-800">{formatCurrency(totais.valor)}</span></p>
        </div>
      </GlassCard>

      <AnimatePresence>
        {isGerarModalOpen && (
          <GerarCobrancasModal
            onGerar={handleGerarCobrancas}
            onCancel={() => setIsGerarModalOpen(false)}
            loading={isSubmitting}
          />
        )}
        {isEnviarModalOpen && (
          <EnviarBoletosModal
            onEnviar={() => confirmEnviarBoletos()}
            onCancel={() => setIsEnviarModalOpen(false)}
            loading={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
