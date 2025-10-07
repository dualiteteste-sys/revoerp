import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../../contexts/SidebarContext';
import { menuItems, MenuItem as MenuItemType } from '../../../config/menuConfig';
import { Logo } from '../../ui/Logo';
import { useAccordionMenu } from '../../../hooks/useAccordionMenu';
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';

const CollapsedTooltip: React.FC<{ label: string }> = ({ label }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.2, delay: 0.3 }}
    className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-md shadow-lg whitespace-nowrap z-30 pointer-events-none"
  >
    {label}
  </motion.div>
);

const FloatingSubmenu: React.FC<{ item: MenuItemType; onClose: () => void }> = ({ item, onClose }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
    className="absolute left-full top-1/2 -translate-y-1/2 ml-4 z-20"
  >
    <div className="bg-glass-100/80 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-2 w-60">
      <h4 className="font-bold text-gray-800 px-3 pt-2 pb-1">{item.label}</h4>
      <ul className="space-y-1">
        {item.children?.map(child => (
          <li key={child.id}>
            <Link to={child.path || '#'} onClick={onClose} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-100/80 transition-colors">
              <child.icon size={16} />
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export const SidebarContent: React.FC = () => {
    const { isCollapsed, toggleCollapse, closeMobileMenu, userPrefersCollapsed } = useSidebar();
    const location = useLocation();
    const { activeGroupId, toggleGroup, setActiveGroupId } = useAccordionMenu();
    
    const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const parent = menuItems.find(item => item.children?.some(child => location.pathname.startsWith(child.path || '---')));
      if (parent) {
        setActiveGroupId(parent.id);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, setActiveGroupId]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveSubmenuId(null);
            }
        };
        if (activeSubmenuId) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeSubmenuId]);

    const handleCollapsedItemClick = (e: React.MouseEvent, item: MenuItemType) => {
        if (item.children?.length) {
            e.preventDefault();
            setActiveSubmenuId(prev => (prev === item.id ? null : item.id));
            setHoveredItemId(null);
        } else {
            setActiveSubmenuId(null);
            closeMobileMenu();
        }
    };

    const renderExpandedView = () => (
      <nav className="flex-1 py-4 space-y-2 overflow-y-auto">
        {menuItems.map(item =>
          item.isDivider ? (
            <div key={item.id} className="px-3 py-2"><div className="border-t border-white/20"></div></div>
          ) : item.children ? (
            <SidebarGroup
              key={item.id}
              item={item}
              isExpanded={activeGroupId === item.id}
              onToggle={() => toggleGroup(item.id)}
              activePath={location.pathname}
            />
          ) : (
            <div key={item.id} className="px-3">
              <SidebarItem item={item} activePath={location.pathname} />
            </div>
          )
        )}
      </nav>
    );

    const renderCollapsedView = () => (
      <nav className="flex-1 py-6 space-y-4" onMouseLeave={() => setHoveredItemId(null)}>
        {menuItems.map(item =>
          !item.isDivider && (
            <div 
                key={item.id} 
                className="relative flex justify-center"
                onMouseEnter={() => setHoveredItemId(item.id)}
            >
              <Link to={item.path || '#'} onClick={(e) => handleCollapsedItemClick(e, item)}>
                <motion.div
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg bg-gradient-to-br transition-all duration-200 
                    ${item.gradient} 
                    ${activeSubmenuId === item.id ? 'ring-4 ring-offset-2 ring-blue-500/50 ring-offset-glass-200' : ''}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <item.icon size={24} />
                </motion.div>
              </Link>
              <AnimatePresence>
                {hoveredItemId === item.id && !activeSubmenuId && <CollapsedTooltip label={item.label} />}
                {activeSubmenuId === item.id && item.children && <FloatingSubmenu item={item} onClose={() => { setActiveSubmenuId(null); closeMobileMenu(); }} />}
              </AnimatePresence>
            </div>
          )
        )}
      </nav>
    );
  
    return (
      <div ref={menuRef} className="h-full flex flex-col bg-glass-200 backdrop-blur-xl border border-white/30 rounded-3xl shadow-glass-lg">
        {!isCollapsed && <Logo />}
        
        {isCollapsed ? renderCollapsedView() : renderExpandedView()}
  
        <div className="p-6 mt-auto border-t border-white/20">
          <label htmlFor="collapse-switch" className="flex items-center justify-between cursor-pointer">
            {!isCollapsed && <span className="text-gray-700 font-medium">{userPrefersCollapsed ? 'Expandir' : 'Recolher'}</span>}
            <div className="form-switch">
              <input id="collapse-switch" type="checkbox" className="form-switch-checkbox" checked={!userPrefersCollapsed} onChange={toggleCollapse} />
              <div className="form-switch-label"></div>
              <span className="form-switch-knob"></span>
            </div>
          </label>
        </div>
      </div>
    );
  };
