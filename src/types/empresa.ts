import { IEntity } from './base';

		export interface EmpresaSubstitutoTributario {
		  id: string;
		  uf: string;
		  ie: string;
		}

		export interface Empresa extends IEntity {
		  razaoSocial: string;
		  nomeCompleto?: string;
		  fantasia?: string;

		  // Endereço
		  cep?: string;
		  logradouro?: string;
		  numero?: string;
		  semNumero?: boolean;
		  complemento?: string;
		  bairro?: string;
		  cidade?: string;
		  uf?: string;

		  // Contato
		  fone?: string;
		  fax?: string;
		  celular?: string;
		  email?: string;
		  website?: string;

		  // Regime
		  segmento?: string;
		  tipoPessoa?: 'PJ' | 'PF' | 'Estrangeiro';
		  cnpj?: string;
		  cpf?: string;
		  ie?: string;
		  ieIsento?: boolean;
		  im?: string;
		  cnae?: string;
		  crt?: string;

		  // Preferências de Contato
		  preferenciasContato?: {
		    comoChamar?: string;
		    canais?: string;
		  };

		  // Administrador
		  administrador?: {
		    nome?: string;
		    email?: string;
		    celular?: string;
		  };

		  // Logo
		  logoUrl?: string;

		  // Relações
		  substitutosTributarios?: EmpresaSubstitutoTributario[];
		}
