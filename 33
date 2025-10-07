import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Paperclip, Banknote } from 'lucide-react';
import { Contrato, ContratoSituacao, ContratoPeriodicidade, ContratoVencimentoRegra } from '../../types';
import toast from 'react-hot-toast';
import { useFormState } from '../../hooks/useFormState';
import { GenericForm } from '../ui/GenericForm';
import { DadosContratoTab } from './tabs/DadosContratoTab';
import { FaturamentoTab } from './tabs/FaturamentoTab';
import { AnexosTab } from './tabs/AnexosTab';

interface ContratoFormProps {
  contrato?: Partial<Contrato>;
  onSave: (contrato: Partial<Contrato>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const getInitialData = (c?: Partial<Contrato>): Partial<Contrato> => ({
  id: c?.id,
  clienteId: c?.clienteId || '',
  descricao: c?.descricao || '',
  situacao: c?.situacao || ContratoSituacao.ATIVO,
  dataContrato: c?.dataContrato ? new Date(c.dataContrato) : new Date(),
  valor: c?.valor || 0,
  vencimentoRegra: c?.vencimentoRegra || ContratoVencimentoRegra.MES_CORRENTE,
  diaVencimento: c?.diaVencimento || 10,
  periodicidade: c?.periodicidade || ContratoPeriodicidade.MENSAL,
  categoriaId: c?.categoriaId,
  formaRecebimento: c?.formaRecebimento,
  emitirNf: c?.emitirNf ?? false,
  dadosAdicionais: c?.dadosAdicionais,
  marcadores: c?.marcadores || [],
  anexos: c?.anexos || [],
  createdAt: c?.createdAt,
  updatedAt: c?.updatedAt,
});

export const ContratoForm: React.FC<ContratoFormProps> = ({ contrato, onSave, onCancel, loading }) => {
  const getInitial = useCallback(() => getInitialData(contrato), [contrato]);
  const { formData, setFormData } = useFormState<Contrato>(getInitial);
  const [activeTab, setActiveTab] = useState('dadosContrato');

  const validateForm = (): boolean => {
    if (!formData.clienteId) {
      toast.error("O campo 'Cliente' é obrigatório.");
      return false;
    }
    if (!formData.descricao?.trim()) {
      toast.error("O campo 'Descrição' é obrigatório.");
      return false;
    }
    if ((formData.valor ?? 0) < 0) {
      toast.error("O valor do contrato não pode ser negativo.");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };
  
  const tabs = useMemo(() => [
    { id: 'dadosContrato', label: 'Dados do Contrato', icon: FileText },
    { id: 'faturamento', label: 'Faturamento', icon: Banknote },
    { id: 'anexos', label: 'Anexos', icon: Paperclip },
  ], []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dadosContrato':
        return <DadosContratoTab formData={formData} setFormData={setFormData} />;
      case 'faturamento':
        return <FaturamentoTab formData={formData} setFormData={setFormData} />;
      case 'anexos':
        return <AnexosTab entityId={formData.id} attachments={formData.anexos || []} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <GenericForm
      title={contrato?.id ? 'Editar Contrato' : 'Novo Contrato'}
      onSave={handleSave}
      onCancel={onCancel}
      loading={loading}
      size="max-w-4xl"
    >
      <div className="px-8 pt-4 border-b border-white/30 -mt-8 -mx-8 mb-8">
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-[400px]"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
    </GenericForm>
  );
};
