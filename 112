import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericForm } from '../../ui/GenericForm';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { testEmailSchema, TestEmailFormData } from '../../../schemas/servidorEmailSchema';

interface TestEmailModalProps {
  onSend: (data: TestEmailFormData) => void;
  onCancel: () => void;
  loading: boolean;
}

export const TestEmailModal: React.FC<TestEmailModalProps> = ({ onSend, onCancel, loading }) => {
  const { handleSubmit, register, formState: { errors } } = useForm<TestEmailFormData>({
    resolver: zodResolver(testEmailSchema),
    defaultValues: {
      assunto: 'Teste de envio',
      mensagem: 'Este é um e-mail de teste enviado a partir das configurações do sistema Revo ERP.',
    },
  });

  return (
    <GenericForm
      title="Teste de envio de e-mail"
      onSave={handleSubmit(onSend)}
      onCancel={onCancel}
      loading={loading}
      size="max-w-3xl"
    >
      <div className="space-y-6">
        <InputWrapper label="Para" error={errors.para?.message}>
          <GlassInput type="email" placeholder="seu@email.com" {...register('para')} />
        </InputWrapper>
        <InputWrapper label="Assunto">
          <GlassInput {...register('assunto')} />
        </InputWrapper>
        <InputWrapper label="Mensagem">
          <textarea className="glass-input h-32 resize-y" {...register('mensagem')} />
        </InputWrapper>
      </div>
    </GenericForm>
  );
};
