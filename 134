import React from 'react';
		import { Control, Controller, UseFormWatch } from 'react-hook-form';
		import { IMaskInput } from 'react-imask';
		import { VendedorFormData } from '../../../schemas/vendedorSchema';
		import { TipoPessoaVendedor, ContribuinteICMS } from '../../../types';
		import { GlassInput } from '../../ui/GlassInput';
		import { InputWrapper } from '../../ui/InputWrapper';

		interface IdentificacaoSectionProps {
		  control: Control<VendedorFormData>;
		  watch: UseFormWatch<VendedorFormData>;
		}

		export const IdentificacaoSection: React.FC<IdentificacaoSectionProps> = ({ control, watch }) => {
		  const tipoPessoa = watch('tipoPessoa');

		  return (
		    <section>
		      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Identificação</h3>
		      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
		        <Controller
		          name="nome"
		          control={control}
		          render={({ field, fieldState }) => (
		            <InputWrapper label="Nome *" className="md:col-span-2" error={fieldState.error?.message}>
		              <GlassInput placeholder="Nome completo do vendedor" {...field} />
		            </InputWrapper>
		          )}
		        />
		        <Controller
		          name="fantasia"
		          control={control}
		          render={({ field }) => (
		            <InputWrapper label="Fantasia">
		              <GlassInput placeholder="Nome de fantasia ou apelido" {...field} value={field.value || ''} />
		            </InputWrapper>
		          )}
		        />
		        <Controller
		          name="codigo"
		          control={control}
		          render={({ field }) => (
		            <InputWrapper label="Código (Opcional)">
		              <GlassInput placeholder="Opcional" {...field} value={field.value || ''} />
		            </InputWrapper>
		          )}
		        />
		        <Controller
		          name="tipoPessoa"
		          control={control}
		          render={({ field }) => (
		            <InputWrapper label="Tipo de Pessoa">
		              <select className="glass-input" {...field}>
		                {Object.values(TipoPessoaVendedor).map(t => <option key={t} value={t}>{t}</option>)}
		              </select>
		            </InputWrapper>
		          )}
		        />
		        <Controller
		          name="cpfCnpj"
		          control={control}
		          render={({ field, fieldState }) => (
		            <InputWrapper label={tipoPessoa === TipoPessoaVendedor.FISICA ? 'CPF *' : 'CNPJ *'} error={fieldState.error?.message}>
		              <IMaskInput
		                mask={tipoPessoa === TipoPessoaVendedor.FISICA ? '000.000.000-00' : '00.000.000/0000-00'}
		                value={field.value || ''}
		                onAccept={field.onChange}
		                className="glass-input"
		              />
		            </InputWrapper>
		          )}
		        />
		        <Controller
		          name="contribuinte"
		          control={control}
		          render={({ field }) => (
		            <InputWrapper label="Contribuinte">
		              <select className="glass-input" {...field}>
		                {Object.values(ContribuinteICMS).map(c => <option key={c} value={c}>{c}</option>)}
		              </select>
		            </InputWrapper>
		          )}
		        />
		        <Controller
		          name="inscricaoEstadual"
		          control={control}
		          render={({ field }) => (
		            <InputWrapper label="Inscrição Estadual">
		              <GlassInput {...field} value={field.value || ''} />
		            </InputWrapper>
		          )}
		        />
		      </div>
		    </section>
		  );
		};
