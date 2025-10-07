import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../contexts/SidebarContext';
import { SidebarContent } from './sidebar/SidebarContent';

export const Sidebar: React.FC = () => {
    const { isMobileMenuOpen, toggleMobileMenu, isCollapsed } = useSidebar();
  
    return (
      <>
        <aside className={`hidden lg:block fixed top-4 left-4 h-[calc(100vh-2rem)] z-30 transition-all duration-300 ${isCollapsed ? 'w-28' : 'w-80'}`}>
          <SidebarContent />
        </aside>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                onClick={toggleMobileMenu}
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-80 z-50 lg:hidden"
              >
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  };
