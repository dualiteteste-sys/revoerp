import React from 'react';
import { AttachmentManager } from '../../ui/AttachmentManager';
import { ContaReceberAnexo } from '../../../types';
import { useService } from '../../../hooks/useService';

interface AnexosTabProps {
  contaId?: string;
  anexos: ContaReceberAnexo[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const AnexosTab: React.FC<AnexosTabProps> = ({ contaId, anexos, setFormData }) => {
  const contasReceberService = useService('contasReceber');

  return (
    <AttachmentManager<ContaReceberAnexo>
      entityId={contaId}
      attachments={anexos}
      setFormData={setFormData}
      uploadService={contasReceberService.uploadAnexo}
      deleteService={contasReceberService.deleteAnexo}
      getPublicUrlService={contasReceberService.getAnexoPublicUrl}
    />
  );
};
