import React from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { OrdemCompraItem } from '../../../types';
import { GlassButton } from '../../ui/GlassButton';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { PercentageInput } from '../../ui/PercentageInput';

interface ItensSectionProps {
  itens: OrdemCompraItem[];
  handleItemChange: (itemId: string, field: keyof OrdemCompraItem, value: any) => void;
  handleAddItem: () => void;
  handleRemoveItem: (itemId: string) => void;
}

export const ItensSection: React.FC<ItensSectionProps> = ({ itens, handleItemChange, handleAddItem, handleRemoveItem }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Itens da Compra</h3>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-white/20">
              <th className="w-3/12 p-2 text-left">Item</th>
              <th className="w-2/12 p-2 text-left">Cód.</th>
              <th className="w-1/12 p-2 text-left">Qtde</th>
              <th className="w-1/12 p-2 text-left">UN</th>
              <th className="w-2/12 p-2 text-right">Preço un.</th>
              <th className="w-1/12 p-2 text-right">IPI %</th>
              <th className="w-2/12 p-2 text-right">Preço total</th>
              <th className="w-1/12 p-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {(itens || []).map((item) => (
              <tr key={item.id}>
                <td className="p-1"><GlassInput value={item.descricao} onChange={e => handleItemChange(item.id, 'descricao', e.target.value)} /></td>
                <td className="p-1"><GlassInput value={item.codigo || ''} onChange={e => handleItemChange(item.id, 'codigo', e.target.value)} /></td>
                <td className="p-1"><GlassInput type="number" value={item.quantidade} onChange={e => handleItemChange(item.id, 'quantidade', e.target.value)} /></td>
                <td className="p-1"><GlassInput value={item.unidade || ''} onChange={e => handleItemChange(item.id, 'unidade', e.target.value)} /></td>
                <td className="p-1"><CurrencyInput value={item.precoUnitario} onAccept={v => handleItemChange(item.id, 'precoUnitario', parseFloat(v))} /></td>
                <td className="p-1"><PercentageInput value={item.ipi || 0} onAccept={v => handleItemChange(item.id, 'ipi', parseFloat(v))} /></td>
                <td className="p-1"><CurrencyInput value={item.precoTotal} onAccept={() => {}} disabled /></td>
                <td className="p-1 text-center"><GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => handleRemoveItem(item.id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4 mt-4">
        <GlassButton icon={Plus} onClick={handleAddItem} type="button">Adicionar item</GlassButton>
        <GlassButton icon={Search} variant="secondary" type="button">Busca avançada de itens</GlassButton>
      </div>
    </section>
  );
};
