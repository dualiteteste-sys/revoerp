import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrdemServico, StatusOS, PrioridadeOS } from '../../types';
import { ordemServicoSchema, OrdemServicoFormData } from '../../schemas/ordemServicoSchema';
import { GenericForm } from '../ui/GenericForm';
import { CabecalhoSection } from './form/CabecalhoSection';
import { DescricaoSection } from './form/DescricaoSection';
import { ItensSection } from './form/ItensSection';
import { DetalhesEquipeSection } from './form/DetalhesEquipeSection';
import { PagamentoObservacoesSection } from './form/PagamentoObservacoesSection';

interface OrdemServicoFormProps {
  os?: Partial<OrdemServico>;
  onSave: (os: OrdemServicoFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const getInitialData = (os?: Partial<OrdemServico>): OrdemServicoFormData => ({
  id: os?.id || undefined,
  numero: os?.numero || `OS-${Date.now().toString().slice(-6)}`,
  clienteId: os?.clienteId || '',
  descricaoServico: os?.descricaoServico || '',
  consideracoesFinais: os?.consideracoesFinais || '',
  itens: os?.itens?.map(item => ({ ...item, id: item.id || crypto.randomUUID() })) || [],
  dataInicio: os?.dataInicio ? new Date(os.dataInicio) : new Date(),
  dataPrevisao: os?.dataPrevisao ? new Date(os.dataPrevisao) : undefined,
  hora: os?.hora || '',
  dataConclusao: os?.dataConclusao ? new Date(os.dataConclusao) : undefined,
  totalServicos: os?.totalServicos || 0,
  desconto: os?.desconto || '',
  observacoesServico: os?.observacoesServico || '',
  observacoesInternas: os?.observacoesInternas || '',
  vendedorId: os?.vendedorId,
  tecnicoId: os?.tecnicoId,
  orcar: os?.orcar || false,
  formaRecebimento: os?.formaRecebimento || 'Boleto',
  meioPagamento: os?.meioPagamento || 'Banco',
  contaBancaria: os?.contaBancaria || 'Banco Inter',
  categoriaFinanceira: os?.categoriaFinanceira,
  condicaoPagamento: os?.condicaoPagamento,
  anexos: os?.anexos || [],
  marcadores: os?.marcadores || [],
  status: os?.status || StatusOS.ABERTA,
  prioridade: os?.prioridade || PrioridadeOS.MEDIA,
});

export const OrdemServicoForm: React.FC<OrdemServicoFormProps> = ({ os, onSave, onCancel, loading }) => {
  const form = useForm<OrdemServicoFormData>({
    resolver: zodResolver(ordemServicoSchema),
    defaultValues: getInitialData(os),
  });

  const { control, handleSubmit, watch, setValue } = form;
  const itens = watch('itens');

  useEffect(() => {
    form.reset(getInitialData(os));
  }, [os, form]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name && (name.startsWith('itens') || name === 'desconto')) {
        const updatedItens = (value.itens || []).map(item => {
          const qtd = item.quantidade || 0;
          const preco = item.preco || 0;
          const desc = item.desconto || 0;
          const valorTotal = qtd * preco * (1 - desc / 100);
          return { ...item, valorTotal: isNaN(valorTotal) ? 0 : valorTotal };
        });
        setValue('itens', updatedItens, { shouldValidate: false });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const totalServicos = useMemo(() => {
    return (itens || []).reduce((acc, item) => acc + (item.valorTotal || 0), 0);
  }, [itens]);

  return (
    <GenericForm
      title={os?.id ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
      onSave={handleSubmit(onSave)}
      onCancel={onCancel}
      loading={loading}
      size="max-w-7xl"
    >
      <div className="space-y-8">
        <CabecalhoSection control={control} cliente={os?.cliente} />
        <DescricaoSection control={control} />
        <ItensSection control={control} watch={watch} />
        <DetalhesEquipeSection
          control={control}
          vendedor={os?.vendedor}
          tecnico={os?.tecnico}
          totalServicos={totalServicos}
        />
        <PagamentoObservacoesSection control={control} />
      </div>
    </GenericForm>
  );
};
