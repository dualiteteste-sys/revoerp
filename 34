import React from 'react';
import { AttachmentManager } from '../../ui/AttachmentManager';
import { ContratoAnexo } from '../../../types';
import { useService } from '../../../hooks/useService';

interface AnexosTabProps {
  entityId?: string;
  attachments: ContratoAnexo[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const AnexosTab: React.FC<AnexosTabProps> = ({ entityId, attachments, setFormData }) => {
  const contratoService = useService('contrato');

  return (
    <AttachmentManager<ContratoAnexo>
      entityId={entityId}
      attachments={attachments}
      setFormData={setFormData}
      uploadService={contratoService.uploadAnexo}
      deleteService={contratoService.deleteAnexo}
      getPublicUrlService={contratoService.getAnexoPublicUrl}
    />
  );
};
