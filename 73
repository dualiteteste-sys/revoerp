import React from 'react';
import { Control, useFieldArray, Controller, UseFormWatch } from 'react-hook-form';
import { OrdemServicoFormData } from '../../../schemas/ordemServicoSchema';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { GlassButton } from '../../ui/GlassButton';
import { Plus, Trash2, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface ItensSectionProps {
  control: Control<OrdemServicoFormData>;
  watch: UseFormWatch<OrdemServicoFormData>;
}

export const ItensSection: React.FC<ItensSectionProps> = ({ control, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itens',
  });

  const handleAddItem = () => {
    append({
      descricao: '',
      quantidade: 1,
      preco: 0,
      desconto: 0,
      valorTotal: 0,
      orcar: false,
    });
  };

  const watchedItens = watch('itens');

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Serviços</h3>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-2 px-2 font-medium text-gray-700 w-2/5">Descrição</th>
              <th className="text-right py-2 px-2 font-medium text-gray-700 w-1/12">Qtd</th>
              <th className="text-right py-2 px-2 font-medium text-gray-700 w-1/12">Preço</th>
              <th className="text-right py-2 px-2 font-medium text-gray-700 w-1/12">Desc %</th>
              <th className="text-right py-2 px-2 font-medium text-gray-700 w-1/12">Total</th>
              <th className="text-center py-2 px-2 font-medium text-gray-700 w-1/12">Orçar</th>
              <th className="text-center py-2 px-2 font-medium text-gray-700 w-1/12">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {fields.map((item, index) => (
                <motion.tr 
                  key={item.id} 
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b border-white/10"
                >
                  <td>
                    <Controller name={`itens.${index}.descricao`} control={control} render={({ field }) => <GlassInput {...field} />} />
                  </td>
                  <td>
                    <Controller name={`itens.${index}.quantidade`} control={control} render={({ field }) => <GlassInput type="number" {...field} className="text-right" />} />
                  </td>
                  <td>
                    <Controller name={`itens.${index}.preco`} control={control} render={({ field }) => <CurrencyInput value={field.value || 0} onAccept={(v) => field.onChange(parseFloat(v))} />} />
                  </td>
                  <td>
                    <Controller name={`itens.${index}.desconto`} control={control} render={({ field }) => <GlassInput type="number" {...field} value={field.value || 0} className="text-right" />} />
                  </td>
                  <td>
                    <CurrencyInput value={watchedItens?.[index]?.valorTotal || 0} onAccept={() => {}} disabled />
                  </td>
                  <td className="text-center">
                    <Controller name={`itens.${index}.orcar`} control={control} render={({ field }) => <input type="checkbox" {...field} checked={field.value} className="form-checkbox" />} />
                  </td>
                  <td className="text-center">
                    <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => remove(index)} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-4">
        <GlassButton icon={Plus} onClick={handleAddItem} type="button">Adicionar Serviço</GlassButton>
        <GlassButton icon={Search} variant="secondary" type="button">Busca Avançada</GlassButton>
      </div>
    </section>
  );
};
