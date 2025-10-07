import { z } from 'zod';

export const TipoEnvioEnum = z.enum(['smtp', 'mail']);
export type TipoEnvio = z.infer<typeof TipoEnvioEnum>;

const baseSchema = z.object({
  tipoEnvio: TipoEnvioEnum.default('smtp'),
  remetenteNome: z.string().optional(),
  remetenteEmail: z.string().email({ message: "E-mail do remetente inválido." }).optional().or(z.literal("")),
  replyTo: z.string().email({ message: "E-mail de resposta inválido." }).optional().or(z.literal("")),
});

const smtpFields = z.object({
  host: z.string().optional(),
  porta: z.coerce.number().optional(),
  seguranca: z.enum(['none', 'starttls', 'ssl_tls']).optional(),
  autenticacao: z.boolean().optional(),
  usuario: z.string().optional(),
  senha: z.string().optional(),
});

export const servidorEmailSchema = baseSchema.merge(smtpFields).superRefine((data, ctx) => {
  if (data.tipoEnvio === 'smtp') {
    if (!data.remetenteNome) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nome do remetente é obrigatório.", path: ["remetenteNome"] });
    }
    if (!data.remetenteEmail) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "E-mail do remetente é obrigatório.", path: ["remetenteEmail"] });
    }
    if (!data.host) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Servidor SMTP é obrigatório.", path: ["host"] });
    }
    if (!data.porta) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Porta SMTP é obrigatória.", path: ["porta"] });
    }
    if (data.autenticacao && !data.usuario) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Usuário é obrigatório para autenticação.", path: ["usuario"] });
    }
  }
});

export type ServidorEmailFormData = z.infer<typeof servidorEmailSchema>;

export const testEmailSchema = z.object({
  para: z.string().email("E-mail do destinatário inválido."),
  assunto: z.string().optional(),
  mensagem: z.string().optional(),
});

export type TestEmailFormData = z.infer<typeof testEmailSchema>;
