import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Wrench, Users, Headphones } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface CategoriaRanking {
  nome: string;
  valor: number;
  porcentagem: number;
  icon: React.ComponentType<any>;
  color: string;
}

export const RankingCategorias: React.FC = () => {
  const categorias: CategoriaRanking[] = [
    {
      nome: 'Produtos',
      valor: 45200,
      porcentagem: 85,
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      nome: 'Serviços',
      valor: 32800,
      porcentagem: 65,
      icon: Wrench,
      color: 'from-purple-500 to-purple-600'
    },
    {
      nome: 'Consultoria',
      valor: 28500,
      porcentagem: 55,
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      nome: 'Suporte',
      valor: 19200,
      porcentagem: 40,
      icon: Headphones,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <GlassCard animate delay={0.4} className="h-96">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-blue-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-800">Ranking por Categoria</h3>
      </div>
      
      <div className="space-y-4">
        {categorias.map((categoria, index) => (
          <motion.div
            key={categoria.nome}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="p-4 rounded-xl bg-glass-50 backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${categoria.color}`}>
                  <categoria.icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{categoria.nome}</p>
                  <p className="text-sm text-gray-600">
                    R$ {categoria.valor.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {categoria.porcentagem}%
              </span>
            </div>
            
            <div className="w-full bg-glass-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${categoria.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${categoria.porcentagem}%` }}
                transition={{ 
                  duration: 1, 
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut" 
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};
