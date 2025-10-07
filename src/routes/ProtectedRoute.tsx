// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status, session } = useAuth();

  // enquanto carrega o estado inicial de auth, evite "piscar" tela
  if (status === 'loading') return null; // ou um spinner

  // se não tiver sessão, manda pro login
  if (!session) return <Navigate to="/login" replace />;

  // autenticado: libera a rota
  return <>{children}</>;
};
