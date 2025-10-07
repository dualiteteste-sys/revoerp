import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PedidoVendaService } from '../services/PedidoVendaService';
import { PedidoVenda } from '../types';
import { Loader2 } from 'lucide-react';

export const NovaFaturaVenda: React.FC = () => {
    const { pedidoId } = useParams<{ pedidoId: string }>();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState<PedidoVenda | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const pedidoService = useMemo(() => new PedidoVendaService(), []);

    useEffect(() => {
        if (!pedidoId) {
            navigate('/pedidos-vendas');
            return;
        }

        const loadPedido = async () => {
            try {
                setLoading(true);
                const data = await pedidoService.repository.findById(pedidoId);
                if (!data) {
                    throw new Error('Pedido de venda não encontrado.');
                }
                setPedido(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar pedido.');
            } finally {
                setLoading(false);
            }
        };

        loadPedido();
    }, [pedidoId, navigate, pedidoService]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                <p className="font-semibold">Ocorreu um erro.</p>
                <p className="text-sm mt-2">{error}</p>
            </div>
        );
    }
    
    return (
        <div>
            <Header 
                title={`Emitir Nota Fiscal para o Pedido ${pedido?.numero}`}
                subtitle="Preencha os dados para emitir a NF-e"
            />
            {/* O conteúdo do formulário de emissão de nota fiscal será implementado aqui */}
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
                <code>{JSON.stringify(pedido, null, 2)}</code>
            </pre>
        </div>
    );
};
