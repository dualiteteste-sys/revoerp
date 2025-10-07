import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User, Mail, KeyRound, FileText } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { IMaskInput } from 'react-imask';
import { signUpSchema, SignUpFormData } from '../schemas/authSchema';
import { InputWrapper } from '../components/ui/InputWrapper';
import { useAuth } from '../contexts/AuthContext';
import { PageLoader } from '../components/layout/PageLoader';

export const SignUp: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  });
  const navigate = useNavigate();
  const { session, status: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && session) {
      navigate('/dashboard', { replace: true });
    }
  }, [session, authLoading, navigate]);

  const handleSignUp = async (data: SignUpFormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          fullName: data.fullName,
          cpf_cnpj: data.cpf, // Mantido como cpf_cnpj para o trigger
        },
      },
    });

    if (error) {
      toast.error(error.message || 'Falha ao criar conta. Verifique os dados.');
    } else {
      toast.success('Cadastro realizado! Verifique seu e-mail para confirmação.');
      navigate('/login');
    }
  };

  if (authLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F4F7FE] p-4 relative overflow-hidden">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-200/50 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-200/50 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl shadow-blue-500/10 p-8">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Crie sua Conta</h2>
          <p className="text-center text-gray-600 mb-8">Comece a gerenciar sua empresa em minutos.</p>
          
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <InputWrapper label="" error={errors.fullName?.message}>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  {...register('fullName')}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all"
                />
              </div>
            </InputWrapper>
            
            <InputWrapper label="" error={errors.cpf?.message}>
                <Controller
                  name="cpf"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <IMaskInput
                        mask="000.000.000-00"
                        placeholder="Seu CPF"
                        value={field.value}
                        onAccept={(value) => field.onChange(value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all"
                      />
                    </div>
                  )}
                />
            </InputWrapper>

            <InputWrapper label="" error={errors.email?.message}>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  {...register('email')}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all"
                />
              </div>
            </InputWrapper>
            
            <InputWrapper label="" error={errors.password?.message}>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Crie uma senha forte (mín. 6 caracteres)"
                  {...register('password')}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all"
                />
              </div>
            </InputWrapper>
            
            <motion.button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <User />}
              <span>{isSubmitting ? 'Criando conta...' : 'Criar conta'}</span>
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-bold text-blue-600 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
