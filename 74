import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { OrdemServicoFormData } from '../../../schemas/ordemServicoSchema';
import { GlassInput } from '../../ui/GlassInput';
import { GlassButton } from '../../ui/GlassButton';
import { InputWrapper } from '../../ui/InputWrapper';
import { UploadCloud } from 'lucide-react';

interface PagamentoObservacoesSectionProps {
  control: Control<OrdemServicoFormData>;
}

export const PagamentoObservacoesSection: React.FC<PagamentoObservacoesSectionProps> = ({ control }) => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller name="formaRecebimento" control={control} render={({ field }) => (
          <InputWrapper label="Forma de recebimento"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="meioPagamento" control={control} render={({ field }) => (
          <InputWrapper label="Meio"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="contaBancaria" control={control} render={({ field }) => (
          <InputWrapper label="Conta bancária"><GlassInput {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="categoriaFinanceira" control={control} render={({ field }) => (
          <InputWrapper label="Categoria"><GlassInput placeholder="Selecione" {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <div className="md:col-span-2">
          <Controller name="condicaoPagamento" control={control} render={({ field }) => (
            <InputWrapper label="Condição de pagamento" helpText="Exemplos: 30 60, 3x ou 15 +2x">
              <div className="flex gap-2">
                <GlassInput {...field} value={field.value || ''} />
                <GlassButton type="button">Gerar Parcelas</GlassButton>
              </div>
            </InputWrapper>
          )} />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWrapper label="Anexos" helpText="O tamanho do arquivo não deve ultrapassar 2 MB">
            <div className="p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors border-gray-300 hover:border-blue-400">
              <UploadCloud size={32} className="mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Procurar arquivo</p>
            </div>
          </InputWrapper>
          <Controller name="marcadores" control={control} render={({ field }) => (
            <InputWrapper label="Marcadores" helpText="Separados por vírgula ou tab">
              <GlassInput {...field} value={field.value?.join(', ') || ''} onChange={(e) => field.onChange(e.target.value.split(',').map(m => m.trim()))} />
            </InputWrapper>
          )} />
        </div>
      </section>
    </>
  );
};
