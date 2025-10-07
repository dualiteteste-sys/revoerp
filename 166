import { useState, useMemo, useCallback, useEffect } from 'react';
import { Comissao, StatusComissao } from '../../types';
import { useService } from '../useService';
import toast from 'react-hot-toast';

const PAGE_SIZE = 15;

export const useComissoes = () => {
  const [comissoes, setComissoes] = useState<Comissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const service = useService('comissoes');

  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const loadComissoes = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { data, count } = await service.getAll({ page, pageSize: PAGE_SIZE });
      setComissoes(data);
      setTotalItems(count);
      setCurrentPage(page);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar comissões';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadComissoes(1);
  }, [loadComissoes]);
  
  const kpis = useMemo(() => {
    const totalAPagar = comissoes
      .filter(c => c.status === StatusComissao.LIBERADA)
      .reduce((sum, c) => sum + c.valorComissao, 0);

    const totalPagoNoMes = comissoes
      .filter(c => c.status === StatusComissao.PAGA && new Date(c.dataPagamento!).getMonth() === new Date().getMonth())
      .reduce((sum, c) => sum + c.valorComissao, 0);

    const ranking = comissoes.reduce((acc, c) => {
        acc[c.vendedorNome] = (acc[c.vendedorNome] || 0) + c.valorComissao;
        return acc;
    }, {} as Record<string, number>);

    const topVendedor = Object.entries(ranking).sort((a, b) => b[1] - a[1])[0];

    return [
      { title: 'Total a Pagar', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalAPagar) },
      { title: 'Total Pago no Mês', value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPagoNoMes) },
      { title: 'Top Vendedor', value: topVendedor ? topVendedor[0] : 'N/A' },
      { title: 'Mês de Referência', value: new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' }) },
    ];
  }, [comissoes]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      loadComissoes(page);
    }
  };

  return { comissoes, loading, error, kpis, loadComissoes, currentPage, totalPages, goToPage };
};
