import React from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import { GlassInput } from '../../ui/GlassInput';
import { GlassButton } from '../../ui/GlassButton';
import { Plus, Trash2 } from 'lucide-react';
import { DadosEmpresaFormData } from '../../../schemas/dadosEmpresaSchema';

const ufs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

interface InscricoesEstaduaisSectionProps {
  control: Control<DadosEmpresaFormData>;
}

export const InscricoesEstaduaisSection: React.FC<InscricoesEstaduaisSectionProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "substitutosTributarios",
  });

  return (
    <div className="mt-8">
      <h4 className="font-semibold text-gray-700 mb-4">Inscrições Estaduais — Substitutos Tributários</h4>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-5 md:col-span-3">
              <Controller
                name={`substitutosTributarios.${index}.uf`}
                control={control}
                render={({ field }) => (
                  <select className="glass-input" {...field}>
                    <option value="">UF</option>
                    {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                )}
              />
            </div>
            <div className="col-span-7 md:col-span-8">
              <Controller
                name={`substitutosTributarios.${index}.ie`}
                control={control}
                render={({ field }) => (
                  <GlassInput placeholder="Informe a IE" {...field} />
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-1 flex justify-end md:justify-center">
              <GlassButton icon={Trash2} variant="danger" size="sm" onClick={() => remove(index)} />
            </div>
          </div>
        ))}
      </div>
      <GlassButton icon={Plus} onClick={() => append({ uf: '', ie: '' })} variant="secondary" className="mt-4">Adicionar outra inscrição</GlassButton>
    </div>
  );
};
