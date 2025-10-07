import React from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { UploadCloud, Trash2 } from 'lucide-react';
import { GlassButton } from '../../ui/GlassButton';

interface LogoSectionProps {
  logoPreview: string | null;
  onDrop: DropzoneOptions['onDrop'];
  onRemove: () => void;
}

export const LogoSection: React.FC<LogoSectionProps> = ({ logoPreview, onDrop, onRemove }) => {
  const { getRootProps, getInputProps, isDragActive, open: openFileDialog } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-white/30 pb-3">Logo da empresa</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-xl text-center transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 text-gray-600">
            <UploadCloud size={48} className="text-gray-400" />
            <p className="font-semibold">Arraste e solte o arquivo aqui</p>
            <p className="text-sm">ou</p>
            <GlassButton type="button" onClick={openFileDialog} variant="secondary">Procurar arquivo</GlassButton>
            <p className="text-xs text-gray-500 mt-2">PNG/JPG/SVG até 2 MB; mínimo 256×256 px.</p>
          </div>
        </div>
        {logoPreview && (
          <div className="relative w-48 h-48 mx-auto bg-glass-50 p-4 rounded-xl flex items-center justify-center">
            <img src={logoPreview} alt="Preview da logo" className="max-w-full max-h-full object-contain" />
            <div className="absolute -top-3 -right-3 flex gap-2">
              <GlassButton icon={Trash2} variant="danger" size="sm" onClick={onRemove} type="button" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
