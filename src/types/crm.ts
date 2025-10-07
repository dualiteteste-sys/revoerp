import { IEntity } from './base';
import { Cliente } from './cliente';
import { Vendedor } from './vendedor';

export enum CrmEtapa {
  LEAD = 'Lead',
  PROSPECCAO = 'Prospecção',
  NEGOCIACAO = 'Negociação',
  GANHO = 'Ganho',
  PERDIDO = 'Perdido',
}

export interface CrmInteracao extends IEntity {
    oportunidadeId: string;
    tipo: string; // 'Email', 'Ligação', 'Reunião', 'Nota'
    descricao: string;
    data: Date;
    vendedorId: string;
    vendedor?: Vendedor;
}

export interface CrmOportunidade extends IEntity {
    nome: string;
    clienteId: string;
    cliente?: Cliente;
    vendedorId?: string;
    vendedor?: Vendedor;
    valorEstimado?: number;
    etapa: CrmEtapa;
    dataFechamentoPrevista?: Date;
    interacoes?: CrmInteracao[];
}
