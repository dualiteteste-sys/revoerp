import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Vendedor, ContribuinteICMS } from '../../types';
import { VendedorFormData, vendedorSchema } from '../../schemas/vendedorSchema';
import { GenericForm } from '../ui/GenericForm';
import { IdentificacaoSection } from './form/IdentificacaoSection';
import { EnderecoSection } from './form/EnderecoSection';
import { ContatoSection } from './form/ContatoSection';
import { SituacaoSection } from './form/SituacaoSection';
import { ComissionamentoSection } from './form/ComissionamentoSection';
import { ObservacoesSection } from './form/ObservacoesSection';

interface VendedorFormProps {
  vendedor?: Partial<Vendedor>;
  onSave: (vendedor: VendedorFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

const getInitialData = (v?: Partial<Vendedor>): VendedorFormData => ({
  id: v?.id,
  nome: v?.nome || '',
  fantasia: v?.fantasia || '',
  codigo: v?.codigo || '',
  tipoPessoa: v?.tipoPessoa || 'Física',
  cpfCnpj: v?.cpfCnpj || '',
  contribuinte: v?.contribuinte || ContribuinteICMS.NAO_CONTRIBUINTE,
  inscricaoEstadual: v?.inscricaoEstadual || '',
  cep: v?.cep || '',
  cidade: v?.cidade || '',
  uf: v?.uf || '',
  logradouro: v?.logradouro || '',
  bairro: v?.bairro || '',
  numero: v?.numero || '',
  complemento: v?.complemento || '',
  telefone: v?.telefone || '',
  celular: v?.celular || '',
  email: v?.email || '',
  situacao: v?.situacao || 'Ativo com acesso ao sistema',
  deposito: v?.deposito || 'Padrão',
  emailComunicacoes: v?.emailComunicacoes || '',
  usuarioSistema: v?.usuarioSistema || (v?.email ? v.email.split('@')[0] : ''),
  regraLiberacaoComissao: v?.regraLiberacaoComissao || 'Liberação parcial (pelo pagamento)',
  tipoComissao: v?.tipoComissao || 'Comissão com alíquota fixa',
  aliquotaComissao: v?.aliquotaComissao,
  desconsiderarComissaoLinhaProduto: v?.desconsiderarComissaoLinhaProduto || false,
  observacoes: v?.observacoes || '',
  ativo: v?.ativo ?? true,
});

export const VendedorForm: React.FC<VendedorFormProps> = ({ vendedor, onSave, onCancel, loading }) => {
  const form = useForm<VendedorFormData>({
    resolver: zodResolver(vendedorSchema),
    defaultValues: getInitialData(vendedor),
  });

  const { control, handleSubmit, watch, setValue, reset } = form;

  useEffect(() => {
    reset(getInitialData(vendedor));
  }, [vendedor, reset]);
  
  return (
    <GenericForm
      title={vendedor?.id ? 'Editar Vendedor' : 'Novo Vendedor'}
      onSave={handleSubmit(onSave)}
      onCancel={onCancel}
      loading={loading}
      size="max-w-6xl"
    >
      <div className="space-y-8">
        <IdentificacaoSection control={control} watch={watch} />
        <EnderecoSection control={control} setValue={setValue} />
        <ContatoSection control={control} />
        <SituacaoSection control={control} />
        <ComissionamentoSection control={control} />
        <ObservacoesSection control={control} />
      </div>
    </GenericForm>
  );
};
