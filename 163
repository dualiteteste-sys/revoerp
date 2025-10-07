import { useState, useCallback, useEffect, useMemo } from 'react';
import { FluxoCaixa, TipoMovimentoCaixa } from '../../types';
import { useService } from '../useService';

export const useCaixa = () => {
  const [movimentacoes, setMovimentacoes] = useState<FluxoCaixa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const service = useService('fluxoCaixa');

  const loadMovimentacoes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getAllMovimentacoes();
      setMovimentacoes(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar movimentações do caixa';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadMovimentacoes();
  }, [loadMovimentacoes]);

  const { saldoAtual, totalEntradas, totalSaidas } = useMemo(() => {
    return movimentacoes.reduce(
      (acc, mov) => {
        if (mov.tipo === TipoMovimentoCaixa.ENTRADA) {
          acc.totalEntradas += mov.valor;
          acc.saldoAtual += mov.valor;
        } else {
          acc.totalSaidas += mov.valor;
          acc.saldoAtual -= mov.valor;
        }
        return acc;
      },
      { saldoAtual: 0, totalEntradas: 0, totalSaidas: 0 }
    );
  }, [movimentacoes]);

  return { movimentacoes, saldoAtual, totalEntradas, totalSaidas, loading, error, loadMovimentacoes };
};
