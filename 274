export class RepositoryError extends Error {
  public context?: string;
  public details?: any;

  constructor(message: string, context?: string, details?: any) {
    super(message);
    this.name = 'RepositoryError';
    this.context = context;
    this.details = details;

    // Mantém o stack trace correto para erros customizados
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RepositoryError);
    }
  }
}
