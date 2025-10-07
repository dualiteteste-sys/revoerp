// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { status, session } = useAuth();
  const location = useLocation();

  // Enquanto o estado de auth está sendo carregado, não renderiza nada (ou use um loader)
  if (status === 'loading') {
    return null; // opcional: <div>Carregando...</div>
  }

  // Se não houver sessão, manda para o login e guarda a rota de origem
  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Autenticado → libera a rota interna
  return <>{children}</>;
};
