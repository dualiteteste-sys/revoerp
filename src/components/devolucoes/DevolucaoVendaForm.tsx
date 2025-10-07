import React, { useState, useMemo, useCallback } from 'react';
import { GenericForm } from '../ui/GenericForm';
import { DevolucaoVenda, PedidoVenda } from '../../types';
import toast from 'react-hot-toast';
import { AutocompleteInput } from '../ui/AutocompleteInput';
import { InputWrapper } from '../ui/InputWrapper';
import { useService } from '../../hooks/useService';

interface DevolucaoVendaFormProps {
  onSave: (devolucaoData: any, itensData: any[]) => void;
  onCancel: () => void;
  loading?: boolean;
}

export const DevolucaoVendaForm: React.FC<DevolucaoVendaFormProps> = ({ onSave, onCancel, loading }) => {
  const [step, setStep] = useState(1);
  const [pedidoOriginal, setPedidoOriginal] = useState<PedidoVenda | null>(null);
  const [itensDevolucao, setItensDevolucao] = useState<Map<string, number>>(new Map());
  const [observacoes, setObservacoes] = useState('');

  const pedidoVendaService = useService('pedidoVenda');

  const fetchPedidos = useCallback(async (query: string) => {
    const { data } = await pedidoVendaService.getAllPedidosVenda({ page: 1, pageSize: 10 });
    return data
      .filter(p => p.numero.toLowerCase().includes(query.toLowerCase()) || (p.cliente?.nome && p.cliente.nome.toLowerCase().includes(query.toLowerCase())))
      .map(p => ({ value: p.id, label: `${p.numero} - ${p.cliente?.nome}`, pedido: p }));
  }, [pedidoVendaService]);

  const handlePedidoSelect = async (pedidoId: string | null, suggestions: any[]) => {
    if (pedidoId) {
      const selected = suggestions.find(s => s.value === pedidoId);
      if (selected?.pedido) {
        const pedidoCompleto = await pedidoVendaService.repository.findById(pedidoId);
        if (pedidoCompleto) {
          setPedidoOriginal(pedidoCompleto);
          setStep(2);
        } else {
          toast.error("Não foi possível carregar os detalhes do pedido.");
        }
      }
    }
  };

  const handleQuantidadeChange = (itemId: string, quantidade: number) => {
    const itemOriginal = pedidoOriginal?.itens.find(i => i.id === itemId);
    if (!itemOriginal) return;

    const novaQuantidade = Math.max(0, Math.min(quantidade, itemOriginal.quantidade));
    setItensDevolucao(new Map(itensDevolucao.set(itemId, novaQuantidade)));
  };

  const totalDevolvido = useMemo(() => {
    if (!pedidoOriginal) return 0;
    let total = 0;
    itensDevolucao.forEach((qtd, itemId) => {
      const itemOriginal = pedidoOriginal.itens.find(i => i.id === itemId);
      if (itemOriginal) {
        total += itemOriginal.valorUnitario * qtd;
      }
    });
    return total;
  }, [itensDevolucao, pedidoOriginal]);

  const handleSave = () => {
    if (!pedidoOriginal) {
      toast.error('Selecione um pedido de venda original.');
      return;
    }
    const itensParaSalvar = Array.from(itensDevolucao.entries())
      .filter(([, qtd]) => qtd > 0)
      .map(([itemId, quantidade]) => {
        const itemOriginal = pedidoOriginal.itens.find(i => i.id === itemId)!;
        return {
          pedidoVendaItemId: itemOriginal.id,
          produtoId: itemOriginal.produtoId,
          servicoId: itemOriginal.servicoId,
          descricao: itemOriginal.descricao,
          quantidade,
          valorUnitario: itemOriginal.valorUnitario,
          valorTotal: itemOriginal.valorUnitario * quantidade,
        };
      });

    if (itensParaSalvar.length === 0) {
      toast.error('Selecione pelo menos um item para devolver.');
      return;
    }

    const devolucaoData = {
      numero: `DEV-${pedidoOriginal.numero}`,
      pedidoVendaId: pedidoOriginal.id,
      clienteId: pedidoOriginal.clienteId,
      dataDevolucao: new Date(),
      valorTotalDevolvido: totalDevolvido,
      observacoes,
    };

    onSave(devolucaoData, itensParaSalvar);
  };

  return (
    <GenericForm
      title="Nova Devolução de Venda"
      onSave={handleSave}
      onCancel={onCancel}
      loading={loading}
      size="max-w-6xl"
    >
      {step === 1 && (
        <div className="min-h-[400px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Passo 1: Selecione o Pedido de Venda Original</h3>
          <AutocompleteInput
            value=""
            onValueChange={handlePedidoSelect}
            fetchSuggestions={fetchPedidos}
            placeholder="Buscar por número do pedido ou nome do cliente..."
          />
        </div>
      )}
      {step === 2 && pedidoOriginal && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Passo 2: Selecione os Itens para Devolução</h3>
            <div className="p-4 bg-glass-50 rounded-xl border border-white/20 grid grid-cols-3 gap-4">
              <div><span className="font-medium">Pedido Original:</span> {pedidoOriginal.numero}</div>
              <div><span className="font-medium">Cliente:</span> {pedidoOriginal.cliente?.nome}</div>
              <div><span className="font-medium">Data da Venda:</span> {new Date(pedidoOriginal.dataVenda).toLocaleDateString('pt-BR')}</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="w-2/5 p-2 text-left">Item</th>
                  <th className="w-1/5 p-2 text-right">Qtd. Vendida</th>
                  <th className="w-1/5 p-2 text-right">Valor Un.</th>
                  <th className="w-1/5 p-2 text-center">Qtd. a Devolver</th>
                </tr>
              </thead>
              <tbody>
                {pedidoOriginal.itens.map(item => (
                  <tr key={item.id} className="border-b border-white/10">
                    <td className="p-2">{item.descricao}</td>
                    <td className="p-2 text-right">{item.quantidade}</td>
                    <td className="p-2 text-right">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorUnitario)}</td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        min="0"
                        max={item.quantidade}
                        value={itensDevolucao.get(item.id) || 0}
                        onChange={(e) => handleQuantidadeChange(item.id, parseInt(e.target.value, 10))}
                        className="glass-input w-24 text-center"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputWrapper label="Observações da Devolução">
              <textarea
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="glass-input h-24 resize-y"
                placeholder="Motivo da devolução, estado do produto, etc."
              />
            </InputWrapper>
            <div className="p-4 bg-glass-50 rounded-xl border border-white/20 flex flex-col justify-center items-end">
                <p className="text-sm text-gray-600">Valor Total a Devolver</p>
                <p className="text-3xl font-bold text-gray-800">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDevolvido)}</p>
            </div>
          </div>
        </div>
      )}
    </GenericForm>
  );
};
