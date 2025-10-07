import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePdv } from '../contexts/PdvContext';
import { CaixaFechado } from '../components/pdv/CaixaFechado';
import { TelaVenda } from '../components/pdv/TelaVenda';
import { AberturaCaixaModal } from '../components/pdv/AberturaCaixaModal';

export const PDV: React.FC = () => {
  const { isCaixaAberto, isAberturaModalOpen, handleOpenAberturaModal, handleCloseAberturaModal, handleAbrirCaixa } = usePdv();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <AnimatePresence mode="wait">
        {isCaixaAberto ? (
          <TelaVenda key="tela-venda" />
        ) : (
          <CaixaFechado key="caixa-fechado" onAbrirCaixa={handleOpenAberturaModal} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAberturaModalOpen && (
          <AberturaCaixaModal
            onAbrirCaixa={handleAbrirCaixa}
            onCancel={handleCloseAberturaModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
