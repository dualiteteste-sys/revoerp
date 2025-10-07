import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { AttachmentManager } from '../../ui/AttachmentManager';
import { Anexo, Cliente } from '../../../types';
import { useService } from '../../../hooks/useService';
import { ClienteFormData } from '../../../schemas/clienteSchema';

interface AnexosTabProps {
  entityId?: string;
  attachments: Anexo[];
  setValue: UseFormSetValue<ClienteFormData>;
}

export const AnexosTab: React.FC<AnexosTabProps> = ({ entityId, attachments, setValue }) => {
  const clienteService = useService('cliente');

  const setFormDataAttachments = (updater: (prev: Anexo[]) => Anexo[]) => {
    setValue('anexos', updater(attachments));
  };

  return (
    <AttachmentManager<Anexo>
      entityId={entityId}
      attachments={attachments}
      setFormData={setFormDataAttachments as any} // Adapter for AttachmentManager
      uploadService={clienteService.uploadAnexo}
      deleteService={clienteService.deleteAnexo}
      getPublicUrlService={clienteService.getAnexoPublicUrl}
    />
  );
};
