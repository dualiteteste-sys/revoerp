import { describe, it, expect } from 'vitest';
import { PedidoVendaService } from './PedidoVendaService';
import { PedidoVenda, PedidoVendaItem } from '../types';

describe('PedidoVendaService.calculateTotals', () => {
  it('should calculate totals correctly for a simple order', () => {
    const pedido: Partial<PedidoVenda> = {
      itens: [
        { valorTotal: 20 },
        { valorTotal: 50 },
      ] as PedidoVendaItem[],
    };
    const totals = PedidoVendaService.calculateTotals(pedido);
    expect(totals.totalProdutos).toBe(70);
    expect(totals.valorTotal).toBe(70);
  });

  it('should apply a percentage discount correctly', () => {
    const pedido: Partial<PedidoVenda> = {
      itens: [{ valorTotal: 100 }] as PedidoVendaItem[],
      desconto: '10%',
    };
    const totals = PedidoVendaService.calculateTotals(pedido);
    expect(totals.totalProdutos).toBe(100);
    expect(totals.valorTotal).toBe(90); // 100 - 10%
  });

  it('should apply a fixed value discount correctly', () => {
    const pedido: Partial<PedidoVenda> = {
      itens: [{ valorTotal: 100 }] as PedidoVendaItem[],
      desconto: '15.50',
    };
    const totals = PedidoVendaService.calculateTotals(pedido);
    expect(totals.totalProdutos).toBe(100);
    expect(totals.valorTotal).toBe(84.50); // 100 - 15.50
  });

  it('should add freight and expenses correctly', () => {
    const pedido: Partial<PedidoVenda> = {
      itens: [{ valorTotal: 100 }] as PedidoVendaItem[],
      freteCliente: 20,
      despesas: 5,
    };
    const totals = PedidoVendaService.calculateTotals(pedido);
    expect(totals.totalProdutos).toBe(100);
    expect(totals.valorTotal).toBe(125); // 100 + 20 + 5
  });

  it('should handle all calculations together', () => {
    const pedido: Partial<PedidoVenda> = {
      itens: [
        { valorTotal: 200 },
        { valorTotal: 50 },
      ] as PedidoVendaItem[],
      desconto: '10%', // 10% of 250 = 25
      freteCliente: 30,
      despesas: 10,
    };
    const totals = PedidoVendaService.calculateTotals(pedido);
    expect(totals.totalProdutos).toBe(250);
    expect(totals.valorTotal).toBe(265); // 250 - 25 + 30 + 10
  });

  it('should handle empty items array', () => {
    const pedido: Partial<PedidoVenda> = {
      itens: [],
    };
    const totals = PedidoVendaService.calculateTotals(pedido);
    expect(totals.totalProdutos).toBe(0);
    expect(totals.valorTotal).toBe(0);
    expect(totals.pesoBruto).toBe(0);
    expect(totals.pesoLiquido).toBe(0);
  });

  it('should calculate weights correctly', () => {
    const pedido: Partial<PedidoVenda> = {
      itens: [
        { quantidade: 2, produto: { pesoBruto: 1.5, pesoLiquido: 1.2 } },
        { quantidade: 3, produto: { pesoBruto: 0.5, pesoLiquido: 0.4 } },
      ] as any, // Cast to any to simplify mock
    };
    const totals = PedidoVendaService.calculateTotals(pedido);
    expect(totals.pesoBruto).toBeCloseTo(4.5); // (2 * 1.5) + (3 * 0.5) = 3 + 1.5
    expect(totals.pesoLiquido).toBeCloseTo(3.6); // (2 * 1.2) + (3 * 0.4) = 2.4 + 1.2
  });
});
