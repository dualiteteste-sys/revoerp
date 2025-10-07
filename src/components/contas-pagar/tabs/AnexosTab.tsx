import React from 'react';
import { AttachmentManager } from '../../ui/AttachmentManager';
import { ContaPagarAnexo } from '../../../types';
import { useService } from '../../../hooks/useService';

interface AnexosTabProps {
  contaId?: string;
  anexos: ContaPagarAnexo[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const AnexosTab: React.FC<AnexosTabProps> = ({ contaId, anexos, setFormData }) => {
  const contasPagarService = useService('contasPagar');

  return (
    <AttachmentManager<ContaPagarAnexo>
      entityId={contaId}
      attachments={anexos}
      setFormData={setFormData}
      uploadService={contasPagarService.uploadAnexo}
      deleteService={contasPagarService.deleteAnexo}
      getPublicUrlService={contasPagarService.getAnexoPublicUrl}
    />
  );
};
