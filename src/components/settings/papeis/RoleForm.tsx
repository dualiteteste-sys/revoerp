import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericForm } from '../../ui/GenericForm';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { Papel } from '../../../types';
import { z } from 'zod';

const formSchema = z.object({
  nome: z.string().min(3, "O nome do papel deve ter pelo menos 3 caracteres."),
});

type FormData = z.infer<typeof formSchema>;

interface RoleFormProps {
  role?: Papel;
  onSave: (data: Partial<Papel>) => void;
  onCancel: () => void;
  loading: boolean;
}

export const RoleForm: React.FC<RoleFormProps> = ({ role, onSave, onCancel, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: role?.nome || '',
    },
  });

  return (
    <GenericForm
      title={role ? 'Editar Papel' : 'Novo Papel'}
      onSave={handleSubmit(onSave)}
      onCancel={onCancel}
      loading={loading}
      size="max-w-lg"
    >
      <div className="space-y-6">
        <InputWrapper label="Nome do Papel" error={errors.nome?.message}>
          <GlassInput {...register('nome')} placeholder="Ex: Administrador, Vendedor" />
        </InputWrapper>
      </div>
    </GenericForm>
  );
};
