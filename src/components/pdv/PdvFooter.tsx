import React, { useState } from 'react';
import { usePdv } from '../../contexts/PdvContext';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { PagamentoModal } from './PagamentoModal';

export const PdvFooter: React.FC = () => {
  const { totalVenda, totalItens, totalQuantidade, finalizarVenda, salvarParaDepois, cancelarVenda } = usePdv();
  const [isPagamentoOpen, setIsPagamentoOpen] = useState(false);

  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleFinalizar = () => {
    // setIsPagamentoOpen(true); // Descomentar quando o modal de pagamento estiver pronto
    finalizarVenda(); // Finaliza direto por enquanto
  };

  return (
    <>
      <footer className="mt-6">
        <GlassCard>
          <div className="flex justify-between items-center">
            <div className="flex gap-6 text-sm text-gray-600">
              <div>Itens: <span className="font-bold text-gray-800">{totalItens}</span></div>
              <div>Quant.: <span className="font-bold text-gray-800">{totalQuantidade.toFixed(2)}</span></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total da Venda</p>
                <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalVenda)}</p>
              </div>
              <GlassButton size="lg" onClick={handleFinalizar}>
                Continuar (Ctrl+Enter)
              </GlassButton>
              <GlassButton variant="secondary" onClick={salvarParaDepois}>Salvar (F10)</GlassButton>
              <GlassButton variant="secondary" onClick={cancelarVenda}>Cancelar (Esc)</GlassButton>
            </div>
          </div>
        </GlassCard>
      </footer>
      {isPagamentoOpen && (
        <PagamentoModal 
          valorTotal={totalVenda}
          onClose={() => setIsPagamentoOpen(false)}
          onFinalizar={finalizarVenda}
        />
      )}
    </>
  );
};
