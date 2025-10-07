import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { Produto, ProdutoAtributo } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { GlassButton } from '../../ui/GlassButton';
import toast from 'react-hot-toast';

interface AtributosTabProps {
  formData: Partial<Produto>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Produto>>>;
}

const sugestoesAtributos = ['Cor', 'Tamanho', 'Voltagem', 'Material', 'Capacidade', 'Dimensões'];

export const AtributosTab: React.FC<AtributosTabProps> = ({ formData, setFormData }) => {
  const atributos = formData.atributos || [];

  const handleAddAtributo = () => {
    const newAtributo: ProdutoAtributo = {
      id: crypto.randomUUID(),
      atributo: '',
      valor: '',
    };
    setFormData(prev => ({
      ...prev,
      atributos: [...(prev.atributos || []), newAtributo],
    }));
  };

  const handleRemoveAtributo = (id: string) => {
    setFormData(prev => ({
      ...prev,
      atributos: (prev.atributos || []).filter(a => a.id !== id),
    }));
  };

  const handleAtributoChange = (id: string, field: 'atributo' | 'valor', value: string) => {
    setFormData(prev => ({
      ...prev,
      atributos: (prev.atributos || []).map(a =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    }));
  };

  const handleBlur = (id: string, field: 'atributo' | 'valor') => {
    const atributo = (formData.atributos || []).find(a => a.id === id);
    if (!atributo) return;

    const trimmedValue = atributo[field].trim();
    if (trimmedValue !== atributo[field]) {
        handleAtributoChange(id, field, trimmedValue);
    }

    if (field === 'atributo' && trimmedValue) {
        const isDuplicate = (formData.atributos || []).some(a => a.id !== id && a.atributo.toLowerCase() === trimmedValue.toLowerCase());
        if (isDuplicate) {
            toast.error(`O atributo "${trimmedValue}" já existe.`);
            handleAtributoChange(id, 'atributo', '');
        }
    }
  };

  const handleSugestao = () => {
    const atributosExistentes = new Set(atributos.map(a => a.atributo.toLowerCase()));
    const novasSugestoes = sugestoesAtributos
      .filter(s => !atributosExistentes.has(s.toLowerCase()))
      .map(s => ({
        id: crypto.randomUUID(),
        atributo: s,
        valor: '',
      }));
    
    if (novasSugestoes.length > 0) {
        setFormData(prev => ({
            ...prev,
            atributos: [...(prev.atributos || []), ...novasSugestoes],
        }));
        toast.success('Atributos sugeridos foram adicionados!');
    } else {
        toast.error("Todas as sugestões de atributos já foram adicionadas.");
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Atributos do Produto</h3>
            <GlassButton icon={Sparkles} onClick={handleSugestao}>
                Sugerir Atributos
            </GlassButton>
        </div>
        <p className="text-sm text-gray-600 mb-6">
            Adicione características como cor, tamanho ou material. Estes atributos ajudam a criar variações do produto.
        </p>

        <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 px-2 pb-2 border-b border-white/20">
                <div className="col-span-5 font-medium text-gray-700">Atributo</div>
                <div className="col-span-6 font-medium text-gray-700">Valor</div>
                <div className="col-span-1"></div>
            </div>
            <AnimatePresence>
                {atributos.map((attr) => (
                    <motion.div
                        key={attr.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-12 gap-4 items-center"
                    >
                        <div className="col-span-5">
                            <GlassInput
                                placeholder="Ex: Cor, Tamanho..."
                                value={attr.atributo}
                                onChange={(e) => handleAtributoChange(attr.id, 'atributo', e.target.value)}
                                onBlur={() => handleBlur(attr.id, 'atributo')}
                                maxLength={60}
                                aria-label={`Nome do atributo ${attr.id}`}
                            />
                        </div>
                        <div className="col-span-6">
                            <GlassInput
                                placeholder="Ex: Vermelho, P, M, G..."
                                value={attr.valor}
                                onChange={(e) => handleAtributoChange(attr.id, 'valor', e.target.value)}
                                onBlur={() => handleBlur(attr.id, 'valor')}
                                maxLength={120}
                                aria-label={`Valor do atributo ${attr.id}`}
                            />
                        </div>
                        <div className="col-span-1 flex justify-center">
                            <GlassButton
                                icon={Trash2}
                                size="sm"
                                variant="danger"
                                onClick={() => handleRemoveAtributo(attr.id)}
                                aria-label={`Remover atributo ${attr.atributo}`}
                            />
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {atributos.length === 0 && (
                <p className="text-center text-gray-500 py-4">Nenhum atributo adicionado.</p>
            )}
        </div>

        <div className="mt-6">
            <GlassButton icon={Plus} onClick={handleAddAtributo}>
                Adicionar Atributo
            </GlassButton>
        </div>
      </section>
    </div>
  );
};
