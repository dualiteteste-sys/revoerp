import { FaturaVenda, PedidoVenda, StatusFatura, StatusPedidoVenda, StatusContaReceber } from '../types';
import { IFaturaVendaService } from './interfaces';
import { IFaturaVendaRepository, IPedidoVendaRepository, IContasReceberRepository } from '../repositories/interfaces';

export class FaturaVendaService implements IFaturaVendaService {
  private faturaRepository: IFaturaVendaRepository;
  private pedidoRepository: IPedidoVendaRepository;
  private contasReceberRepository: IContasReceberRepository;

  constructor(
    faturaRepository: IFaturaVendaRepository,
    pedidoRepository: IPedidoVendaRepository,
    contasReceberRepository: IContasReceberRepository
  ) {
    this.faturaRepository = faturaRepository;
    this.pedidoRepository = pedidoRepository;
    this.contasReceberRepository = contasReceberRepository;
  }

  async getAllFaturas(options: { page?: number; pageSize?: number } = {}): Promise<{ data: FaturaVenda[]; count: number }> {
    return this.faturaRepository.findAll(options);
  }

  async faturarPedido(pedidoId: string): Promise<FaturaVenda> {
    const pedido = await this.pedidoRepository.findById(pedidoId);
    if (!pedido) {
        throw new Error('Pedido de venda não encontrado.');
    }

    if (pedido.status !== StatusPedidoVenda.ABERTO) {
      throw new Error('Apenas pedidos com status "ABERTO" podem ser faturados.');
    }

    // 1. Criar a fatura
    const dataVencimento = new Date();
    dataVencimento.setDate(dataVencimento.getDate() + 30); // Vencimento em 30 dias

    const faturaParaCriar = {
      pedidoId: pedido.id,
      numeroFatura: `FAT-${pedido.numero}`,
      dataEmissao: new Date(),
      dataVencimento: dataVencimento,
      valorTotal: pedido.valorTotal,
      status: StatusFatura.EMITIDA,
    };

    const novaFatura = await this.faturaRepository.create(faturaParaCriar);

    // 2. Criar a conta a receber correspondente
    const contaParaCriar = {
        faturaId: novaFatura.id,
        clienteId: pedido.clienteId,
        descricao: `Referente à Fatura ${novaFatura.numeroFatura}`,
        valor: novaFatura.valorTotal,
        dataVencimento: novaFatura.dataVencimento,
        status: StatusContaReceber.A_RECEBER,
    };
    await this.contasReceberRepository.create(contaParaCriar as any);

    // 3. Atualizar o status do pedido
    await this.pedidoRepository.update(pedido.id, { status: StatusPedidoVenda.FATURADO });

    return novaFatura;
  }
}
