import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Trash2, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Produto, ProdutoImagem } from '../../../types';
import { GlassButton } from '../../ui/GlassButton';
import toast from 'react-hot-toast';
import { InputWrapper } from '../../ui/InputWrapper';
import { useService } from '../../../hooks/useService';

interface DadosComplementaresTabProps {
  formData: Partial<Produto>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Produto>>>;
}

export const DadosComplementaresTab: React.FC<DadosComplementaresTabProps> = ({ formData, setFormData }) => {
  const produtoService = useService('produto');
  const [uploading, setUploading] = useState<File | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const onDrop = React.useCallback(async (acceptedFiles: File[]) => {
    if (!formData.id) {
      toast.error("Salve o produto primeiro para poder adicionar imagens.");
      return;
    }
    const file = acceptedFiles[0];
    if (file) {
      setUploading(file);
      try {
        const newImagem = await produtoService.uploadImagem(formData.id, file);
        setFormData((prev: any) => ({
          ...prev,
          imagens: [...(prev.imagens || []), newImagem],
        }));
        toast.success("Imagem enviada com sucesso!");
      } catch (error) {
        toast.error(`Falha no upload: ${(error as Error).message}`);
      } finally {
        setUploading(null);
      }
    }
  }, [formData.id, setFormData, produtoService]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] }
  });
  
  const handleDeleteImagem = async (imagem: ProdutoImagem) => {
    if (!window.confirm(`Tem certeza que deseja excluir a imagem "${imagem.nomeArquivo}"?`)) return;
    
    const toastId = toast.loading("Excluindo imagem...");
    try {
      await produtoService.deleteImagem(imagem.id, imagem.path);
      setFormData((prev: any) => ({
        ...prev,
        imagens: prev.imagens.filter((i: ProdutoImagem) => i.id !== imagem.id),
      }));
      toast.success("Imagem excluída com sucesso!", { id: toastId });
    } catch (error) {
      toast.error(`Falha ao excluir: ${(error as Error).message}`, { id: toastId });
    }
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputWrapper label="Marca">
            <input className="glass-input" placeholder="Pesquise pelo nome da marca" value={formData.marca || ''} onChange={(e) => handleChange('marca', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Tabela de medidas">
            <input className="glass-input" placeholder="Pesquise pelo nome da tabela" value={formData.tabelaMedidas || ''} onChange={(e) => handleChange('tabelaMedidas', e.target.value)} />
          </InputWrapper>
        </div>
      </section>

      <section>
        <InputWrapper label="Descrição complementar" helpText="Campo exibido em propostas comerciais, pedidos de venda e descrição do produto no e-commerce.">
           <textarea 
                value={formData.descricaoComplementar || ''} 
                onChange={(e) => handleChange('descricaoComplementar', e.target.value)}
                className="glass-input h-48 resize-y"
                placeholder="Adicione uma descrição rica sobre o produto..."
            />
        </InputWrapper>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Imagens e Anexos</h3>
        <p className="text-sm text-gray-600 mb-4">Facilite o gerenciamento de imagens de seus produtos com nosso gerenciador. Defina, reordene e compartilhe imagens entre o produto principal e suas variações para economizar espaço de armazenamento.</p>
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 text-gray-600">
            <UploadCloud size={48} className="text-gray-400" />
            <p className="font-semibold">+ adicionar imagens ao produto</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <AnimatePresence>
            {uploading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <Loader2 className="animate-spin text-blue-500" size={20} />
                <p className="text-sm font-medium text-blue-800">{uploading.name}</p>
              </motion.div>
            )}
            {formData.imagens?.map((imagem) => (
              <motion.div key={imagem.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4 p-3 rounded-lg bg-glass-50">
                <img src={produtoService.getImagemPublicUrl(imagem.path)} alt={imagem.nomeArquivo} className="w-12 h-12 object-cover rounded-md" />
                <div className="flex-1">
                  <a href={produtoService.getImagemPublicUrl(imagem.path)} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:underline">{imagem.nomeArquivo}</a>
                  <p className="text-xs text-gray-500">{formatBytes(imagem.tamanho)}</p>
                </div>
                <GlassButton icon={Trash2} size="sm" variant="danger" onClick={() => handleDeleteImagem(imagem)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Campos Adicionais</h3>
        <div className="space-y-4">
          <InputWrapper label="Link do vídeo">
            <input className="glass-input" value={formData.linkVideo || ''} onChange={(e) => handleChange('linkVideo', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Slug" helpText="Utilizado para identificação legível no link do produto no e-commerce">
            <input className="glass-input" value={formData.slug || ''} onChange={(e) => handleChange('slug', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Keywords" helpText="Utilizado para SEO ou metadados que ajudam a descrever um produto. Informe os valores separados por vírgula.">
            <input className="glass-input" value={formData.keywords || ''} onChange={(e) => handleChange('keywords', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Título para SEO" helpText="Título do produto que será exibido nos resultados da busca no Google">
            <input className="glass-input" value={formData.tituloSeo || ''} onChange={(e) => handleChange('tituloSeo', e.target.value)} />
          </InputWrapper>
          <InputWrapper label="Descrição para SEO" helpText="Descrição exibida abaixo do título nos resultados da busca no Google">
            <textarea value={formData.descricaoSeo || ''} onChange={(e) => handleChange('descricaoSeo', e.target.value)} className="glass-input h-24 resize-y" />
          </InputWrapper>
        </div>
      </section>
    </div>
  );
};
