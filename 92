import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, FileText, ListTree, Megaphone, MoreHorizontal } from 'lucide-react';
import { Produto, TipoProduto, OrigemProduto, SituacaoProduto } from '../../types';
import toast from 'react-hot-toast';
import { DadosGeraisTab } from './tabs/DadosGeraisTab';
import { DadosComplementaresTab } from './tabs/DadosComplementaresTab';
import { AtributosTab } from './tabs/AtributosTab';
import { AnunciosTab } from './tabs/AnunciosTab';
import { OutrosTab } from './tabs/OutrosTab';
import { useFormState } from '../../hooks/useFormState';
import { GenericForm } from '../ui/GenericForm';

interface ProdutoFormProps {
  produto?: Partial<Produto>;
  onSave: (produto: Partial<Produto>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const getInitialData = (p?: Partial<Produto>): Partial<Produto> => ({
  id: p?.id,
  tipoProduto: p?.tipoProduto || TipoProduto.SIMPLES,
  nome: p?.nome || '',
  codigoBarras: p?.codigoBarras || '',
  codigo: p?.codigo || '',
  origem: p?.origem || OrigemProduto.NACIONAL,
  unidade: p?.unidade || '',
  ncm: p?.ncm || '',
  cest: p?.cest || '',
  precoVenda: p?.precoVenda ?? 0,
  pesoLiquido: p?.pesoLiquido,
  pesoBruto: p?.pesoBruto,
  volumes: p?.volumes,
  tipoEmbalagem: p?.tipoEmbalagem,
  embalagem: p?.embalagem,
  largura: p?.largura,
  altura: p?.altura,
  comprimento: p?.comprimento,
  controlarEstoque: p?.controlarEstoque ?? false,
  estoqueInicial: p?.estoqueInicial,
  estoqueMinimo: p?.estoqueMinimo,
  estoqueMaximo: p?.estoqueMaximo,
  controlarLotes: p?.controlarLotes ?? false,
  localizacao: p?.localizacao || '',
  diasPreparacao: p?.diasPreparacao,
  situacao: p?.situacao || SituacaoProduto.ATIVO,
  marca: p?.marca || '',
  tabelaMedidas: p?.tabelaMedidas || '',
  descricaoComplementar: p?.descricaoComplementar || '',
  linkVideo: p?.linkVideo || '',
  slug: p?.slug || '',
  keywords: p?.keywords || '',
  tituloSeo: p?.tituloSeo || '',
  descricaoSeo: p?.descricaoSeo || '',
  unidadePorCaixa: p?.unidadePorCaixa,
  custo: p?.custo,
  linhaProduto: p?.linhaProduto || '',
  garantia: p?.garantia || '',
  markup: p?.markup,
  permitirVendas: p?.permitirVendas ?? true,
  gtinTributavel: p?.gtinTributavel || '',
  unidadeTributavel: p?.unidadeTributavel || '',
  fatorConversao: p?.fatorConversao,
  codigoEnquadramentoIpi: p?.codigoEnquadramentoIpi || '',
  valorIpiFixo: p?.valorIpiFixo,
  exTipi: p?.exTipi || '',
  observacoesProduto: p?.observacoesProduto || '',
  imagens: p?.imagens || [],
  atributos: p?.atributos?.map(attr => ({ ...attr, id: attr.id || crypto.randomUUID() })) || [],
  anuncios: p?.anuncios?.map(anuncio => ({ ...anuncio, id: anuncio.id || crypto.randomUUID() })) || [],
  fornecedores: p?.fornecedores?.map(f => ({ ...f, id: f.id || crypto.randomUUID() })) || [],
  createdAt: p?.createdAt,
  updatedAt: p?.updatedAt,
});

export const ProdutoForm: React.FC<ProdutoFormProps> = ({ produto, onSave, onCancel, loading }) => {
  const getInitial = useCallback(() => getInitialData(produto), [produto]);
  const { formData, setFormData } = useFormState<Produto>(getInitial);
  const [activeTab, setActiveTab] = useState('dadosGerais');

  const handleSave = () => {
    if (!formData.nome?.trim()) {
      toast.error('O nome do produto é obrigatório.');
      return;
    }
    const dataToSave = {
        ...formData,
        atributos: formData.atributos?.map(({ atributo, valor }) => ({ atributo, valor })),
        anuncios: formData.anuncios?.map(({ ecommerce, identificador, descricao }) => ({ ecommerce, identificador, descricao })),
        fornecedores: formData.fornecedores?.map(({ fornecedorId, codigoNoFornecedor }) => ({ fornecedorId, codigoNoFornecedor })),
    };
    onSave(dataToSave as Partial<Produto>);
  };

  const tabs = useMemo(() => [
    { id: 'dadosGerais', label: 'Dados Gerais', icon: Package },
    { id: 'dadosComplementares', label: 'Dados Complementares', icon: FileText },
    { id: 'atributos', label: 'Atributos', icon: ListTree },
    { id: 'anuncios', label: 'Anúncios', icon: Megaphone },
    { id: 'outros', label: 'Outros', icon: MoreHorizontal },
  ], []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dadosGerais':
        return <DadosGeraisTab formData={formData} setFormData={setFormData} />;
      case 'dadosComplementares':
        return <DadosComplementaresTab formData={formData} setFormData={setFormData} />;
      case 'atributos':
        return <AtributosTab formData={formData} setFormData={setFormData} />;
      case 'anuncios':
        return <AnunciosTab formData={formData} setFormData={setFormData} />;
      case 'outros':
        return <OutrosTab formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <GenericForm
      title={produto?.id ? 'Editar Produto' : 'Novo Produto'}
      onSave={handleSave}
      onCancel={onCancel}
      loading={loading}
      size="max-w-6xl"
    >
      <div className="px-8 pt-4 border-b border-white/30 -mt-8 -mx-8 mb-8">
          <div className="flex items-end -mb-px overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 pt-3 pb-2 transition-colors duration-300 text-sm font-medium border-b-2
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
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
    </GenericForm>
  );
};
