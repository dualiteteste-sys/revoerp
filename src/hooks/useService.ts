import { useContext } from 'react';
import { ServiceContext, ServiceContainer } from '../contexts/ServiceContext';

export const useService = <K extends keyof ServiceContainer>(serviceName: K): ServiceContainer[K] => {
  const services = useContext(ServiceContext);
  if (!services[serviceName]) {
    throw new Error(`Serviço "${serviceName}" não encontrado no ServiceProvider.`);
  }
  return services[serviceName];
};
