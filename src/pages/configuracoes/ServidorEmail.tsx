import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassCard';
import { GlassButton } from '../../components/ui/GlassButton';
import { Loader2, Save, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useConfiguracoes } from '../../contexts/ConfiguracoesContext';
import { ServidorEmailFormData, TipoEnvioEnum, TestEmailFormData, servidorEmailSchema } from '../../schemas/servidorEmailSchema';
import { InputWrapper } from '../../components/ui/InputWrapper';
import { SmtpForm } from '../../components/settings/servidor-email/SmtpForm';
import { TestEmailModal } from '../../components/settings/servidor-email/TestEmailModal';
import { GlassInput } from '../../components/ui/GlassInput';

const DEFAULTS: ServidorEmailFormData = {
  tipoEnvio: "smtp",
  remetenteNome: '',
  remetenteEmail: '',
  replyTo: '',
  host: '',
  porta: 587,
  seguranca: 'starttls',
  autenticacao: true,
  usuario: '',
  senha: '',
};

export const ServidorEmail: React.FC = () => {
    const { settings, saveSettings, loading: loadingContext } = useConfiguracoes();
    const [isSaving, setIsSaving] = useState(false);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [isTesting, setIsTesting] = useState(false);

    const form = useForm<ServidorEmailFormData>({
        resolver: zodResolver(servidorEmailSchema),
        defaultValues: DEFAULTS,
    });

    const { control, handleSubmit, reset, watch } = form;
    const tipoEnvio = watch('tipoEnvio');

    useEffect(() => {
        if (!loadingContext && settings.servidor_email) {
            reset({ ...DEFAULTS, ...settings.servidor_email });
        } else if (!loadingContext) {
            reset(DEFAULTS);
        }
    }, [loadingContext, settings.servidor_email, reset]);

    const onSubmit = async (data: ServidorEmailFormData) => {
        setIsSaving(true);
        const dataToSave = { ...data };
        
        // Mantém a senha original se o campo for deixado em branco
        if (data.tipoEnvio === 'smtp' && data.senha === '') {
            const originalPassword = settings.servidor_email?.senha;
            if (originalPassword) {
                (dataToSave as any).senha = originalPassword;
            }
        }
        
        await saveSettings({ ...settings, servidor_email: dataToSave });
        setIsSaving(false);
    };

    const handleCancel = () => {
        if (!loadingContext) {
            reset({ ...DEFAULTS, ...settings.servidor_email });
            toast('Alterações descartadas.');
        }
    };

    const handleSendTest = async (data: TestEmailFormData) => {
        setIsTesting(true);
        toast.loading('Enviando e-mail de teste...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.dismiss();
        toast.success('E-mail de teste enviado!');
        setIsTesting(false);
        setIsTestModalOpen(false);
    };

    if (loadingContext) {
        return (
          <div className="flex items-center justify-center h-96 w-full">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        );
    }

    return (
        <>
            <GlassCard>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <section>
                        <Controller
                            name="tipoEnvio"
                            control={control}
                            render={({ field }) => (
                                <InputWrapper label="Tipo de envio" helpText="Escolha o mecanismo de envio de e-mails do sistema.">
                                    <select className="glass-input max-w-sm" {...field}>
                                        <option value={TipoEnvioEnum.enum.smtp}>SMTP</option>
                                        <option value={TipoEnvioEnum.enum.mail}>MAIL (Função do Servidor)</option>
                                    </select>
                                </InputWrapper>
                            )}
                        />
                    </section>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tipoEnvio}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {tipoEnvio === 'smtp' && <SmtpForm control={control} watch={watch} />}
                            {tipoEnvio === 'mail' && (
                                <p className="text-sm text-gray-600 bg-glass-50 p-4 rounded-xl">
                                    Usa a função nativa do servidor (mail). Indicado apenas em ambientes que garantem a entrega. Nenhuma configuração adicional é necessária.
                                </p>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {tipoEnvio === 'smtp' && (
                        <section>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-t border-white/30 pt-6">Identidade do Remetente</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Controller
                                    name="remetenteNome"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <InputWrapper label="Nome remetente" error={error?.message}>
                                            <GlassInput {...field} placeholder="Seu Nome / Nome da Empresa" />
                                        </InputWrapper>
                                    )}
                                />
                                <Controller
                                    name="remetenteEmail"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <InputWrapper label="E-mail remetente" error={error?.message}>
                                            <GlassInput type="email" {...field} placeholder="no-reply@seudominio.com" />
                                        </InputWrapper>
                                    )}
                                />
                                <Controller
                                    name="replyTo"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <InputWrapper label="Responder para o e-mail (opcional)" error={error?.message}>
                                            <GlassInput type="email" {...field} placeholder="contato@seudominio.com" />
                                        </InputWrapper>
                                    )}
                                />
                            </div>
                        </section>
                    )}

                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/30">
                        <GlassButton type="button" variant="secondary" icon={Mail} onClick={() => setIsTestModalOpen(true)}>
                            Testar envio
                        </GlassButton>
                        <div className="flex gap-4">
                            <GlassButton type="button" variant="secondary" onClick={handleCancel} disabled={isSaving}>Cancelar</GlassButton>
                            <GlassButton type="submit" disabled={isSaving || loadingContext}>
                                {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                                {isSaving ? 'Salvando...' : 'Salvar'}
                            </GlassButton>
                        </div>
                    </div>
                </form>
            </GlassCard>

            <AnimatePresence>
                {isTestModalOpen && (
                    <TestEmailModal
                        onSend={handleSendTest}
                        onCancel={() => setIsTestModalOpen(false)}
                        loading={isTesting}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default ServidorEmail;
