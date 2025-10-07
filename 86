import React, { useCallback } from 'react';
import { Control, useFieldArray, Controller } from 'react-hook-form';
import { PedidoVendaFormData } from '../../../schemas/pedidoVendaSchema';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { GlassButton } from '../../ui/GlassButton';
import { Plus, Trash2, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { useService } from '../../../hooks/useService';
import { Produto } from '../../../types';

interface ItensSectionProps {
  control: Control<PedidoVendaFormData>;
}

export const ItensSection: React.FC<ItensSectionProps> = ({ control }) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'itens',
  });
  const produtoService = useService('produto');

  const handleAddItem = () => {
    append({
      descricao: '',
      quantidade: 1,
      valorUnitario: 0,
      valorTotal: 0,
    });
  };

  const fetchProdutos = useCallback(async (query: string) => {
    const results = await produtoService.search(query);
    return results.map(p => ({ value: p.id, label: `${p.nome} - R$ ${p.precoVenda.toFixed(2)}`, produto: p }));
  }, [produtoService]);

  const handleProdutoSelect = (index: number, produto: Produto) => {
    const currentItem = fields[index];
    update(index, {
      ...currentItem,
      produtoId: produto.id,
      descricao: produto.nome,
      codigo: produto.codigo,
      unidade: produto.unidade,
      valorUnitario: produto.precoVenda,
    });
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Itens de produtos ou serviços</h3>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-2 text-left w-2/5">Descrição</th>
              <th className="p-2 text-right w-1/12">Qtd</th>
              <th className="p-2 text-right w-1/6">Preço Un.</th>
              <th className="p-2 text-right w-1/6">Preço Total</th>
              <th className="p-2 text-center w-1/12">Ações</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {fields.map((item, index) => (
                <motion.tr
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-b border-white/10"
                >
                  <td className="p-1">
                    <Controller
                      name={`itens.${index}.descricao`}
                      control={control}
                      render={({ field }) => (
                        <AutocompleteInput
                          value={field.value}
                          onValueChange={(id, suggestions) => {
                            const selected = suggestions.find(s => s.value === id);
                            if (selected?.produto) {
                                handleProdutoSelect(index, selected.produto);
                            } else {
                                field.onChange(id);
                            }
                          }}
                          fetchSuggestions={fetchProdutos}
                          placeholder="Buscar produto ou serviço..."
                          initialLabel={field.value}
                        />
                      )}
                    />
                  </td>
                  <td className="p-1">
                    <Controller name={`itens.${index}.quantidade`} control={control} render={({ field }) => <GlassInput type="number" {...field} className="text-right" />} />
                  </td>
                  <td className="p-1">
                    <Controller name={`itens.${index}.valorUnitario`} control={control} render={({ field }) => <CurrencyInput value={field.value || 0} onAccept={(v) => field.onChange(parseFloat(v))} />} />
                  </td>
                  <td className="p-1">
                    <Controller name={`itens.${index}.valorTotal`} control={control} render={({ field }) => <CurrencyInput value={field.value || 0} onAccept={() => {}} disabled />} />
                  </td>
                  <td className="p-1 text-center">
                    <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => remove(index)} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-4">
        <GlassButton icon={Plus} onClick={handleAddItem} type="button">Adicionar outro item</GlassButton>
        <GlassButton icon={Search} variant="secondary" type="button">Busca avançada de itens</GlassButton>
      </div>
    </section>
  );
};
