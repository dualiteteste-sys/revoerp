import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePdv } from '../../contexts/PdvContext';
import { PdvHeader } from './PdvHeader';
import { PdvCart } from './PdvCart';
import { PdvSidePanel } from './PdvSidePanel';
import { PdvFooter } from './PdvFooter';
import { usePdvShortcuts } from '../../hooks/usePdvShortcuts';
import { AutocompleteInput } from '../ui/AutocompleteInput';
import { Produto } from '../../types';
import { useService } from '../../hooks/useService';

export const TelaVenda: React.FC = () => {
  const { addToCart, finalizarVenda, salvarParaDepois, cancelarVenda } = usePdv();
  const produtoService = useService('produto');
  const clienteInputRef = useRef<HTMLDivElement>(null);
  const vendedorInputRef = useRef<HTMLDivElement>(null);
  const produtoInputRef = useRef<HTMLInputElement>(null);

  const fetchProdutos = async (query: string) => {
    const results = await produtoService.search(query);
    return results.map(p => ({
      value: p.id,
      label: `${p.nome} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.precoVenda)}`,
      produto: p
    }));
  };

  const handleProdutoSelect = (produtoId: string | null, suggestions: any[]) => {
    if (produtoId) {
      const selected = suggestions.find(s => s.value === produtoId);
      if (selected?.produto) {
        addToCart(selected.produto as Produto, 1);
      }
    }
  };

  usePdvShortcuts({
    onAbrirCaixa: () => {},
    onCancelarModal: () => {},
    onContinuar: finalizarVenda,
    onSalvarParaDepois: salvarParaDepois,
    onCancelarVenda: cancelarVenda,
    onFocusBuscaProduto: () => produtoInputRef.current?.focus(),
    onFocusCliente: () => clienteInputRef.current?.querySelector('input')?.focus(),
    onFocusVendedor: () => vendedorInputRef.current?.querySelector('input')?.focus(),
    onMostrarAtalhos: () => alert('Atalhos: ...'),
  }, [finalizarVenda, salvarParaDepois, cancelarVenda]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 h-full"
    >
      <PdvHeader />
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div ref={produtoInputRef}>
            <AutocompleteInput
              value=""
              onValueChange={handleProdutoSelect}
              fetchSuggestions={fetchProdutos}
              placeholder="Pesquise por descrição, código (SKU) ou GTIN"
            />
          </div>
          <PdvCart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <PdvSidePanel clienteInputRef={clienteInputRef} vendedorInputRef={vendedorInputRef} />
        </div>
      </div>
      <PdvFooter />
    </motion.div>
  );
};
