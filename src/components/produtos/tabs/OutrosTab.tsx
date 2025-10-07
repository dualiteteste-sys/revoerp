import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Produto, ProdutoFornecedor, Cliente } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { GlassButton } from '../../ui/GlassButton';
import { useCrud } from '../../../hooks/useCrud';
import { ClienteService } from '../../../services/ClienteService';
import { IMaskInput } from 'react-imask';
import toast from 'react-hot-toast';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface OutrosTabProps {
  formData: Partial<Produto>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Produto>>>;
}

export const OutrosTab: React.FC<OutrosTabProps> = ({ formData, setFormData }) => {
  const clienteService = useMemo(() => new ClienteService(), []);
  const { items: todosClientes } = useCrud<Cliente>({ service: clienteService, entityName: 'Cliente' });
  const fornecedoresDisponiveis = useMemo(() => todosClientes.filter(c => c.isFornecedor), [todosClientes]);

  const [newFornecedor, setNewFornecedor] = useState({ fornecedorId: '', codigoNoFornecedor: '' });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumericChange = (field: keyof Produto, value: string, isInt: boolean = false) => {
    const num = isInt ? parseInt(value, 10) : parseFloat(value.replace(',', '.'));
    handleChange(field, isNaN(num) ? undefined : num);
  };

  const handleAddFornecedor = () => {
    if (!newFornecedor.fornecedorId) {
      toast.error("Selecione um fornecedor.");
      return;
    }
    const isDuplicate = (formData.fornecedores || []).some(f => f.fornecedorId === newFornecedor.fornecedorId);
    if (isDuplicate) {
      toast.error("Este fornecedor já foi adicionado.");
      return;
    }
    
    const fornecedorInfo = fornecedoresDisponiveis.find(f => f.id === newFornecedor.fornecedorId);

    const fornecedorToAdd: ProdutoFornecedor = {
      id: crypto.randomUUID(),
      produtoId: formData.id || '',
      fornecedorId: newFornecedor.fornecedorId,
      codigoNoFornecedor: newFornecedor.codigoNoFornecedor,
      fornecedor: { nome: fornecedorInfo?.nome || 'Desconhecido' },
    };

    setFormData(prev => ({
      ...prev,
      fornecedores: [...(prev.fornecedores || []), fornecedorToAdd],
    }));
    setNewFornecedor({ fornecedorId: '', codigoNoFornecedor: '' });
  };

  const handleRemoveFornecedor = (id: string) => {
    setFormData(prev => ({
      ...prev,
      fornecedores: (prev.fornecedores || []).filter(f => f.id !== id),
    }));
  };

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Outras Informações</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputWrapper label="Unidade por caixa">
            <GlassInput type="number" placeholder="Itens por embalagem" value={formData.unidadePorCaixa ?? ''} onChange={(e) => handleNumericChange('unidadePorCaixa', e.target.value, true)} />
          </InputWrapper>
          <InputWrapper label="Custo">
            <CurrencyInput value={formData.custo ?? 0} onAccept={(v) => handleNumericChange('custo', v)} />
          </InputWrapper>
          <InputWrapper label="Linha de produto">
            <GlassInput placeholder="Selecione" value={formData.linhaProduto || ''} onChange={(e) => handleChange('linhaProduto', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Garantia" helpIcon>
            <GlassInput placeholder="Exemplo: 3 meses" value={formData.garantia || ''} onChange={(e) => handleChange('garantia', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Markup">
            <IMaskInput mask="0.00000" value={String(formData.markup ?? '')} onAccept={(v) => handleNumericChange('markup', v as string)} className="glass-input" placeholder="0,00000" />
          </InputWrapper>
          <InputWrapper label="Permitir inclusão nas vendas">
            <select className="glass-input" value={formData.permitirVendas ? 'Sim' : 'Não'} onChange={(e) => handleChange('permitirVendas', e.target.value === 'Sim')}>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </InputWrapper>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Informações Tributárias Adicionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputWrapper label="GTIN/EAN tributável" helpText="Utilizado apenas para Caixa, Fardo, Lote, etc.">
            <GlassInput value={formData.gtinTributavel || ''} onChange={(e) => handleChange('gtinTributavel', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Unidade tributável" helpText="Campo usado em notas fiscais de exportação">
            <GlassInput value={formData.unidadeTributavel || ''} onChange={(e) => handleChange('unidadeTributavel', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Fator de conversão" helpText="Campo usado em notas fiscais de exportação">
            <GlassInput type="number" value={formData.fatorConversao ?? ''} onChange={(e) => handleNumericChange('fatorConversao', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Código de Enquadramento IPI" helpText="Código de Enquadramento Legal do IPI">
            <GlassInput value={formData.codigoEnquadramentoIpi || ''} onChange={(e) => handleChange('codigoEnquadramentoIpi', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Valor do IPI fixo" helpText="Somente para produtos com tributação específica">
            <CurrencyInput value={formData.valorIpiFixo ?? 0} onAccept={(v) => handleNumericChange('valorIpiFixo', v)} />
          </InputWrapper>
          <InputWrapper label="EX TIPI">
            <GlassInput value={formData.exTipi || ''} onChange={(e) => handleChange('exTipi', e.target.value)} />
          </InputWrapper>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Fornecedores</h3>
        <div className="space-y-2 mb-4">
          <AnimatePresence>
            {(formData.fornecedores || []).map(f => (
              <motion.div key={f.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg bg-glass-50">
                <p className="col-span-6 font-medium">{f.fornecedor?.nome}</p>
                <p className="col-span-5 text-gray-600">{f.codigoNoFornecedor || 'N/A'}</p>
                <div className="col-span-1 flex justify-center">
                  <GlassButton icon={Trash2} size="sm" variant="danger" onClick={() => handleRemoveFornecedor(f.id)} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-12 gap-4 items-end p-4 bg-glass-100 rounded-lg border border-white/30">
          <div className="col-span-6">
            <label className="text-sm text-gray-600 mb-1 block">Nome</label>
            <select className="glass-input" value={newFornecedor.fornecedorId} onChange={(e) => setNewFornecedor(p => ({...p, fornecedorId: e.target.value}))}>
              <option value="">Selecione um fornecedor</option>
              {fornecedoresDisponiveis.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
            </select>
          </div>
          <div className="col-span-4">
            <GlassInput label="Código no Fornecedor" value={newFornecedor.codigoNoFornecedor} onChange={(e) => setNewFornecedor(p => ({...p, codigoNoFornecedor: e.target.value}))} />
          </div>
          <div className="col-span-2">
            <GlassButton icon={Plus} onClick={handleAddFornecedor} className="w-full">Adicionar</GlassButton>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Observações</h3>
        <InputWrapper label="Observações gerais sobre o produto">
          <textarea value={formData.observacoesProduto || ''} onChange={(e) => handleChange('observacoesProduto', e.target.value)} className="glass-input h-32 resize-y" />
        </InputWrapper>
      </section>
    </div>
  );
};
