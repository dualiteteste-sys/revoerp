import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { useSidebar } from '../contexts/SidebarContext';
import { useProfile } from '../contexts/ProfileContext';
import { PageLoader } from '../components/layout/PageLoader';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isCollapsed, setIsSettingsPage } = useSidebar();
  const { profileLoading } = useProfile(); 
  const location = useLocation();

  useEffect(() => {
    setIsSettingsPage(location.pathname.startsWith('/configuracoes'));
  }, [location.pathname, setIsSettingsPage]);

  if (profileLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Sidebar />
      <main className={`p-4 sm:p-6 lg:p-8 transition-all duration-300 ${isCollapsed ? 'lg:ml-28' : 'lg:ml-80'}`}>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
