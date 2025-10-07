import React, { useState, useEffect, useCallback } from 'react';
		import { useForm } from 'react-hook-form';
		import { zodResolver } from '@hookform/resolvers/zod';
		import axios from 'axios';
		import { GenericForm } from '../../ui/GenericForm';
		import toast from 'react-hot-toast';
		import { DadosEmpresaSection } from './DadosEmpresaSection';
		import { EnderecoSection } from './EnderecoSection';
		import { ContatoSection } from './ContatoSection';
		import { RegimeSection } from './RegimeSection';
		import { InscricoesEstaduaisSection } from './InscricoesEstaduaisSection';
		import { PreferenciasContatoSection } from './PreferenciasContatoSection';
		import { AdministradorSection } from './AdministradorSection';
		import { LogoSection } from './LogoSection';
		import { dadosEmpresaSchema, DadosEmpresaFormData } from '../../../schemas/dadosEmpresaSchema';
		import { Empresa } from '../../../types';

		// Transforma a estrutura aninhada do formulário para a estrutura plana do banco
		const flattenFormData = (data: DadosEmpresaFormData): Partial<Empresa> => {
		  const { regime, endereco, contato, administrador, preferenciasContato, ...rest } = data;
		  return {
		    ...rest,
		    ...regime,
		    ...endereco,
		    ...contato,
		    administrador,
		    preferenciasContato,
		  };
		};

		// Transforma a estrutura plana do banco para a estrutura aninhada do formulário,
		// garantindo que todos os campos tenham um valor padrão para evitar erros de "uncontrolled input".
		const getInitialData = (empresa?: Partial<Empresa>): DadosEmpresaFormData => {
		  return {
		    id: empresa?.id,
		    razaoSocial: empresa?.razaoSocial || '',
		    nomeCompleto: empresa?.nomeCompleto || '',
		    fantasia: empresa?.fantasia || '',
		    logoUrl: empresa?.logoUrl || null,
		    
		    regime: {
		      tipoPessoa: empresa?.tipoPessoa || 'PJ',
		      cnpj: empresa?.cnpj || '',
		      cpf: empresa?.cpf || '',
		      cnae: empresa?.cnae || '',
		      crt: empresa?.crt || '',
		      ie: empresa?.ie || '',
		      ieIsento: empresa?.ieIsento || false,
		      im: empresa?.im || '',
		      segmento: empresa?.segmento || '',
		    },
		    
		    endereco: {
		      bairro: empresa?.bairro || '',
		      cep: empresa?.cep || '',
		      cidade: empresa?.cidade || '',
		      complemento: empresa?.complemento || '',
		      logradouro: empresa?.logradouro || '',
		      numero: empresa?.numero || '',
		      semNumero: empresa?.semNumero || false,
		      uf: empresa?.uf || '',
		    },

		    contato: {
		      celular: empresa?.celular || '',
		      email: empresa?.email || '',
		      fax: empresa?.fax || '',
		      fone: empresa?.fone || '',
		      website: empresa?.website || '',
		    },

		    administrador: {
		      celular: empresa?.administrador?.celular || '',
		      email: empresa?.administrador?.email || '',
		      nome: empresa?.administrador?.nome || '',
		    },

		    preferenciasContato: {
		      canais: empresa?.preferenciasContato?.canais || '',
		      comoChamar: empresa?.preferenciasContato?.comoChamar || '',
		    },

		    substitutosTributarios: empresa?.substitutosTributarios?.map(st => ({
		      id: st.id,
		      uf: st.uf || '',
		      ie: st.ie || '',
		    })) || [],
		  };
		};


		export const EmpresaForm: React.FC<EmpresaFormProps> = ({ empresa, onSave, onCancel, loading }) => {
		  const [logoFile, setLogoFile] = useState<File | null>(null);

		  const form = useForm<DadosEmpresaFormData>({
		    resolver: zodResolver(dadosEmpresaSchema),
		    defaultValues: getInitialData(empresa),
		  });

		  const { control, handleSubmit, reset, watch, setValue } = form;
		  const logoPreview = watch('logoUrl');
		  const cnpjValue = watch('regime.cnpj');

		  useEffect(() => {
		    reset(getInitialData(empresa));
		  }, [empresa, reset]);

		  const handleBuscaCnpj = useCallback(async () => {
		    if (!cnpjValue) return;
		    const cleanCnpj = cnpjValue.replace(/\D/g, '');
		    if (cleanCnpj.length !== 14) return;

		    const toastId = toast.loading('Buscando dados do CNPJ...');
		    try {
		      const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
		      setValue('razaoSocial', data.razao_social || '');
		      setValue('fantasia', data.nome_fantasia || '');
		      setValue('endereco.cep', data.cep || '');
		      setValue('endereco.logradouro', data.logradouro || '');
		      setValue('endereco.numero', data.numero || '');
		      setValue('endereco.complemento', data.complemento || '');
		      setValue('endereco.bairro', data.bairro || '');
		      setValue('endereco.cidade', data.municipio || '');
		      setValue('endereco.uf', data.uf || '');
		      setValue('regime.cnae', String(data.cnae_fiscal || ''));
		      setValue('contato.email', data.email || '');
		      setValue('contato.fone', data.ddd_telefone_1 || '');
		      toast.success('Dados preenchidos com sucesso!', { id: toastId });
		    } catch (error) {
		      toast.error('Falha ao buscar dados do CNPJ.', { id: toastId });
		    }
		  }, [cnpjValue, setValue]);

		  const onSubmit = (data: DadosEmpresaFormData) => {
		    const flattenedData = flattenFormData(data);
		    onSave(flattenedData, logoFile);
		  };

		  const onDrop = useCallback((acceptedFiles: File[]) => {
		    const file = acceptedFiles[0];
		    if (file) {
		      if (file.size > 2 * 1024 * 1024) {
		        toast.error("Arquivo inválido: Máx. 2 MB.");
		        return;
		      }
		      if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)) {
		        toast.error("Arquivo inválido: PNG/JPG/SVG permitidos.");
		        return;
		      }
		      setLogoFile(file);
		      const previewUrl = URL.createObjectURL(file);
		      setValue('logoUrl', previewUrl, { shouldValidate: true });
		    }
		  }, [setValue]);

		  const removeLogo = () => {
		    setLogoFile(null);
		    setValue('logoUrl', null, { shouldValidate: true });
		  };

		  return (
		    <GenericForm
		      title={empresa?.id ? 'Editar Empresa' : 'Nova Empresa'}
		      onSave={handleSubmit(onSubmit)}
		      onCancel={onCancel}
		      loading={loading}
		      size="max-w-6xl"
		    >
		      <div className="space-y-12">
		        <RegimeSection control={control} watch={watch} onCnpjBlur={handleBuscaCnpj} />
		        <DadosEmpresaSection control={control} />
		        <EnderecoSection control={control} />
		        <ContatoSection control={control} />
		        <InscricoesEstaduaisSection control={control} />
		        <PreferenciasContatoSection control={control} />
		        <AdministradorSection control={control} />
		        <LogoSection logoPreview={logoPreview} onDrop={onDrop} onRemove={removeLogo} />
		      </div>
		    </GenericForm>
		  );
		};
