import React, { useState, useEffect, useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import { OrdemServicoFormData } from '../../../schemas/ordemServicoSchema';
import { GlassInput } from '../../ui/GlassInput';
import { CurrencyInput } from '../../ui/CurrencyInput';
import { AutocompleteInput } from '../../ui/AutocompleteInput';
import { InputWrapper } from '../../ui/InputWrapper';
import { PrioridadeOS } from '../../../types';
import { useService } from '../../../hooks/useService';
import { Vendedor } from '../../../types';

interface DetalhesEquipeSectionProps {
  control: Control<OrdemServicoFormData>;
  vendedor?: Vendedor;
  tecnico?: Vendedor;
  totalServicos: number;
}

export const DetalhesEquipeSection: React.FC<DetalhesEquipeSectionProps> = ({ control, vendedor, tecnico, totalServicos }) => {
  const vendedorService = useService('vendedor');
  const [initialVendedorLabel, setInitialVendedorLabel] = useState('');
  const [initialTecnicoLabel, setInitialTecnicoLabel] = useState('');

  useEffect(() => {
    if (vendedor) setInitialVendedorLabel(vendedor.nome);
    if (tecnico) setInitialTecnicoLabel(tecnico.nome);
  }, [vendedor, tecnico]);

  const fetchVendedores = useCallback(async (query: string) => {
    const results = await vendedorService.search(query);
    return results.map(v => ({ value: v.id, label: v.nome }));
  }, [vendedorService]);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Controller name="dataInicio" control={control} render={({ field }) => (
          <InputWrapper label="Data de Início *">
            <GlassInput type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} />
          </InputWrapper>
        )} />
        <Controller name="dataPrevisao" control={control} render={({ field }) => (
          <InputWrapper label="Data Prevista">
            <GlassInput type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} />
          </InputWrapper>
        )} />
        <Controller name="hora" control={control} render={({ field }) => (
          <InputWrapper label="Hora"><GlassInput type="time" {...field} value={field.value || ''} /></InputWrapper>
        )} />
        <Controller name="dataConclusao" control={control} render={({ field }) => (
          <InputWrapper label="Data de Conclusão">
            <GlassInput type="date" {...field} value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''} onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : undefined)} />
          </InputWrapper>
        )} />
        <InputWrapper label="Total Serviços"><CurrencyInput value={totalServicos} onAccept={() => {}} disabled /></InputWrapper>
        <Controller name="desconto" control={control} render={({ field }) => (
          <InputWrapper label="Desconto (Valor ou %)" helpText="Ex: 3,00 ou 10%">
            <GlassInput {...field} value={field.value || ''} />
          </InputWrapper>
        )} />
        <div className="md:col-span-2">
          <Controller name="observacoesServico" control={control} render={({ field }) => (
            <InputWrapper label="Observações do serviço">
              <textarea className="glass-input h-20 resize-y" {...field} value={field.value || ''} />
            </InputWrapper>
          )} />
        </div>
        <div className="md:col-span-2">
          <Controller name="observacoesInternas" control={control} render={({ field }) => (
            <InputWrapper label="Observações internas">
              <textarea className="glass-input h-20 resize-y" {...field} value={field.value || ''} />
            </InputWrapper>
          )} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <Controller name="vendedorId" control={control} render={({ field }) => (
          <InputWrapper label="Vendedor">
            <AutocompleteInput
              value={field.value || ''}
              onValueChange={field.onChange}
              fetchSuggestions={fetchVendedores}
              initialLabel={initialVendedorLabel}
              placeholder="Buscar vendedor..."
            />
          </InputWrapper>
        )} />
        <Controller name="prioridade" control={control} render={({ field }) => (
          <InputWrapper label="Prioridade">
            <select className="glass-input" {...field}>
              {Object.values(PrioridadeOS).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </InputWrapper>
        )} />
        <Controller name="tecnicoId" control={control} render={({ field }) => (
          <InputWrapper label="Técnico">
            <AutocompleteInput
              value={field.value || ''}
              onValueChange={field.onChange}
              fetchSuggestions={fetchVendedores}
              initialLabel={initialTecnicoLabel}
              placeholder="Buscar técnico..."
            />
          </InputWrapper>
        )} />
        <Controller name="orcar" control={control} render={({ field }) => (
          <div className="flex items-center gap-2">
            <input type="checkbox" id="orcar-os" {...field} checked={field.value} className="form-checkbox" />
            <label htmlFor="orcar-os" className="text-sm text-gray-700">Orçar</label>
          </div>
        )} />
      </section>
    </>
  );
};
