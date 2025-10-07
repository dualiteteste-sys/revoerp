import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { Calendar, Filter, CheckCircle, Truck, Loader2 } from 'lucide-react';
import { ExpedicaoService } from '../services/ExpedicaoService';
import { PedidoVenda } from '../types';
import toast from 'react-hot-toast';

type ModoSelecao = 'disponiveis' | 'especificos';

const InputWrapper: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
  <div className={className}>
    <label className="text-sm text-gray-600 mb-1 block">{label}</label>
    {children}
  </div>
);

const ModoSelecaoCard: React.FC<{ title: string; description: string; value: ModoSelecao; selectedValue: ModoSelecao; onChange: (value: ModoSelecao) => void; }> = ({ title, description, value, selectedValue, onChange }) => {
  const isSelected = value === selectedValue;
  return (
    <motion.div
      onClick={() => onChange(value)}
      className={`p-4 rounded-xl cursor-pointer border transition-all duration-200 relative ${isSelected ? 'bg-blue-50 border-blue-400 shadow-md' : 'bg-glass-50 hover:bg-white/80 border-transparent'}`}
      whileHover={{ scale: 1.02 }}
    >
      {isSelected && (
        <motion.div initial={{scale:0.5, opacity: 0}} animate={{scale:1, opacity: 1}} className="absolute top-2 right-2 text-blue-600">
          <CheckCircle size={20} />
        </motion.div>
      )}
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </motion.div>
  );
};

export const Expedicao: React.FC = () => {
  const [formaEnvio, setFormaEnvio] = useState('Correios');
  const [incluirSemFormaEnvio, setIncluirSemFormaEnvio] = useState(true);
  const [modoSelecao, setModoSelecao] = useState<ModoSelecao>('disponiveis');
  const [pedidosDisponiveis, setPedidosDisponiveis] = useState<PedidoVenda[]>([]);
  const [selectedPedidos, setSelectedPedidos] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const expedicaoService = useMemo(() => new ExpedicaoService(), []);

  const fetchPedidos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await expedicaoService.getPedidosParaExpedir(formaEnvio, incluirSemFormaEnvio);
      setPedidosDisponiveis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar pedidos.');
      toast.error(err instanceof Error ? err.message : 'Erro ao buscar pedidos.');
    } finally {
      setLoading(false);
    }
  }, [formaEnvio, incluirSemFormaEnvio, expedicaoService]);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const handleSelectPedido = (pedidoId: string) => {
    setSelectedPedidos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(pedidoId)) {
        newSet.delete(pedidoId);
      } else {
        newSet.add(pedidoId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedPedidos.size === pedidosDisponiveis.length) {
      setSelectedPedidos(new Set());
    } else {
      setSelectedPedidos(new Set(pedidosDisponiveis.map(p => p.id)));
    }
  };

  const handleGerarExpedicao = async () => {
    if (selectedPedidos.size === 0) {
      toast.error('Selecione pelo menos um pedido para gerar a expedição.');
      return;
    }

    const promise = expedicaoService.gerarExpedicao(formaEnvio, Array.from(selectedPedidos));
    toast.promise(promise, {
      loading: 'Gerando lote de expedição...',
      success: (novaExpedicao) => {
        setSelectedPedidos(new Set());
        fetchPedidos(); // Recarrega a lista de pedidos
        return `Lote ${novaExpedicao.lote} criado com sucesso!`;
      },
      error: (err) => `Falha ao gerar expedição: ${err.message}`,
    });
  };

  const renderTabelaPedidos = () => {
    if (loading) {
      return <div className="flex justify-center items-center py-10"><Loader2 className="animate-spin text-blue-500" size={32} /></div>;
    }
    if (error) {
      return <div className="text-center py-10 text-red-500">{error}</div>;
    }
    if (pedidosDisponiveis.length === 0) {
      return <div className="text-center py-10 text-gray-500">Nenhum pedido disponível para os filtros selecionados.</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-2 w-10"><input type="checkbox" className="form-checkbox" onChange={handleSelectAll} checked={selectedPedidos.size === pedidosDisponiveis.length && pedidosDisponiveis.length > 0} /></th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Pedido</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Cliente</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Data</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Valor</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {pedidosDisponiveis.map((pedido, index) => (
                <motion.tr
                  key={pedido.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-white/10 transition-colors duration-200 ${selectedPedidos.has(pedido.id) ? 'bg-blue-100/50' : 'hover:bg-glass-50'}`}
                >
                  <td className="p-2 text-center"><input type="checkbox" className="form-checkbox" checked={selectedPedidos.has(pedido.id)} onChange={() => handleSelectPedido(pedido.id)} /></td>
                  <td className="py-3 px-2 font-medium text-gray-800">{pedido.numero}</td>
                  <td className="py-3 px-2 text-gray-700">{pedido.cliente?.nome}</td>
                  <td className="py-3 px-2 text-gray-600">{new Date(pedido.dataVenda).toLocaleDateString('pt-BR')}</td>
                  <td className="py-3 px-2 text-right text-gray-800 font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.valorTotal)}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Header 
        title="Expedição" 
        subtitle="Crie e gerencie seus lotes de envio"
      />

      <GlassCard className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <InputWrapper label="Forma de envio *">
            <select className="glass-input" value={formaEnvio} onChange={(e) => setFormaEnvio(e.target.value)}>
              <option>Correios</option>
              <option>Transportadora</option>
              <option>Retirar pessoalmente</option>
            </select>
          </InputWrapper>
          <div className="flex items-center gap-3">
            <label htmlFor="toggle-incluir" className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" id="toggle-incluir" className="sr-only peer" checked={incluirSemFormaEnvio} onChange={(e) => setIncluirSemFormaEnvio(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm text-gray-700">Incluir pedidos e notas sem forma de envio</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pedidos da expedição</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ModoSelecaoCard title="Pedidos disponíveis" description="Crie a expedição a partir dos pedidos ainda não expedidos" value="disponiveis" selectedValue={modoSelecao} onChange={setModoSelecao} />
          <ModoSelecaoCard title="Pedidos específicos" description="Informe individualmente os pedidos que deseja expedir" value="especificos" selectedValue={modoSelecao} onChange={setModoSelecao} />
        </div>
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div className="flex items-center gap-2 border border-gray-300/80 rounded-xl p-3 bg-gray-50/80">
            <Calendar className="text-gray-500" size={20} />
            <input type="date" className="bg-transparent focus:outline-none text-sm" />
            <span className="text-gray-500">-</span>
            <input type="date" className="bg-transparent focus:outline-none text-sm" />
          </div>
          <GlassButton icon={Filter} variant="secondary">Filtros</GlassButton>
        </div>
        {renderTabelaPedidos()}
      </GlassCard>

      <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="mt-6">
        <GlassCard>
          <div className="flex justify-between items-center">
            <p className="text-gray-700"><span className="font-bold">{selectedPedidos.size}</span> pedidos selecionados</p>
            <GlassButton icon={Truck} onClick={handleGerarExpedicao} disabled={selectedPedidos.size === 0}>
              Gerar expedição
            </GlassButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};
