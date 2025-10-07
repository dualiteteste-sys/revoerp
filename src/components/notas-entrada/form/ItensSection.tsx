import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { GlassButton } from '../../ui/GlassButton';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { NotaEntradaItem, Produto } from '../../../types';

interface ItensSectionProps {
  itens: NotaEntradaItem[];
  handleItemChange: (itemId: string, field: keyof NotaEntradaItem, value: any) => void;
  handleAddItem: () => void;
  handleRemoveItem: (itemId: string) => void;
  handleProdutoSelect: (itemId: string, produto: Produto) => void;
  fetchProdutos: (query: string) => Promise<any[]>;
}

export const ItensSection: React.FC<ItensSectionProps> = ({
  itens,
  handleItemChange,
  handleAddItem,
  handleRemoveItem,
  handleProdutoSelect,
  fetchProdutos,
}) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Itens da Nota</h3>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-2 text-left w-5/12">Produto</th>
              <th className="p-2 text-right w-2/12">Quantidade</th>
              <th className="p-2 text-right w-2/12">Valor Un. (Custo)</th>
              <th className="p-2 text-right w-2/12">Valor Total</th>
              <th className="p-2 text-center w-1/12">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(itens || []).map(item => (
              <tr key={item.id}>
                <td className="p-1">
                  <AutocompleteInput
                    value={item.produtoId}
                    onValueChange={(id, suggestions) => {
                      const selected = suggestions.find(s => s.value === id);
                      if (selected?.produto) handleProdutoSelect(item.id, selected.produto);
                    }}
                    fetchSuggestions={fetchProdutos}
                    initialLabel={item.descricao}
                    placeholder="Buscar produto..."
                  />
                </td>
                <td className="p-1">
                  <GlassInput
                    type="number"
                    value={item.quantidade}
                    onChange={e => handleItemChange(item.id, 'quantidade', e.target.value)}
                    className="text-right"
                  />
                </td>
                <td className="p-1">
                  <CurrencyInput
                    value={item.valorUnitario}
                    onAccept={v => handleItemChange(item.id, 'valorUnitario', parseFloat(v))}
                  />
                </td>
                <td className="p-1">
                  <CurrencyInput value={item.valorTotal} onAccept={() => {}} disabled />
                </td>
                <td className="p-1 text-center">
                  <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-4">
        <GlassButton icon={Plus} onClick={handleAddItem} type="button">Adicionar Item</GlassButton>
      </div>
    </section>
  );
};
