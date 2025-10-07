import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';
import { Embalagem, TipoEmbalagem } from '../../types';
import { EmbalagemIlustracao } from './EmbalagemIlustracao';
import { IMaskInput } from 'react-imask';
import toast from 'react-hot-toast';
import { InputWrapper } from '../ui/InputWrapper';

interface EmbalagemFormProps {
  embalagem?: Partial<Embalagem>;
  onSave: (embalagem: Omit<Embalagem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const getInitialData = (e?: Partial<Embalagem>): Partial<Embalagem> => ({
  id: e?.id,
  descricao: e?.descricao || '',
  tipo: e?.tipo || TipoEmbalagem.CAIXA,
  larguraCm: e?.larguraCm,
  alturaCm: e?.alturaCm,
  comprimentoCm: e?.comprimentoCm,
  diametroCm: e?.diametroCm,
  pesoKg: e?.pesoKg ?? 0,
});

export const EmbalagemForm: React.FC<EmbalagemFormProps> = ({ embalagem, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Embalagem>>(getInitialData(embalagem));

  useEffect(() => {
    setFormData(getInitialData(embalagem));
  }, [embalagem]);

  const handleChange = (field: keyof Embalagem, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumericChange = (field: keyof Embalagem, unmaskedValue: string, scale: number) => {
    const value = parseFloat(unmaskedValue);
    const parsedValue = isNaN(value) ? undefined : parseFloat(value.toFixed(scale));
    handleChange(field, parsedValue);
  };

  const validateForm = (): boolean => {
    if (!formData.descricao?.trim()) {
      toast.error('A descrição é obrigatória.');
      return false;
    }
    if ((formData.pesoKg ?? -1) < 0) {
      toast.error('O peso não pode ser negativo.');
      return false;
    }

    switch (formData.tipo) {
      case TipoEmbalagem.ENVELOPE:
        if (formData.larguraCm == null || formData.comprimentoCm == null) {
          toast.error('Para envelopes, informe a largura e o comprimento.');
          return false;
        }
        break;
      case TipoEmbalagem.CAIXA:
        if (formData.larguraCm == null || formData.alturaCm == null || formData.comprimentoCm == null) {
          toast.error('Para caixas, informe largura, altura e comprimento.');
          return false;
        }
        break;
      case TipoEmbalagem.CILINDRO:
        if (formData.comprimentoCm == null || formData.diametroCm == null) {
          toast.error('Para cilindros, informe o comprimento e o diâmetro.');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const dataToSave: Omit<Embalagem, 'id' | 'createdAt' | 'updatedAt'> = {
      descricao: formData.descricao!,
      tipo: formData.tipo!,
      pesoKg: formData.pesoKg!,
      larguraCm: formData.tipo === TipoEmbalagem.CAIXA || formData.tipo === TipoEmbalagem.ENVELOPE ? formData.larguraCm : undefined,
      alturaCm: formData.tipo === TipoEmbalagem.CAIXA ? formData.alturaCm : undefined,
      comprimentoCm: formData.tipo !== TipoEmbalagem.ENVELOPE ? formData.comprimentoCm : undefined,
      diametroCm: formData.tipo === TipoEmbalagem.CILINDRO ? formData.diametroCm : undefined,
    };

    onSave(dataToSave);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-500/40 backdrop-blur flex items-center justify-center z-50 p-8"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl h-auto max-h-[95vh] flex flex-col"
      >
        <div className="flex justify-end h-14 items-center">
          <GlassButton icon={X} variant="secondary" onClick={onCancel} />
        </div>
        
        <div className="flex-1 flex flex-col bg-glass-100 rounded-2xl shadow-glass-lg overflow-hidden border border-white/20">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 space-y-8 min-h-[450px]">
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <InputWrapper label="Descrição *">
                      <GlassInput value={formData.descricao || ''} onChange={(e) => handleChange('descricao', e.target.value)} />
                    </InputWrapper>
                    <div className="grid grid-cols-2 gap-4">
                      <InputWrapper label="Tipo *">
                        <select className="glass-input" value={formData.tipo} onChange={(e) => handleChange('tipo', e.target.value as TipoEmbalagem)}>
                          <option value={TipoEmbalagem.CAIXA}>Pacote / Caixa</option>
                          <option value={TipoEmbalagem.ENVELOPE}>Envelope</option>
                          <option value={TipoEmbalagem.CILINDRO}>Rolo / Cilindro</option>
                        </select>
                      </InputWrapper>
                      <InputWrapper label="Peso (Kg) *">
                        <IMaskInput mask={Number} radix="," thousandsSeparator="." scale={3} padFractionalZeros normalizeZeros value={String(formData.pesoKg ?? '0.000')} onAccept={(v) => handleNumericChange('pesoKg', v as string, 3)} className="glass-input" placeholder="0,000" />
                      </InputWrapper>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-4 bg-glass-50 rounded-xl">
                    <EmbalagemIlustracao tipo={formData.tipo || TipoEmbalagem.CAIXA} />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Dimensões</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <AnimatePresence mode="popLayout">
                    {(formData.tipo === TipoEmbalagem.CAIXA || formData.tipo === TipoEmbalagem.ENVELOPE) && (
                      <motion.div key="largura" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                        <InputWrapper label="Largura (cm)">
                          <IMaskInput mask={Number} radix="," scale={1} padFractionalZeros normalizeZeros value={String(formData.larguraCm ?? '0.0')} onAccept={(v) => handleNumericChange('larguraCm', v as string, 1)} className="glass-input" placeholder="0,0" />
                        </InputWrapper>
                      </motion.div>
                    )}
                    {formData.tipo === TipoEmbalagem.CAIXA && (
                      <motion.div key="altura" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                        <InputWrapper label="Altura (cm)">
                          <IMaskInput mask={Number} radix="," scale={1} padFractionalZeros normalizeZeros value={String(formData.alturaCm ?? '0.0')} onAccept={(v) => handleNumericChange('alturaCm', v as string, 1)} className="glass-input" placeholder="0,0" />
                        </InputWrapper>
                      </motion.div>
                    )}
                    {(formData.tipo === TipoEmbalagem.CAIXA || formData.tipo === TipoEmbalagem.ENVELOPE || formData.tipo === TipoEmbalagem.CILINDRO) && (
                      <motion.div key="comprimento" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                        <InputWrapper label="Comprimento (cm)">
                          <IMaskInput mask={Number} radix="," scale={1} padFractionalZeros normalizeZeros value={String(formData.comprimentoCm ?? '0.0')} onAccept={(v) => handleNumericChange('comprimentoCm', v as string, 1)} className="glass-input" placeholder="0,0" />
                        </InputWrapper>
                      </motion.div>
                    )}
                    {formData.tipo === TipoEmbalagem.CILINDRO && (
                      <motion.div key="diametro" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                        <InputWrapper label="Diâmetro (cm)">
                          <IMaskInput mask={Number} radix="," scale={1} padFractionalZeros normalizeZeros value={String(formData.diametroCm ?? '0.0')} onAccept={(v) => handleNumericChange('diametroCm', v as string, 1)} className="glass-input" placeholder="0,0" />
                        </InputWrapper>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>
            </div>

            <div className="flex gap-4 p-8 border-t border-white/30 bg-glass-200">
              <GlassButton type="submit" icon={Save}>Salvar</GlassButton>
              <GlassButton type="button" variant="secondary" onClick={onCancel}>Cancelar</GlassButton>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
