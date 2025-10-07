import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres.'),
  cpf: z.string().refine(value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value), 'CPF inválido.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
