import { IEntity } from './base';

export interface Perfil extends IEntity {
  empresaId: string;
  nomeCompleto: string;
  cpf?: string;
  papeis?: Papel[];
}

export interface Papel extends IEntity {
  nome: string;
  permissoes?: string[]; // Array de IDs de permissão
}

export interface Permissao extends IEntity {
  descricao: string;
}
