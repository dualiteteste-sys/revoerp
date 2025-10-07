import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { InputWrapper } from '../../ui/InputWrapper';
import { UploadCloud } from 'lucide-react';

interface ObservacoesSectionProps {
  control: Control<PedidoVendaFormData>;
}

export const ObservacoesSection: React.FC<ObservacoesSectionProps> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Dados Adicionais</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller name="deposito" control={control} render={({ field }) => (
          <InputWrapper label="Depósito">
            <select className="glass-input" {...field} value={field.value || 'Padrão'}>
              <option>Padrão</option>
            </select>
          </InputWrapper>
        )} />
        <Controller name="marcadores" control={control} render={({ field }) => (
          <InputWrapper label="Marcadores" helpText="Separados por vírgula ou tab">
            <input className="glass-input" value={field.value?.join(', ') || ''} onChange={e => field.onChange(e.target.value.split(',').map(m => m.trim()))} />
          </InputWrapper>
        )} />
        <div className="md:col-span-2">
          <Controller name="observacoes" control={control} render={({ field }) => (
            <InputWrapper label="Observações" helpText="Esta informação será impressa na venda e transferida para as observações da nota.">
              <textarea className="glass-input h-24 resize-y" {...field} value={field.value || ''} />
            </InputWrapper>
          )} />
        </div>
        <div className="md:col-span-2">
          <Controller name="observacoesInternas" control={control} render={({ field }) => (
            <InputWrapper label="Observações Internas" helpText="Esta informação é de uso interno.">
              <textarea className="glass-input h-24 resize-y" {...field} value={field.value || ''} />
            </InputWrapper>
          )} />
        </div>
        <div className="md:col-span-2">
          <InputWrapper label="Anexos" helpText="O tamanho do arquivo não deve ultrapassar 2 MB">
            <div className="p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors border-gray-300 hover:border-blue-400">
              <UploadCloud size={32} className="mx-auto text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Procurar arquivo</p>
            </div>
          </InputWrapper>
        </div>
      </div>
    </section>
  );
};
