import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SidebarContextType {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  activeSubmenuId: string | null;
  setActiveSubmenuId: (id: string | null) => void;
  hoveredItemId: string | null;
  setHoveredItemId: (id: string | null) => void;
  isSettingsPage: boolean;
  setIsSettingsPage: (isSettings: boolean) => void;
  userPrefersCollapsed: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userPrefersCollapsed, setUserPrefersCollapsed] = useLocalStorage('sidebar-collapsed', false);
  const [isSettingsPage, setIsSettingsPage] = useState(false);
  
  const isCollapsed = userPrefersCollapsed || isSettingsPage;

  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  
  const toggleCollapse = () => {
    setUserPrefersCollapsed(prev => !prev);
    setActiveSubmenuId(null);
    setHoveredItemId(null);
  };

  return (
    <SidebarContext.Provider value={{ 
      isMobileMenuOpen, 
      toggleMobileMenu, 
      closeMobileMenu, 
      isCollapsed, 
      toggleCollapse,
      activeSubmenuId,
      setActiveSubmenuId,
      hoveredItemId,
      setHoveredItemId,
      isSettingsPage,
      setIsSettingsPage,
      userPrefersCollapsed
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
