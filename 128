import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { GlassCard } from './GlassCard';

export function RouteErrorBoundary() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Erro desconhecido';
  }

  return (
    <GlassCard className="m-8 p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado.</h2>
      <p className="text-gray-700 mb-2">A página que você tentou acessar encontrou um problema.</p>
      <p className="text-sm text-gray-500 bg-gray-100 p-2 rounded-md inline-block">
        <i>{errorMessage}</i>
      </p>
    </GlassCard>
  );
}
