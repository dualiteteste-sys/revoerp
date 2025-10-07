type RepoErrorPayload = { code?: string; message: string; hint?: string | null; details?: string | null; };

export class RepositoryError extends Error {
  code?: string;
  details?: string | null;
  hint?: string | null;

  constructor(err: RepoErrorPayload) {
    super(err.message);
    this.name = 'RepositoryError';
    this.code = err.code;
    this.details = err.details;
    this.hint = err.hint;
  }
}
