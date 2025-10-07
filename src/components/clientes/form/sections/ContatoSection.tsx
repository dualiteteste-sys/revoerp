import React, { useState } from 'react';
import { Control, Controller, useFieldArray, UseFormSetValue } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Plus, Trash2 } from 'lucide-react';
import { GlassInput } from '../../../ui/GlassInput';
import { GlassButton } from '../../../ui/GlassButton';
import { InputWrapper } from '../../../ui/InputWrapper';
import { ClienteFormData } from '../../../../schemas/clienteSchema';
import { PessoaContato } from '../../../../types';

interface ContatoSectionProps {
  control: Control<ClienteFormData>;
  setValue: UseFormSetValue<ClienteFormData>;
}

export const ContatoSection: React.FC<ContatoSectionProps> = ({ control, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pessoasContato",
  });
  const [newContato, setNewContato] = useState<Omit<PessoaContato, 'id' | 'clienteId' | 'createdAt' | 'updatedAt'>>({ nome: '', setor: '', email: '', telefone: '', ramal: '' });

  const handleAddContato = () => {
    if (newContato.nome) {
      append(newContato);
      setNewContato({ nome: '', setor: '', email: '', telefone: '', ramal: '' });
    }
  };

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Contato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Controller name="celular" control={control} render={({ field }) => (
          <InputWrapper label="Celular">
            <IMaskInput mask="(00) 00000-0000" value={field.value || ''} onAccept={field.onChange} className="glass-input" />
          </InputWrapper>
        )} />
        <Controller name="telefoneAdicional" control={control} render={({ field }) => (
          <InputWrapper label="Telefone Adicional">
            <IMaskInput mask="(00) 0000-0000" value={field.value || ''} onAccept={field.onChange} className="glass-input" />
          </InputWrapper>
        )} />
        <Controller name="site" control={control} render={({ field, fieldState }) => (
          <InputWrapper label="Site" error={fieldState.error?.message}>
            <GlassInput {...field} value={field.value || ''} />
          </InputWrapper>
        )} />
        <Controller name="email" control={control} render={({ field, fieldState }) => (
          <InputWrapper label="E-mail" error={fieldState.error?.message}>
            <GlassInput type="email" {...field} value={field.value || ''} />
          </InputWrapper>
        )} />
        <Controller name="emailNfe" control={control} render={({ field, fieldState }) => (
          <InputWrapper label="E-mail para NF-e" error={fieldState.error?.message}>
            <GlassInput type="email" {...field} value={field.value || ''} />
          </InputWrapper>
        )} />
      </div>
      <div className="mt-6">
        <h4 className="font-semibold text-gray-700 mb-2">Adicionar Contato</h4>
        <div className="space-y-2">
          {fields.map((pessoa, index) => (
            <div key={pessoa.id} className="flex items-center gap-2 p-2 rounded-lg bg-glass-50">
              <p className="flex-1 text-sm">{pessoa.nome} ({pessoa.email})</p>
              <GlassButton icon={Trash2} size="sm" variant="danger" onClick={() => remove(index)} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end pt-4 border-t border-white/20 mt-4">
          <GlassInput label="Nome" value={newContato.nome} onChange={(e) => setNewContato({ ...newContato, nome: e.target.value })} />
          <GlassInput label="Setor" value={newContato.setor} onChange={(e) => setNewContato({ ...newContato, setor: e.target.value })} />
          <GlassInput label="Email" type="email" value={newContato.email} onChange={(e) => setNewContato({ ...newContato, email: e.target.value })} />
          <IMaskInput mask="(00) 00000-0000" value={newContato.telefone || ''} onAccept={(v) => setNewContato({ ...newContato, telefone: v as string })} placeholder="Telefone" className="glass-input" />
          <GlassInput label="Ramal" value={newContato.ramal} onChange={(e) => setNewContato({ ...newContato, ramal: e.target.value })} />
        </div>
        <div className="flex justify-end mt-2">
          <GlassButton icon={Plus} onClick={handleAddContato} disabled={!newContato.nome}>Adicionar Contato</GlassButton>
        </div>
      </div>
    </section>
  );
};
