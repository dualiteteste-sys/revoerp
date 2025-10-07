import React from 'react';
import { IMaskInput } from 'react-imask';
import { Produto, TipoProduto, OrigemProduto, TipoEmbalagemProduto, EmbalagemProduto } from '../../../types';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface DadosGeraisTabProps {
  formData: Partial<Produto>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Produto>>>;
}

export const DadosGeraisTab: React.FC<DadosGeraisTabProps> = ({ formData, setFormData }) => {
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNumericChange = (field: string, value: string, isInt: boolean = false) => {
    const num = isInt ? parseInt(value, 10) : parseFloat(value);
    handleChange(field, isNaN(num) ? null : num);
  };

  const handlePriceChange = (unmaskedValue: string) => {
    const newValue = parseFloat(unmaskedValue);
    handleChange('precoVenda', isNaN(newValue) ? 0 : newValue);
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InputWrapper label="Tipo do Produto *">
            <select className="glass-input" value={formData.tipoProduto} onChange={(e) => handleChange('tipoProduto', e.target.value)}>
              {Object.values(TipoProduto).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </InputWrapper>
          <div className="md:col-span-3">
            <InputWrapper label="Nome do produto *" helpText="Necessário para emissão de Nota Fiscal">
              <GlassInput value={formData.nome || ''} onChange={(e) => handleChange('nome', e.target.value)} maxLength={120} />
            </InputWrapper>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InputWrapper label="Código de barras (GTIN)" helpText="Global Trade Item Number">
            <GlassInput value={formData.codigoBarras || ''} onChange={(e) => handleChange('codigoBarras', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Código (SKU) ou referência">
            <GlassInput value={formData.codigo || ''} onChange={(e) => handleChange('codigo', e.target.value)} maxLength={50} />
          </InputWrapper>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Dados Fiscais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWrapper label="Origem do produto *">
            <select className="glass-input" value={formData.origem} onChange={(e) => handleChange('origem', e.target.value)}>
              {Object.values(OrigemProduto).map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </InputWrapper>
          <InputWrapper label="Unidade de Medida *">
            <GlassInput value={formData.unidade || ''} onChange={(e) => handleChange('unidade', e.target.value)} maxLength={10} />
          </InputWrapper>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <InputWrapper label="NCM *">
             <IMaskInput mask="0000.00.00" value={formData.ncm || ''} onAccept={(v) => handleChange('ncm', v as string)} className="glass-input" placeholder="Ex: 1001.10.10" />
          </InputWrapper>
          <InputWrapper label="Código CEST">
             <IMaskInput mask="00.000.00" value={formData.cest || ''} onAccept={(v) => handleChange('cest', v as string)} className="glass-input" placeholder="Ex: 01.003.00" />
          </InputWrapper>
           <InputWrapper label="Preço de venda *">
             <CurrencyInput value={formData.precoVenda ?? 0} onAccept={handlePriceChange} />
          </InputWrapper>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Dimensões e Peso</h3>
        <div className="flex gap-8">
            <div className="w-32 flex-shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-auto text-gray-400">
                    <path d="M20 35 L70 10 L95 25 L45 50 Z" fill="rgba(156, 163, 175, 0.1)" stroke="#9ca3af" strokeWidth="1"/>
                    <path d="M20 35 L20 80 L45 95 L45 50 Z" fill="rgba(156, 163, 175, 0.2)" stroke="#9ca3af" strokeWidth="1"/>
                    <path d="M45 50 L45 95 L95 80 L95 25 Z" fill="rgba(156, 163, 175, 0.3)" stroke="#9ca3af" strokeWidth="1"/>
                    <text x="10" y="60" fontSize="10" fill="#6b7280" className="font-sans">A</text>
                    <text x="28" y="90" fontSize="10" fill="#6b7280" className="font-sans">C</text>
                    <text x="70" y="90" fontSize="10" fill="#6b7280" className="font-sans">L</text>
                </svg>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputWrapper label="Peso Líquido (kg)"><GlassInput type="number" value={formData.pesoLiquido ?? ''} onChange={(e) => handleNumericChange('pesoLiquido', e.target.value)} /></InputWrapper>
                <InputWrapper label="Peso Bruto (kg)"><GlassInput type="number" value={formData.pesoBruto ?? ''} onChange={(e) => handleNumericChange('pesoBruto', e.target.value)} /></InputWrapper>
                <InputWrapper label="Nº de volumes"><GlassInput type="number" value={formData.volumes ?? ''} onChange={(e) => handleNumericChange('volumes', e.target.value, true)} /></InputWrapper>
                <InputWrapper label="Largura (cm)"><GlassInput type="number" value={formData.largura ?? ''} onChange={(e) => handleNumericChange('largura', e.target.value)} /></InputWrapper>
                <InputWrapper label="Altura (cm)"><GlassInput type="number" value={formData.altura ?? ''} onChange={(e) => handleNumericChange('altura', e.target.value)} /></InputWrapper>
                <InputWrapper label="Comprimento (cm)"><GlassInput type="number" value={formData.comprimento ?? ''} onChange={(e) => handleNumericChange('comprimento', e.target.value)} /></InputWrapper>
                <div className="md:col-span-3 grid grid-cols-2 gap-4">
                    <InputWrapper label="Tipo da embalagem">
                        <select className="glass-input" value={formData.tipoEmbalagem || ''} onChange={(e) => handleChange('tipoEmbalagem', e.target.value)}>
                        {Object.values(TipoEmbalagemProduto).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </InputWrapper>
                    <InputWrapper label="Embalagem">
                        <select className="glass-input" value={formData.embalagem || ''} onChange={(e) => handleChange('embalagem', e.target.value)}>
                        {Object.values(EmbalagemProduto).map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </InputWrapper>
                </div>
            </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Estoque</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWrapper label="Controlar estoque?">
                <select className="glass-input" value={formData.controlarEstoque ? 'Sim' : 'Não'} onChange={(e) => handleChange('controlarEstoque', e.target.value === 'Sim')}>
                    <option>Sim</option>
                    <option>Não</option>
                </select>
            </InputWrapper>
            <InputWrapper label="Controlar lotes?">
                <select className="glass-input" value={formData.controlarLotes ? 'Sim' : 'Não'} onChange={(e) => handleChange('controlarLotes', e.target.value === 'Sim')}>
                    <option>Sim</option>
                    <option>Não</option>
                </select>
            </InputWrapper>
        </div>
        {formData.controlarEstoque && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <InputWrapper label="Estoque inicial"><GlassInput type="number" value={formData.estoqueInicial ?? ''} onChange={(e) => handleNumericChange('estoqueInicial', e.target.value, true)} /></InputWrapper>
                <InputWrapper label="Estoque mínimo"><GlassInput type="number" value={formData.estoqueMinimo ?? ''} onChange={(e) => handleNumericChange('estoqueMinimo', e.target.value, true)} /></InputWrapper>
                <InputWrapper label="Estoque máximo"><GlassInput type="number" value={formData.estoqueMaximo ?? ''} onChange={(e) => handleNumericChange('estoqueMaximo', e.target.value, true)} /></InputWrapper>
            </div>
        )}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputWrapper label="Localização" helpText="Localização física no estoque">
                <GlassInput value={formData.localizacao || ''} onChange={(e) => handleChange('localizacao', e.target.value)} />
            </InputWrapper>
             <InputWrapper label="Dias para preparação" helpText="Dias necessários para disponibilização">
                <GlassInput type="number" value={formData.diasPreparacao ?? ''} onChange={(e) => handleNumericChange('diasPreparacao', e.target.value, true)} />
            </InputWrapper>
        </div>
      </section>
    </div>
  );
};
