import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericForm } from '../../ui/GenericForm';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { FormaPagamento } from '../../../types';
import { z } from 'zod';

const formSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória."),
});

type FormData = z.infer<typeof formSchema>;

interface FormaPagamentoFormProps {
  formaPagamento?: Partial<FormaPagamento>;
  onSave: (data: Partial<FormaPagamento>) => void;
  onCancel: () => void;
  loading: boolean;
}

export const FormaPagamentoForm: React.FC<FormaPagamentoFormProps> = ({ formaPagamento, onSave, onCancel, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: formaPagamento?.descricao || '',
    },
  });

  return (
    <GenericForm
      title={formaPagamento?.id ? 'Editar Forma de Pagamento' : 'Nova Forma de Pagamento'}
      onSave={handleSubmit(onSave)}
      onCancel={onCancel}
      loading={loading}
      size="max-w-xl"
    >
      <div className="space-y-6">
        <InputWrapper label="Descrição" error={errors.descricao?.message}>
          <GlassInput {...register('descricao')} />
        </InputWrapper>
      </div>
    </GenericForm>
  );
};
