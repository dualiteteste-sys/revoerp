import { useEffect } from 'react';

interface ShortcutActions {
  onAbrirCaixa: () => void;
  onCancelarModal: () => void;
  onContinuar: () => void;
  onSalvarParaDepois: () => void;
  onCancelarVenda: () => void;
  onFocusBuscaProduto: () => void;
  onFocusCliente: () => void;
  onFocusVendedor: () => void;
  onMostrarAtalhos: () => void;
}

export const usePdvShortcuts = (actions: ShortcutActions, dependencies: any[]) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { ctrlKey, key } = e;

      if (ctrlKey) {
        switch (key.toLowerCase()) {
          case 'enter':
            e.preventDefault();
            actions.onAbrirCaixa();
            actions.onContinuar();
            break;
          case 'delete':
            e.preventDefault();
            actions.onCancelarVenda();
            break;
          case 'b':
            e.preventDefault();
            console.log('Busca avançada...');
            break;
          case 'k':
            e.preventDefault();
            console.log('Usar item não cadastrado...');
            break;
          case 'q':
            e.preventDefault();
            actions.onFocusCliente();
            break;
          case '?':
            e.preventDefault();
            actions.onMostrarAtalhos();
            break;
          case 'y':
            e.preventDefault();
            console.log('Detalhes do caixa...');
            break;
        }
      } else {
        switch (key) {
          case 'Escape':
            actions.onCancelarModal();
            actions.onCancelarVenda();
            break;
          case 'F8':
            e.preventDefault();
            actions.onFocusCliente();
            break;
          case 'F9':
            e.preventDefault();
            actions.onFocusVendedor();
            break;
          case 'F10':
            e.preventDefault();
            actions.onSalvarParaDepois();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, dependencies);
};
