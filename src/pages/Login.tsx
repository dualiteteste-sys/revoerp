// src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { LogIn, Loader2, Mail, KeyRound } from 'lucide-react';

import { Logo } from '../components/ui/Logo';
import { PageLoader } from '../components/layout/PageLoader';

import { useAuth } from '../contexts/AuthContext'; // mantém este caminho se seu AuthContext está em src/contexts

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔁 Agora usamos o contexto (sem chamar o supabase direto aqui)
  const { status, session, signIn } = useAuth();

  // ✅ Se já houver sessão (logado), sai da tela de login
  useEffect(() => {
    if (status === 'ready' && session) {
      // troque para '/' se não existir a rota /dashboard
      navigate('/dashboard', { replace: true });
    }
  }, [status, session, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Login realizado com sucesso!');
      // força o redirect imediato (além do efeito acima)
      navigate('/dashboard', { replace: true }); // troque para '/' se preferir
    } catch (error: any) {
      toast.error(error?.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Enquanto o AuthContext está carregando o estado inicial
  if (status === 'loading') {
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
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Bem-vindo de volta!</h2>
          <p className="text-center text-gray-600 mb-8">Faça login para acessar seu painel.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all"
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-100/50 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-300 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="form-checkbox" />
                Lembrar-me
              </label>
              <a href="#" className="font-medium text-blue-600 hover:underline">Esqueci minha senha</a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
            >
              {loading ? <Loader2 className="animate-spin" /> : <LogIn />}
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Não tem uma conta?{' '}
            <Link to="/signup" className="font-bold text-blue-600 hover:underline">
              Crie uma agora
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
