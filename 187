import { useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UseFormSetValue } from 'react-hook-form';

export const useCep = <T extends Record<string, any>>(setValue: UseFormSetValue<T>) => {
  const handleBuscaCep = useCallback(async (cep: string, isCobranca: boolean = false) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    const toastId = toast.loading('Buscando CEP...');
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (data.erro) {
        toast.error('CEP não encontrado.', { id: toastId });
        return;
      }
      
      const fields: any = {
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      };

      if (isCobranca) {
        setValue('cobrancaCep' as any, cep);
        setValue('cobrancaLogradouro' as any, fields.logradouro);
        setValue('cobrancaBairro' as any, fields.bairro);
        setValue('cobrancaCidade' as any, fields.cidade);
        setValue('cobrancaEstado' as any, fields.estado);
      } else {
        setValue('cep' as any, cep);
        setValue('logradouro' as any, fields.logradouro);
        setValue('bairro' as any, fields.bairro);
        setValue('cidade' as any, fields.cidade);
        setValue('estado' as any, fields.estado);
        setValue('pais' as any, 'Brasil');
      }
      toast.success('Endereço preenchido!', { id: toastId });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast.error('Falha ao buscar CEP.', { id: toastId });
    }
  }, [setValue]);

  return { handleBuscaCep };
};
