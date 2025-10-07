import { useState, useMemo, useCallback, useEffect } from 'react';
import { useService } from '../useService';
import { VisaoCobranca } from '../../repositories/CobrancasRepository';
import toast from 'react-hot-toast';

export const useCobrancas = () => {
  const [cobrancas, setCobrancas] = useState<VisaoCobranca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [competencia, setCompetencia] = useState<string>(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);

  const service = useService('cobrancas');

  const loadCobrancas = useCallback(async (comp: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getVisaoCobrancas(comp);
      setCobrancas(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar cobranças';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [service]);

  const gerarCobrancas = async () => {
    const promise = service.gerarCobrancas(competencia);
    toast.promise(promise, {
      loading: 'Gerando cobranças...',
      success: (result) => {
        loadCobrancas(competencia);
        return `${result.geradas} cobranças geradas. ${result.existentes} já existiam.`;
      },
      error: (err) => `Falha ao gerar cobranças: ${err.message}`,
    });
    await promise;
  };

  const enviarBoletos = async (cobrancasIds: string[]) => {
    const promise = service.enviarBoletos(cobrancasIds);
    toast.promise(promise, {
      loading: 'Iniciando envio de boletos...',
      success: 'Envio de boletos concluído!',
      error: (err) => `Falha no envio: ${err.message}`,
    });
    await promise;
  };

  useEffect(() => {
    loadCobrancas(competencia);
  }, [competencia, loadCobrancas]);
  
  const totais = useMemo(() => {
    return {
      quantidade: cobrancas.length,
      valor: cobrancas.reduce((acc, item) => acc + item.valorTotal, 0),
    };
  }, [cobrancas]);

  return { cobrancas, loading, error, competencia, setCompetencia, gerarCobrancas, enviarBoletos, totais, loadCobrancas };
};
