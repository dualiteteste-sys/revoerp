import { faker } from '@faker-js/faker';
import { DashboardStats, FaturamentoMensal } from '../../types';

export const generateMockDashboardStats = (): DashboardStats => {
  const faturamentoAtual = faker.number.float({ min: 20000, max: 150000, precision: 0.01 });
  const faturamentoAnterior = faker.number.float({ min: 15000, max: 120000, precision: 0.01 });
  
  return {
    faturamentoTotalMesAtual: faturamentoAtual,
    faturamentoTotalMesAnterior: faturamentoAnterior,
    novosClientesMesAtual: faker.number.int({ min: 5, max: 50 }),
    novosClientesMesAnterior: faker.number.int({ min: 3, max: 40 }),
    pedidosRealizadosMesAtual: faker.number.int({ min: 100, max: 500 }),
    pedidosRealizadosMesAnterior: faker.number.int({ min: 80, max: 450 }),
  };
};

export const generateMockFaturamentoMensal = (): FaturamentoMensal[] => {
  const data: FaturamentoMensal[] = [];
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleString('pt-BR', { month: 'short' });
    data.push({
      mes: `${monthName}/${date.getFullYear().toString().slice(-2)}`,
      faturamento: faker.number.float({ min: 10000, max: 100000, precision: 0.01 }),
    });
  }
  return data;
};
