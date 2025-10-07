import { useLocalStorage } from './useLocalStorage';
import { useCallback } from 'react';

export const useAccordionMenu = (initialActiveId: string | null = null) => {
  const [activeGroupId, setActiveGroupId] = useLocalStorage<string | null>('accordion-active-group', initialActiveId);

  const toggleGroup = useCallback((groupId: string) => {
    setActiveGroupId(prevId => (prevId === groupId ? null : groupId));
  }, [setActiveGroupId]);

  return {
    activeGroupId,
    toggleGroup,
    setActiveGroupId,
  };
};
