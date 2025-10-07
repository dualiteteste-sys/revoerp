import React, { ReactNode } from 'react';
import { SidebarProvider } from './SidebarContext';
import { PdvProvider } from './PdvContext';
import { ConfiguracoesProvider } from './ConfiguracoesContext';
import { ServiceProvider } from './ServiceContext';
import { ProfileProvider } from './ProfileContext';

const providers = [
  ProfileProvider,
  ServiceProvider,
  ConfiguracoesProvider,
  SidebarProvider,
  PdvProvider,
];

export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, <>{children}</>);
};
