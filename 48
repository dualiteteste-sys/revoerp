import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TipoEmbalagem } from '../../types';

interface EmbalagemIlustracaoProps {
  tipo: TipoEmbalagem;
}

const CaixaIlustracao = () => (
  <svg viewBox="0 0 100 100" className="w-full h-auto text-gray-400" aria-label="Esquema de caixa com Largura, Altura e Comprimento">
    <path d="M20 35 L70 10 L95 25 L45 50 Z" fill="rgba(156, 163, 175, 0.1)" stroke="currentColor" strokeWidth="1"/>
    <path d="M20 35 L20 80 L45 95 L45 50 Z" fill="rgba(156, 163, 175, 0.2)" stroke="currentColor" strokeWidth="1"/>
    <path d="M45 50 L45 95 L95 80 L95 25 Z" fill="rgba(156, 163, 175, 0.3)" stroke="currentColor" strokeWidth="1"/>
    <text x="10" y="60" fontSize="10" fill="#6b7280" className="font-sans">A</text>
    <text x="28" y="90" fontSize="10" fill="#6b7280" className="font-sans">C</text>
    <text x="70" y="90" fontSize="10" fill="#6b7280" className="font-sans">L</text>
  </svg>
);

const EnvelopeIlustracao = () => (
  <svg viewBox="0 0 100 100" className="w-full h-auto text-gray-400" aria-label="Esquema de envelope com Largura e Comprimento">
    <rect x="10" y="20" width="80" height="60" fill="rgba(156, 163, 175, 0.1)" stroke="currentColor" strokeWidth="1" />
    <path d="M10 20 L50 50 L90 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <text x="48" y="90" fontSize="10" fill="#6b7280" className="font-sans">L</text>
    <text x="0" y="55" fontSize="10" fill="#6b7280" className="font-sans">C</text>
  </svg>
);

const CilindroIlustracao = () => (
  <svg viewBox="0 0 100 100" className="w-full h-auto text-gray-400" aria-label="Esquema de cilindro com Comprimento e Diâmetro">
    <ellipse cx="50" cy="20" rx="30" ry="10" fill="rgba(156, 163, 175, 0.2)" stroke="currentColor" strokeWidth="1" />
    <path d="M20 20 L20 80 M80 20 L80 80" fill="none" stroke="currentColor" strokeWidth="1" />
    <ellipse cx="50" cy="80" rx="30" ry="10" fill="rgba(156, 163, 175, 0.1)" stroke="currentColor" strokeWidth="1" />
    <text x="0" y="55" fontSize="10" fill="#6b7280" className="font-sans">C</text>
    <text x="48" y="15" fontSize="10" fill="#6b7280" className="font-sans">D</text>
  </svg>
);

export const EmbalagemIlustracao: React.FC<EmbalagemIlustracaoProps> = ({ tipo }) => {
  const getIlustracao = () => {
    switch (tipo) {
      case TipoEmbalagem.CAIXA:
        return <CaixaIlustracao />;
      case TipoEmbalagem.ENVELOPE:
        return <EnvelopeIlustracao />;
      case TipoEmbalagem.CILINDRO:
        return <CilindroIlustracao />;
      default:
        return <CaixaIlustracao />;
    }
  };

  return (
    <div className="w-32 h-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={tipo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {getIlustracao()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
