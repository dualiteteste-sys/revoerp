import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GenericForm } from '../../ui/GenericForm';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { CategoriaFinanceira, TipoCategoriaFinanceira } from '../../../types';
import { z } from 'zod';

const formSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória."),
  tipo: z.nativeEnum(TipoCategoriaFinanceira),
});

type FormData = z.infer<typeof formSchema>;

interface CategoriaFinanceiraFormProps {
  categoria?: Partial<CategoriaFinanceira>;
  onSave: (data: Partial<CategoriaFinanceira>) => void;
  onCancel: () => void;
  loading: boolean;
}

export const CategoriaFinanceiraForm: React.FC<CategoriaFinanceiraFormProps> = ({ categoria, onSave, onCancel, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: categoria?.descricao || '',
      tipo: categoria?.tipo || TipoCategoriaFinanceira.RECEITA,
    },
  });

  return (
    <GenericForm
      title={categoria?.id ? 'Editar Categoria' : 'Nova Categoria'}
      onSave={handleSubmit(onSave)}
      onCancel={onCancel}
      loading={loading}
      size="max-w-xl"
    >
      <div className="space-y-6">
        <InputWrapper label="Descrição" error={errors.descricao?.message}>
          <GlassInput {...register('descricao')} />
        </InputWrapper>
        <InputWrapper label="Tipo" error={errors.tipo?.message}>
          <select className="glass-input" {...register('tipo')}>
            {Object.values(TipoCategoriaFinanceira).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </InputWrapper>
      </div>
    </GenericForm>
  );
};
