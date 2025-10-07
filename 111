import React from 'react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { GlassInput } from '../../ui/GlassInput';
import { InputWrapper } from '../../ui/InputWrapper';

interface SmtpFormProps {
  control: Control<any>;
  watch: UseFormWatch<any>;
}

export const SmtpForm: React.FC<SmtpFormProps> = ({ control, watch }) => {
  const autenticacao = watch('autenticacao');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="host"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Servidor" error={error?.message}>
              <GlassInput {...field} placeholder="smtp.seudominio.com" />
            </InputWrapper>
          )}
        />
        <Controller
          name="porta"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWrapper label="Porta" error={error?.message}>
              <GlassInput type="number" {...field} placeholder="587" />
            </InputWrapper>
          )}
        />
      </div>
      <Controller
        name="seguranca"
        control={control}
        render={({ field }) => (
          <InputWrapper label="Segurança da conexão">
            <select className="glass-input" {...field}>
              <option value="none">Nenhuma</option>
              <option value="starttls">STARTTLS</option>
              <option value="ssl_tls">SSL/TLS</option>
            </select>
          </InputWrapper>
        )}
      />
      <Controller
        name="autenticacao"
        control={control}
        render={({ field }) => (
            <InputWrapper label="Servidor requer autenticação">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox" checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                    <span className="text-sm text-gray-700">Sim, requer autenticação</span>
                </label>
            </InputWrapper>
        )}
      />
      {autenticacao && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="usuario"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWrapper label="Usuário" error={error?.message}>
                <GlassInput {...field} placeholder="usuario@seudominio.com" />
              </InputWrapper>
            )}
          />
          <Controller
            name="senha"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWrapper label="Senha" error={error?.message} helpText="Deixe em branco para manter a senha atual.">
                <GlassInput type="password" {...field} placeholder="••••••••" />
              </InputWrapper>
            )}
          />
        </div>
      )}
    </div>
  );
};
