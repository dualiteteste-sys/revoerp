import React, { createContext, useState, useMemo, useCallback, useContext, ReactNode } from 'react';
import { Cliente, Vendedor, Produto, PedidoVendaItem, StatusPedidoVenda } from '../types';
import { usePedidoVenda } from '../hooks/data/usePedidoVenda';
import toast from 'react-hot-toast';

export interface CartItem extends PedidoVendaItem {
  produto: Pick<Produto, 'id' | 'nome' | 'codigo' | 'unidade'>;
}

interface PdvContextType {
  isCaixaAberto: boolean;
  isAberturaModalOpen: boolean;
  cart: CartItem[];
  selectedCliente: Cliente | null;
  selectedVendedor: Vendedor | null;
  observacao: string;
  totalVenda: number;
  totalItens: number;
  totalQuantidade: number;
  
  handleOpenAberturaModal: () => void;
  handleCloseAberturaModal: () => void;
  handleAbrirCaixa: (valorInicial: number) => void;
  handleFecharCaixa: () => void;
  
  addToCart: (produto: Produto, quantidade: number) => void;
  updateQuantity: (produtoId: string, quantidade: number) => void;
  removeFromCart: (produtoId: string) => void;
  clearCart: () => void;
  
  setSelectedCliente: (cliente: Cliente | null) => void;
  setSelectedVendedor: (vendedor: Vendedor | null) => void;
  setObservacao: (obs: string) => void;
  
  finalizarVenda: () => Promise<void>;
  salvarParaDepois: () => void;
  cancelarVenda: () => void;
}

const PdvContext = createContext<PdvContextType | undefined>(undefined);

export const PdvProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCaixaAberto, setIsCaixaAberto] = useState(false);
  const [isAberturaModalOpen, setIsAberturaModalOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [selectedVendedor, setSelectedVendedor] = useState<Vendedor | null>(null);
  const [observacao, setObservacao] = useState('');
  
  const { createPedidoVenda } = usePedidoVenda();

  const handleOpenAberturaModal = () => setIsAberturaModalOpen(true);
  const handleCloseAberturaModal = () => setIsAberturaModalOpen(false);

  const handleAbrirCaixa = (valorInicial: number) => {
    console.log(`Caixa aberto com valor inicial de R$ ${valorInicial}`);
    setIsCaixaAberto(true);
    handleCloseAberturaModal();
    toast.success('Caixa aberto com sucesso!');
  };

  const handleFecharCaixa = () => setIsCaixaAberto(false);

  const addToCart = (produto: Produto, quantidade: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.produtoId === produto.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.produtoId === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade, valorTotal: (item.quantidade + quantidade) * item.valorUnitario }
            : item
        );
      } else {
        const newItem: CartItem = {
            id: crypto.randomUUID(),
            pedidoId: '',
            produtoId: produto.id,
            descricao: produto.nome,
            codigo: produto.codigo,
            unidade: produto.unidade,
            quantidade,
            valorUnitario: produto.precoVenda,
            valorTotal: quantidade * produto.precoVenda,
            produto: { id: produto.id, nome: produto.nome, codigo: produto.codigo, unidade: produto.unidade },
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return [...prevCart, newItem];
      }
    });
  };

  const updateQuantity = (produtoId: string, quantidade: number) => {
    setCart(prevCart => prevCart.map(item => 
      item.produtoId === produtoId 
        ? { ...item, quantidade, valorTotal: quantidade * item.valorUnitario } 
        : item
    ));
  };

  const removeFromCart = (produtoId: string) => {
    setCart(prevCart => prevCart.filter(item => item.produtoId !== produtoId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCliente(null);
    setSelectedVendedor(null);
    setObservacao('');
  };

  const { totalVenda, totalItens, totalQuantidade } = useMemo(() => {
    const totalVenda = cart.reduce((sum, item) => sum + item.valorTotal, 0);
    const totalItens = cart.length;
    const totalQuantidade = cart.reduce((sum, item) => sum + item.quantidade, 0);
    return { totalVenda, totalItens, totalQuantidade };
  }, [cart]);

  const finalizarVenda = async () => {
    if (cart.length === 0) {
      toast.error('Adicione pelo menos um produto ao carrinho.');
      return;
    }

    const pedidoData = {
      clienteId: selectedCliente?.id,
      vendedorId: selectedVendedor?.id,
      observacoes: observacao,
      totalProdutos: totalVenda,
      valorTotal: totalVenda,
      status: StatusPedidoVenda.FATURADO, // PDV geralmente fatura direto
      formaEnvio: 'Retirada',
    };
    
    const itensData = cart.map(({ produto, ...item }) => item);

    await createPedidoVenda(pedidoData as any, itensData);
    clearCart();
  };

  const salvarParaDepois = () => {
    toast.success('Venda salva como pré-venda! (Funcionalidade em desenvolvimento)');
  };

  const cancelarVenda = () => {
    if (window.confirm('Tem certeza que deseja cancelar esta venda? Todos os itens serão removidos.')) {
      clearCart();
      toast.success('Venda cancelada.');
    }
  };

  const value = {
    isCaixaAberto,
    isAberturaModalOpen,
    cart,
    selectedCliente,
    selectedVendedor,
    observacao,
    totalVenda,
    totalItens,
    totalQuantidade,
    handleOpenAberturaModal,
    handleCloseAberturaModal,
    handleAbrirCaixa,
    handleFecharCaixa,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setSelectedCliente,
    setSelectedVendedor,
    setObservacao,
    finalizarVenda,
    salvarParaDepois,
    cancelarVenda,
  };

  return <PdvContext.Provider value={value}>{children}</PdvContext.Provider>;
};

export const usePdv = () => {
  const context = useContext(PdvContext);
  if (context === undefined) {
    throw new Error('usePdv must be used within a PdvProvider');
  }
  return context;
};
