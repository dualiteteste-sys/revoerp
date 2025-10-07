import { IEntity } from './base';

export enum TipoEmbalagem {
  ENVELOPE = 'ENVELOPE',
  CAIXA = 'CAIXA',
  CILINDRO = 'CILINDRO',
}

export interface Embalagem extends IEntity {
  descricao: string;
  tipo: TipoEmbalagem;
  larguraCm?: number;
  alturaCm?: number;
  comprimentoCm?: number;
  diametroCm?: number;
  pesoKg: number;
}
