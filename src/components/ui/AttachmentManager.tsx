import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Trash2, Loader2 } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { IEntity } from '../../types';
import toast from 'react-hot-toast';

interface AnexoGenerico extends IEntity {
  nomeArquivo: string;
  path: string;
  tamanho: number;
  tipo: string;
}

interface AttachmentManagerProps<T> {
  entityId?: string;
  attachments: T[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  uploadService: (entityId: string, file: File) => Promise<T>;
  deleteService: (anexoId: string, filePath: string) => Promise<void>;
  getPublicUrlService: (filePath: string) => string;
}

export const AttachmentManager = <T extends AnexoGenerico>({
  entityId,
  attachments,
  setFormData,
  uploadService,
  deleteService,
  getPublicUrlService,
}: AttachmentManagerProps<T>) => {
  const [uploading, setUploading] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!entityId) {
      toast.error("Salve o registro primeiro para poder adicionar anexos.");
      return;
    }
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB
        toast.error("O arquivo excede o tamanho máximo de 2MB.");
        return;
      }
      setUploading(file);
      try {
        const newAttachment = await uploadService(entityId, file);
        setFormData((prev: any) => ({
          ...prev,
          anexos: [...(prev.anexos || []), newAttachment],
        }));
        toast.success("Anexo enviado com sucesso!");
      } catch (error) {
        toast.error(`Falha no upload: ${(error as Error).message}`);
      } finally {
        setUploading(null);
      }
    }
  }, [entityId, setFormData, uploadService]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleDeleteAttachment = async (attachment: T) => {
    if (!window.confirm(`Tem certeza que deseja excluir o anexo "${attachment.nomeArquivo}"?`)) return;
    
    const toastId = toast.loading("Excluindo anexo...");
    try {
      await deleteService(attachment.id, attachment.path);
      setFormData((prev: any) => ({
        ...prev,
        anexos: prev.anexos.filter((a: T) => a.id !== attachment.id),
      }));
      toast.success("Anexo excluído com sucesso!", { id: toastId });
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
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 text-gray-600">
          <UploadCloud size={48} className="text-gray-400" />
          <p className="font-semibold">Arraste e solte um arquivo aqui, ou clique para selecionar</p>
          <p className="text-sm">Tamanho máximo: 2MB</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Arquivos Anexados</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {uploading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-blue-50 border border-blue-200"
              >
                <Loader2 className="animate-spin text-blue-500" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">{uploading.name}</p>
                  <p className="text-xs text-blue-600">Enviando... ({formatBytes(uploading.size)})</p>
                </div>
              </motion.div>
            )}
            {attachments.map((attachment) => (
              <motion.div
                key={attachment.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-glass-50"
              >
                <FileText className="text-gray-500" size={24} />
                <div className="flex-1">
                  <a
                    href={getPublicUrlService(attachment.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    {attachment.nomeArquivo}
                  </a>
                  <p className="text-xs text-gray-500">{formatBytes(attachment.tamanho)} - {new Date(attachment.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <GlassButton icon={Trash2} size="sm" variant="danger" onClick={() => handleDeleteAttachment(attachment)} />
              </motion.div>
            ))}
          </AnimatePresence>
          {attachments.length === 0 && !uploading && (
            <p className="text-sm text-center text-gray-500 py-4">Nenhum anexo encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};
