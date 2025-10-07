import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, X, CreditCard, Paperclip, Tag } from 'lucide-react';
import { GlassButton } from '../ui/GlassButton';
import { ContaReceber, OcorrenciaConta } from '../../types';
import { useContasReceber } from '../../hooks/data/useContasReceber';
import toast from 'react-hot-toast';
import { DadosContaTab } from './tabs/DadosContaTab';
import { AnexosTab } from './tabs/AnexosTab';
import { MarcadoresTab } from './tabs/MarcadoresTab';

interface ContaReceberFormProps {
  conta?: Partial<ContaReceber>;
  onCancel: () => void;
}

const getInitialData = (c?: Partial<ContaReceber>): Partial<ContaReceber> => ({
  id: c?.id,
  descricao: c?.descricao || '',
  valor: c?.valor || 0,
  dataVencimento: c?.dataVencimento ? new Date(c.dataVencimento) : new Date(),
  clienteId: c?.clienteId,
  formaRecebimento: c?.formaRecebimento,
  numeroDocumento: c?.numeroDocumento,
  historico: c?.historico,
  categoriaId: c?.categoriaId,
  ocorrencia: c?.ocorrencia || OcorrenciaConta.UNICA,
  marcadores: c?.marcadores || [],
  anexos: c?.anexos || [],
  createdAt: c?.createdAt ? new Date(c.createdAt) : new Date(),
});

export const ContaReceberForm: React.FC<ContaReceberFormProps> = ({ conta, onCancel }) => {
  const { createConta, updateConta } = useContasReceber();
  const [formData, setFormData] = useState<Partial<ContaReceber>>(getInitialData(conta));
  const [activeTab, setActiveTab] = useState('dadosConta');

  useEffect(() => {
    setFormData(getInitialData(conta));
  }, [conta]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clienteId) {
      toast.error("O campo 'Cliente' é obrigatório.");
      return;
    }
    if ((formData.valor ?? 0) <= 0) {
      toast.error("O valor da conta deve ser maior que zero.");
      return;
    }

    const { id, createdAt, updatedAt, cliente, fatura, anexos, ...dataToSave } = formData;
    const promise = formData.id
      ? updateConta(formData.id, dataToSave)
      : createConta(dataToSave);

    await promise;
    onCancel();
  };

  const tabs = useMemo(() => [
    { id: 'dadosConta', label: 'Dados da Conta', icon: CreditCard },
    { id: 'anexos', label: 'Anexos', icon: Paperclip },
    { id: 'marcadores', label: 'Marcadores', icon: Tag },
  ], []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dadosConta':
        return <DadosContaTab formData={formData} setFormData={setFormData} />;
      case 'anexos':
        return <AnexosTab contaId={formData.id} anexos={formData.anexos || []} setFormData={setFormData} />;
      case 'marcadores':
        return <MarcadoresTab formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
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
        className="w-full max-w-3xl h-auto max-h-[95vh] flex flex-col"
      >
        <div className="flex justify-end h-14 items-center">
          <GlassButton icon={X} variant="secondary" onClick={onCancel} />
        </div>
        
        <div className="flex-1 flex flex-col bg-glass-100 rounded-2xl shadow-glass-lg overflow-hidden border border-white/20">
          <div className="px-8 pt-4 border-b border-white/30">
              <div className="flex items-end -mb-px">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 pt-3 pb-2 transition-colors duration-300 text-sm font-medium border-b-2
                      ${activeTab === tab.id 
                        ? 'bg-glass-100 border-blue-600 text-blue-700 rounded-t-lg border-x border-t border-x-white/30 border-t-white/30' 
                        : 'border-transparent text-gray-600 hover:text-blue-600'
                      }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-8 min-h-[520px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-4 p-8 border-t border-white/30 bg-glass-200">
              <GlassButton type="submit" icon={Save}>
                Salvar
              </GlassButton>
              <GlassButton type="button" variant="secondary" onClick={onCancel}>
                Cancelar
              </GlassButton>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
