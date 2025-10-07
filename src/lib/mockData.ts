import { faker } from '@faker-js/faker';
import { Atividade } from '../types';

export const generateMockAtividades = (): Atividade[] => 
  Array.from({ length: 5 }, (_, i) => ({
    id: faker.string.uuid(),
    tipo: faker.helpers.arrayElement(['Novo Pedido', 'Cliente Cadastrado', 'Fatura Paga', 'OS Finalizada']),
    descricao: faker.lorem.sentence({ min: 4, max: 8 }),
    timestamp: faker.date.recent({ days: 2 }),
    usuario: faker.person.firstName(),
  })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
