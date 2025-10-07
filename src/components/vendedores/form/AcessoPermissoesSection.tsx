import React from 'react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { VendedorFormData } from '../../../schemas/vendedorSchema';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

const CheckboxWrapper: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void; helpText?: string; }> = ({ label, checked, onChange, helpText }) => (
  <div className="flex flex-col">
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="form-checkbox" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
    {helpText && <p className="text-xs text-gray-500 mt-1 ml-6">{helpText}</p>}
  </div>
);

const modulosDisponiveis = [
  'Clientes', 'Comissões', 'CRM', 'Pedidos de Venda', 'PDV', 'Propostas comerciais',
  'Relatório de Preços de Produtos', 'Cotação de fretes'
];
const perfisContatoDisponiveis = ['Cliente', 'Fornecedor', 'Vendedor', 'Transportador', 'Funcionário', 'Outro'];

interface AcessoPermissoesSectionProps {
  control: Control<VendedorFormData>;
  watch: UseFormWatch<VendedorFormData>;
}

export const AcessoPermissoesSection: React.FC<AcessoPermissoesSectionProps> = ({ control, watch }) => {
  const acessoRestritoIp = watch('acessoRestritoIp');
  const modulosAcessiveis = watch('modulosAcessiveis') || [];

  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Acesso e Permissões</h3>
      <Controller
        name="usuarioSistema"
        control={control}
        render={({ field }) => (
          <InputWrapper label="Usuário do Sistema" helpText="A senha de acesso será configurada em um segundo passo, realizado após ser salvo o vendedor.">
            <GlassInput {...field} value={field.value || ''} disabled />
          </InputWrapper>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <Controller name="acessoRestritoHorario" control={control} render={({ field }) => (
            <CheckboxWrapper label="Acesso restrito por horário" checked={field.value} onChange={field.onChange} />
          )} />
          <Controller name="acessoRestritoIp" control={control} render={({ field }) => (
            <CheckboxWrapper label="Acesso restrito por IP" checked={field.value} onChange={field.onChange} helpText="Utilize esta opção apenas caso tenha IP fixo" />
          )} />
          {acessoRestritoIp && (
            <Controller name="ipsPermitidos" control={control} render={({ field }) => (
              <InputWrapper label="IPs Permitidos">
                <GlassInput {...field} value={field.value || ''} />
              </InputWrapper>
            )} />
          )}
        </div>
        <Controller
          name="perfilAcessoContatos"
          control={control}
          render={({ field }) => (
            <InputWrapper label="Pode acessar contatos com o perfil">
              <select className="glass-input" {...field} value={field.value || ''}>
                <option value="">Selecione...</option>
                {perfisContatoDisponiveis.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </InputWrapper>
          )}
        />
      </div>
      <h4 className="font-semibold text-gray-700 mt-6 mb-2">Módulos que podem ser acessados</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {modulosDisponiveis.map(modulo => (
          <Controller
            key={modulo}
            name="modulosAcessiveis"
            control={control}
            render={({ field }) => (
              <CheckboxWrapper
                label={modulo}
                checked={field.value.includes(modulo)}
                onChange={(checked) => {
                  const newValue = checked
                    ? [...field.value, modulo]
                    : field.value.filter(m => m !== modulo);
                  field.onChange(newValue);
                }}
              />
            )}
          />
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <Controller name="podeIncluirProdutosNaoCadastrados" control={control} render={({ field }) => (
          <CheckboxWrapper label="Tem permissão para incluir produtos não cadastrados em pedidos de venda e propostas comerciais" checked={field.value} onChange={field.onChange} />
        )} />
        <Controller name="podeEmitirCobrancas" control={control} render={({ field }) => (
          <CheckboxWrapper label="Pode emitir cobranças" checked={field.value} onChange={field.onChange} />
        )} />
      </div>
    </section>
  );
};
