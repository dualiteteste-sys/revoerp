import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Produto, ProdutoAnuncio } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { GlassButton } from '../../ui/GlassButton';
import toast from 'react-hot-toast';

interface AnunciosTabProps {
  formData: Partial<Produto>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Produto>>>;
}

const ecommercesDisponiveis = ['Mercado Livre', 'Shopee', 'Amazon', 'Magazine Luiza', 'Loja Integrada', 'Outro'];

export const AnunciosTab: React.FC<AnunciosTabProps> = ({ formData, setFormData }) => {
  const anuncios = formData.anuncios || [];
  const [isAdding, setIsAdding] = useState(false);
  const [newAnuncio, setNewAnuncio] = useState<Omit<ProdutoAnuncio, 'id'>>({
    ecommerce: ecommercesDisponiveis[0],
    identificador: '',
    descricao: '',
  });

  const handleAddClick = () => {
    if (!newAnuncio.identificador.trim()) {
      toast.error('O campo "Identificador" é obrigatório.');
      return;
    }

    const isDuplicate = anuncios.some(
      a => a.ecommerce === newAnuncio.ecommerce && a.identificador === newAnuncio.identificador
    );

    if (isDuplicate) {
      toast.error('Já existe um anúncio com este E-commerce e Identificador.');
      return;
    }

    const anuncioToAdd: ProdutoAnuncio = {
      ...newAnuncio,
      id: crypto.randomUUID(),
    };

    setFormData(prev => ({
      ...prev,
      anuncios: [...(prev.anuncios || []), anuncioToAdd],
    }));

    setNewAnuncio({ ecommerce: ecommercesDisponiveis[0], identificador: '', descricao: '' });
    setIsAdding(false);
  };

  const handleRemoveAnuncio = (id: string) => {
    setFormData(prev => ({
      ...prev,
      anuncios: (prev.anuncios || []).filter(a => a.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Anúncios</h3>
        <p className="text-sm text-gray-600 mb-6">
          Ao enviar este produto para um e-commerce, um anúncio é automaticamente criado. Anúncios podem ser adicionados manualmente para vincular com produtos já publicados ou para vários anúncios deste mesmo produto.
        </p>

        <div className="space-y-4">
          <div className="hidden md:grid grid-cols-12 gap-4 px-2 pb-2 border-b border-white/20">
            <div className="col-span-3 font-medium text-gray-700">E-commerce</div>
            <div className="col-span-4 font-medium text-gray-700">Identificador</div>
            <div className="col-span-4 font-medium text-gray-700">Descrição</div>
            <div className="col-span-1"></div>
          </div>
          <AnimatePresence>
            {anuncios.map((anuncio) => (
              <motion.div
                key={anuncio.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-2 rounded-lg bg-glass-50"
              >
                <div className="col-span-1 md:col-span-3 font-medium text-gray-800">{anuncio.ecommerce}</div>
                <div className="col-span-1 md:col-span-4 text-gray-700">{anuncio.identificador}</div>
                <div className="col-span-1 md:col-span-4 text-gray-600 truncate">{anuncio.descricao || '-'}</div>
                <div className="col-span-1 flex justify-center">
                  <GlassButton
                    icon={Trash2}
                    size="sm"
                    variant="danger"
                    onClick={() => handleRemoveAnuncio(anuncio.id)}
                    aria-label={`Remover anúncio ${anuncio.identificador}`}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {anuncios.length === 0 && !isAdding && (
            <p className="text-center text-gray-500 py-4">Nenhum anúncio adicionado.</p>
          )}

          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 bg-glass-100 rounded-lg border border-white/30"
              >
                <div className="col-span-12 md:col-span-3">
                  <label className="text-sm text-gray-600 mb-1 block">E-commerce</label>
                  <select
                    className="glass-input"
                    value={newAnuncio.ecommerce}
                    onChange={(e) => setNewAnuncio(prev => ({...prev, ecommerce: e.target.value}))}
                  >
                    {ecommercesDisponiveis.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <GlassInput
                    label="Identificador *"
                    placeholder="ID ou SKU do anúncio"
                    value={newAnuncio.identificador}
                    onChange={(e) => setNewAnuncio(prev => ({...prev, identificador: e.target.value}))}
                  />
                </div>
                <div className="col-span-12 md:col-span-5">
                  <GlassInput
                    label="Descrição"
                    placeholder="Descrição interna"
                    value={newAnuncio.descricao}
                    onChange={(e) => setNewAnuncio(prev => ({...prev, descricao: e.target.value}))}
                  />
                </div>
                <div className="col-span-12 flex justify-end gap-2 mt-2">
                    <GlassButton variant="secondary" onClick={() => setIsAdding(false)}>Cancelar</GlassButton>
                    <GlassButton onClick={handleAddClick}>Salvar Anúncio</GlassButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isAdding && (
            <div className="mt-6">
                <GlassButton icon={Plus} onClick={() => setIsAdding(true)}>
                    Adicionar Anúncio
                </GlassButton>
            </div>
        )}
      </section>
    </div>
  );
};
