import React from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useCep } from '../../../hooks/useCep';
import { ClienteFormData } from '../../../schemas/clienteSchema';
import { InformacoesGeraisSection } from './sections/InformacoesGeraisSection';
import { EnderecoSection } from './sections/EnderecoSection';
import { ContatoSection } from './sections/ContatoSection';

interface DadosGeraisTabProps {
  control: Control<ClienteFormData>;
  watch: UseFormWatch<ClienteFormData>;
  setValue: UseFormSetValue<ClienteFormData>;
}

export const DadosGeraisTab: React.FC<DadosGeraisTabProps> = ({ control, watch, setValue }) => {
  const { handleBuscaCep } = useCep(setValue);

  return (
    <div className="space-y-8">
      <InformacoesGeraisSection control={control} watch={watch} setValue={setValue} />
      <EnderecoSection control={control} onBuscaCep={handleBuscaCep} />
      <ContatoSection control={control} setValue={setValue} />
    </div>
  );
};
