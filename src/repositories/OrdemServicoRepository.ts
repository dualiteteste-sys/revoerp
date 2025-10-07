import { BaseRepository } from './BaseRepository';
import { OrdemServico, OrdemServicoItem, OrdemServicoAnexo, Vendedor } from '../types';
import { camelToSnake, snakeToCamel } from '../lib/utils';

export class OrdemServicoRepository extends BaseRepository<OrdemServico> {
  constructor() {
    super('ordens_servico');
  }

  protected createEntity(data: Omit<OrdemServico, 'id' | 'createdAt' | 'updatedAt'>): OrdemServico {
    return {
      ...data,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      itens: [],
      anexos: [],
      totalServicos: 0,
      orcar: false,
      status: data.status || 'ABERTA',
      prioridade: data.prioridade || 'MEDIA',
      dataInicio: new Date(),
    };
  }

  async findAll(): Promise<OrdemServico[]> {
    // Otimizado: Carrega apenas os dados da view, sem itens ou anexos.
    const { data: viewData, error: viewError } = await this.supabase
      .from('ordens_servico_view')
      .select('*')
      .order('created_at', { ascending: false });

    this.handleError('findAll (view)', viewError);
    if (!viewData) return [];

    const ordensServico = (snakeToCamel(viewData) as any[]).map(os => ({
      ...os,
      cliente: os.clienteId ? { id: os.clienteId, nome: os.clienteNome, email: os.clienteEmail } : undefined,
      vendedor: os.vendedorId ? { id: os.vendedorId, nome: os.vendedorNome } : undefined,
      tecnico: os.tecnicoId ? { id: os.tecnicoId, nome: os.tecnicoNome } : undefined,
      itens: [], // Itens não são carregados na listagem
      anexos: [], // Anexos não são carregados na listagem
    })) as OrdemServico[];

    return ordensServico;
  }

  async findById(id: string): Promise<OrdemServico | null> {
    const { data: viewData, error: viewError } = await this.supabase
      .from('ordens_servico_view')
      .select('*')
      .eq('id', id)
      .single();

    if (viewError && viewError.code !== 'PGRST116') {
      this.handleError('findById (view)', viewError);
    }
    if (!viewData) return null;

    const os: any = snakeToCamel(viewData);
    const ordemServico = {
        ...os,
        cliente: os.clienteId ? { id: os.clienteId, nome: os.clienteNome, email: os.clienteEmail } : undefined,
        vendedor: os.vendedorId ? { id: os.vendedorId, nome: os.vendedorNome } : undefined,
        tecnico: os.tecnicoId ? { id: os.tecnicoId, nome: os.tecnicoNome } : undefined,
    } as OrdemServico;
    
    const { data: itensData, error: itensError } = await this.supabase.from('ordem_servico_itens').select('*, servico:servicos(*)').eq('ordem_servico_id', id);
    this.handleError('findById (itens)', itensError);
    ordemServico.itens = snakeToCamel(itensData || []) as OrdemServicoItem[];

    const { data: anexosData, error: anexosError } = await this.supabase.from('ordem_servico_anexos').select('*').eq('ordem_servico_id', id);
    this.handleError('findById (anexos)', anexosError);
    ordemServico.anexos = snakeToCamel(anexosData || []) as OrdemServicoAnexo[];

    return ordemServico;
  }

  async create(data: Partial<Omit<OrdemServico, 'id' | 'createdAt' | 'updatedAt'>>): Promise<OrdemServico> {
    const { itens, anexos, ...osData } = data;
    const newOS = await super.create(osData as any);

    if (itens && itens.length > 0) {
      const itensParaInserir = itens.map(item => {
        const { id, servico, ...rest } = item;
        return {
          ...camelToSnake(rest),
          ordem_servico_id: newOS.id,
        };
      });
      const { error: itensError } = await this.supabase
        .from('ordem_servico_itens')
        .insert(itensParaInserir);
      this.handleError('create (itens)', itensError);
    }
    
    const reloadedOS = await this.findById(newOS.id);
    if (!reloadedOS) throw new Error("Falha ao recarregar a OS após a criação.");
    return reloadedOS;
  }

  async update(id: string, updates: Partial<OrdemServico>): Promise<OrdemServico> {
    const { itens, anexos, ...osUpdates } = updates;
    await super.update(id, osUpdates);

    // Apenas atualiza itens se eles forem passados
    if (itens) {
        await this.supabase.from('ordem_servico_itens').delete().eq('ordem_servico_id', id);
        if (itens.length > 0) {
          const itensParaInserir = itens.map(item => {
            const { id: itemId, servico, ...rest } = item;
            return {
              ...camelToSnake(rest),
              ordem_servico_id: id,
            };
          });
          const { error: itensError } = await this.supabase
            .from('ordem_servico_itens')
            .insert(itensParaInserir);
          this.handleError('update (itens)', itensError);
        }
    }

    const reloadedOS = await this.findById(id);
    if (!reloadedOS) throw new Error("Falha ao recarregar a OS após a atualização.");
    return reloadedOS;
  }
}
