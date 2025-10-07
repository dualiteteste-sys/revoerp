import { Expedicao, PedidoVenda, StatusExpedicao } from '../types';
import { IExpedicaoService } from './interfaces';
import { IExpedicaoRepository } from '../repositories/interfaces';

export class ExpedicaoService implements IExpedicaoService {
  private repository: IExpedicaoRepository;

  constructor(repository: IExpedicaoRepository) {
    this.repository = repository;
  }

  async getPedidosParaExpedir(formaEnvio: string, incluirSemForma: boolean): Promise<PedidoVenda[]> {
    return (this.repository as any).findPedidosParaExpedir(formaEnvio, incluirSemForma);
  }

  async gerarExpedicao(formaEnvio: string, pedidoIds: string[]): Promise<Expedicao> {
    const expedicaoData: Omit<Expedicao, 'id' | 'createdAt' | 'updatedAt'> = {
      lote: `EXP-${Date.now().toString().slice(-8)}`,
      formaEnvio,
      status: StatusExpedicao.AGUARDANDO_ENVIO,
      dataCriacao: new Date(),
    };
    return (this.repository as any).createExpedicao(expedicaoData, pedidoIds);
  }
}
