import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PedidoVenda, PedidoVendaItem } from '../../types';
import { pedidoVendaSchema, PedidoVendaFormData } from '../../schemas/pedidoVendaSchema';
import { PedidoVendaService } from '../../services/PedidoVendaService';
import { GenericForm } from '../ui/GenericForm';
import { CabecalhoSection } from './form/CabecalhoSection';
import { PartesSection } from './form/PartesSection';
import { ItensSection } from './form/ItensSection';
import { TotaisSection } from './form/TotaisSection';
import { DetalhesVendaSection } from './form/DetalhesVendaSection';
import { PagamentoSection } from './form/PagamentoSection';
import { TransporteSection } from './form/TransporteSection';
import { ObservacoesSection } from './form/ObservacoesSection';

interface PedidoVendaFormProps {
  pedido?: Partial<PedidoVenda>;
  onSave: (
    pedidoData: PedidoVendaFormData,
    itensData: Omit<PedidoVendaItem, 'id' | 'createdAt' | 'updatedAt' | 'pedidoId'>[]
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const getInitialData = (pedido?: Partial<PedidoVenda>): PedidoVendaFormData => ({
  id: pedido?.id || undefined,
  numero: pedido?.numero || `PV-${Date.now().toString().slice(-6)}`,
  naturezaOperacao: pedido?.naturezaOperacao || 'Venda de mercadorias',
  clienteId: pedido?.clienteId || '',
  vendedorId: pedido?.vendedorId,
  enderecoEntregaDiferente: pedido?.enderecoEntregaDiferente || false,
  itens: pedido?.itens?.map(item => ({ ...item, id: item.id || crypto.randomUUID() })) || [],
  totalProdutos: pedido?.totalProdutos || 0,
  valorIpi: pedido?.valorIpi,
  valorIcmsSt: pedido?.valorIcmsSt,
  desconto: pedido?.desconto,
  freteCliente: pedido?.freteCliente,
  freteEmpresa: pedido?.freteEmpresa,
  despesas: pedido?.despesas,
  valorTotal: pedido?.valorTotal || 0,
  dataVenda: pedido?.dataVenda ? new Date(pedido.dataVenda) : new Date(),
  dataPrevistaEntrega: pedido?.dataPrevistaEntrega ? new Date(pedido.dataPrevistaEntrega) : undefined,
  dataEnvio: pedido?.dataEnvio ? new Date(pedido.dataEnvio) : undefined,
  dataMaximaDespacho: pedido?.dataMaximaDespacho ? new Date(pedido.dataMaximaDespacho) : undefined,
  numeroPedidoEcommerce: pedido?.numeroPedidoEcommerce,
  identificadorPedidoEcommerce: pedido?.identificadorPedidoEcommerce,
  numeroPedidoCanalVenda: pedido?.numeroPedidoCanalVenda,
  intermediador: pedido?.intermediador || 'Sem intermediador',
  formaRecebimento: pedido?.formaRecebimento || 'Boleto',
  meioPagamento: pedido?.meioPagamento || 'Banco',
  contaBancaria: pedido?.contaBancaria || 'Banco Inter',
  categoriaFinanceira: pedido?.categoriaFinanceira,
  condicaoPagamento: pedido?.condicaoPagamento,
  formaEnvio: pedido?.formaEnvio || 'Não definida',
  enviarParaExpedicao: pedido?.enviarParaExpedicao ?? true,
  deposito: pedido?.deposito || 'Padrão',
  observacoes: pedido?.observacoes,
  observacoesInternas: pedido?.observacoesInternas,
  marcadores: pedido?.marcadores || [],
  anexos: pedido?.anexos || [],
  status: pedido?.status || 'ABERTO',
  pesoBruto: pedido?.pesoBruto,
  pesoLiquido: pedido?.pesoLiquido,
});

export const PedidoVendaForm: React.FC<PedidoVendaFormProps> = ({ pedido, onSave, onCancel, loading }) => {
  const form = useForm<PedidoVendaFormData>({
    resolver: zodResolver(pedidoVendaSchema),
    defaultValues: getInitialData(pedido),
  });

  const { control, handleSubmit, watch, setValue } = form;
  const watchedItens = watch('itens');
  const watchedDesconto = watch('desconto');
  const watchedFrete = watch('freteCliente');
  const watchedDespesas = watch('despesas');

  useEffect(() => {
    form.reset(getInitialData(pedido));
  }, [pedido, form]);
  
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && (name.startsWith('itens') || ['desconto', 'freteCliente', 'despesas'].includes(name))) {
        const updatedItens = (value.itens || []).map(item => {
          const qtd = item.quantidade || 0;
          const preco = item.valorUnitario || 0;
          const desc = item.descontoPercentual || 0;
          const valorTotal = qtd * preco * (1 - desc / 100);
          return { ...item, valorTotal: isNaN(valorTotal) ? 0 : valorTotal };
        });
        
        const totals = PedidoVendaService.calculateTotals({
            itens: updatedItens,
            desconto: value.desconto,
            freteCliente: value.freteCliente,
            despesas: value.despesas,
        });

        setValue('itens', updatedItens, { shouldValidate: false });
        setValue('totalProdutos', totals.totalProdutos, { shouldValidate: false });
        setValue('valorTotal', totals.valorTotal, { shouldValidate: false });
        setValue('pesoBruto', totals.pesoBruto, { shouldValidate: false });
        setValue('pesoLiquido', totals.pesoLiquido, { shouldValidate: false });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const handleSave = (data: PedidoVendaFormData) => {
    const { itens, ...pedidoData } = data;
    const itensData = (itens || []).map(({ id: itemId, ...rest }) => rest);
    onSave(pedidoData, itensData);
  };
  
  const totalItens = watchedItens?.length || 0;
  const somaQuantidades = useMemo(() => (watchedItens || []).reduce((acc, i) => acc + (i.quantidade || 0), 0), [watchedItens]);

  return (
    <GenericForm
      title={pedido?.id ? 'Editar Pedido de Venda' : 'Novo Pedido de Venda'}
      onSave={handleSubmit(handleSave)}
      onCancel={onCancel}
      loading={loading}
      size="max-w-7xl"
    >
      <div className="space-y-8">
        <CabecalhoSection control={control} />
        <PartesSection control={control} cliente={pedido?.cliente} vendedor={pedido?.vendedor} />
        <ItensSection control={control} />
        <TotaisSection control={control} totalItens={totalItens} somaQuantidades={somaQuantidades} />
        <DetalhesVendaSection control={control} />
        <PagamentoSection control={control} />
        <TransporteSection control={control} />
        <ObservacoesSection control={control} />
      </div>
    </GenericForm>
  );
};
