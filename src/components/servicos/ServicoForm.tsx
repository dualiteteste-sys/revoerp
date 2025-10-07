import React, { useCallback } from 'react';
import { Search } from 'lucide-react';
import { GlassInput } from '../ui/GlassInput';
import { GlassButton } from '../ui/GlassButton';
import { Servico, SituacaoServico } from '../../types';
import toast from 'react-hot-toast';
import { useFormState } from '../../hooks/useFormState';
import { GenericForm } from '../ui/GenericForm';
import { CurrencyInput } from '../ui/CurrencyInput';
import { InputWrapper } from '../ui/InputWrapper';

interface ServicoFormProps {
  servico?: Partial<Servico>;
  onSave: (servico: Partial<Servico>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const getInitialData = (s?: Partial<Servico>): Partial<Servico> => ({
  id: s?.id,
  descricao: s?.descricao || '',
  codigo: s?.codigo || '',
  preco: s?.preco ?? 0,
  unidade: s?.unidade || '',
  situacao: s?.situacao || SituacaoServico.ATIVO,
  codigoServico: s?.codigoServico || '',
  nbs: s?.nbs || '',
  descricaoComplementar: s?.descricaoComplementar || '',
  observacoes: s?.observacoes || '',
});

export const ServicoForm: React.FC<ServicoFormProps> = ({ servico, onSave, onCancel, loading }) => {
  const getInitial = useCallback(() => getInitialData(servico), [servico]);
  const { formData, handleChange } = useFormState<Servico>(getInitial);

  const handlePriceChange = (unmaskedValue: string) => {
    const newValue = parseFloat(unmaskedValue);
    handleChange('preco', isNaN(newValue) ? 0 : newValue);
  };

  const handleSave = () => {
    if (!formData.descricao?.trim()) {
      toast.error('A descrição do serviço é obrigatória.');
      return;
    }
    onSave(formData);
  };

  return (
    <GenericForm
      title={servico?.id ? 'Editar Serviço' : 'Novo Serviço'}
      onSave={handleSave}
      onCancel={onCancel}
      loading={loading}
    >
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Identificação</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputWrapper label="Descrição *" className="md:col-span-2">
            <GlassInput placeholder="Descrição completa do serviço" value={formData.descricao || ''} onChange={(e) => handleChange('descricao', e.target.value)} required />
          </InputWrapper>
          <InputWrapper label="Código (Opcional)">
            <GlassInput placeholder="Código ou referência" value={formData.codigo || ''} onChange={(e) => handleChange('codigo', e.target.value)} />
          </InputWrapper>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Preço / Unidade / Situação</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputWrapper label="Preço *">
            <CurrencyInput value={formData.preco ?? 0} onAccept={handlePriceChange} />
          </InputWrapper>
          <InputWrapper label="Unidade *">
            <GlassInput placeholder="Ex: Pc, Kg,..." value={formData.unidade || ''} onChange={(e) => handleChange('unidade', e.target.value)} maxLength={10} required />
          </InputWrapper>
          <InputWrapper label="Situação">
            <select className="glass-input" value={formData.situacao} onChange={(e) => handleChange('situacao', e.target.value as SituacaoServico)}>
              {Object.values(SituacaoServico).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </InputWrapper>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Códigos de Classificação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWrapper label="Código do serviço">
            <div className="flex gap-2">
              <GlassInput value={formData.codigoServico || ''} onChange={(e) => handleChange('codigoServico', e.target.value)} />
              <GlassButton icon={Search} variant="secondary" onClick={() => toast.success('Busca de código em breve!')} type="button" />
            </div>
          </InputWrapper>
          <InputWrapper label="Nomenclatura Brasileira de Serviço (NBS)" helpText="Necessária para o IBPT">
            <div className="flex gap-2">
              <GlassInput value={formData.nbs || ''} onChange={(e) => handleChange('nbs', e.target.value)} />
              <GlassButton icon={Search} variant="secondary" onClick={() => toast.success('Busca de NBS em breve!')} type="button" />
            </div>
          </InputWrapper>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Descrição Complementar</h3>
        <InputWrapper label="" helpText="Campo exibido em propostas comerciais e pedidos de venda.">
          <textarea value={formData.descricaoComplementar || ''} onChange={(e) => handleChange('descricaoComplementar', e.target.value)} className="glass-input h-32 resize-y" />
        </InputWrapper>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Observações</h3>
        <InputWrapper label="Observações gerais sobre o serviço.">
          <textarea value={formData.observacoes || ''} onChange={(e) => handleChange('observacoes', e.target.value)} className="glass-input h-24 resize-y" placeholder="Observações gerais sobre o serviço." />
        </InputWrapper>
      </section>
    </GenericForm>
  );
};
