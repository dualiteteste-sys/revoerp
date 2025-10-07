import React, { useState, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { settingsMenuItems, SettingsMenuItem } from '../../config/settingsMenuConfig';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { GlassInput } from '../ui/GlassInput';

const SubMenu: React.FC<{ items: SettingsMenuItem['children']; activePath: string }> = ({ items, activePath }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="pl-6 pt-1 flex flex-col"
    >
      {items.map(child => (
        <NavLink
          key={child.id}
          to={child.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-white/30'
            }`
          }
          end
        >
          <span>{child.label}</span>
        </NavLink>
      ))}
    </motion.div>
  );
};

const MenuItem: React.FC<{ item: SettingsMenuItem; activePath: string; expandedGroups: Set<string>; onToggle: (id: string) => void; }> = ({ item, activePath, expandedGroups, onToggle }) => {
  const isExpanded = expandedGroups.has(item.id);
  const isParentActive = item.children.some(child => activePath.startsWith(child.path.split('/').slice(0, 4).join('/')));

  const hasSubSubMenus = item.children.some(c => c.children);

  if (hasSubSubMenus) {
    return (
      <div>
        {item.children.map(subItem => {
          if (subItem.children) {
            const isSubExpanded = expandedGroups.has(subItem.id);
            const isSubParentActive = subItem.children.some(child => activePath.startsWith(child.path));
            return (
              <div key={subItem.id}>
                <button
                  onClick={() => onToggle(subItem.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200 select-none text-left
                    ${isSubParentActive && !isSubExpanded ? 'bg-blue-200/[.6] text-blue-700 font-semibold' : 'text-gray-700 hover:bg-white/20'}`}
                >
                  <span className="flex-1 text-sm font-medium">{subItem.label}</span>
                  <motion.div animate={{ rotate: isSubExpanded ? 0 : -90 }}><ChevronDown size={18} /></motion.div>
                </button>
                <AnimatePresence>
                  {isSubExpanded && <SubMenu items={subItem.children} activePath={activePath} />}
                </AnimatePresence>
              </div>
            );
          }
          return (
            <NavLink
              key={subItem.id}
              to={subItem.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200 select-none ${
                  isActive ? 'bg-blue-200/[.85] text-blue-700 font-semibold' : 'text-gray-700 hover:bg-white/20'
                }`
              }
              end
            >
              <span className="flex-1">{subItem.label}</span>
            </NavLink>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => onToggle(item.id)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200 select-none text-left
          ${isParentActive && !isExpanded ? 'bg-blue-200/[.6] text-blue-700 font-semibold' : 'text-gray-700 hover:bg-white/20'}`}
      >
        <item.icon size={20} className="flex-shrink-0" />
        <span className="flex-1 font-semibold">{item.label}</span>
        <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}><ChevronDown size={18} /></motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && <SubMenu items={item.children} activePath={activePath} />}
      </AnimatePresence>
    </div>
  );
};

export const SettingsSidebar: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGroups, setExpandedGroups] = useLocalStorage<string[]>('settings-expanded-groups', []);
  const expandedSet = new Set(expandedGroups);

  const toggleGroup = (id: string) => {
    const newSet = new Set(expandedSet);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedGroups(Array.from(newSet));
  };

  const filteredMenu = useMemo(() => {
    if (!searchTerm) return settingsMenuItems;
    const lowercasedFilter = searchTerm.toLowerCase();

    return settingsMenuItems
      .map(group => {
        const filteredChildren = group.children
          .map(subItem => {
            if (subItem.children) {
              const filteredSubChildren = subItem.children.filter(child =>
                child.label.toLowerCase().includes(lowercasedFilter)
              );
              return filteredSubChildren.length > 0 ? { ...subItem, children: filteredSubChildren } : null;
            }
            return subItem.label.toLowerCase().includes(lowercasedFilter) ? subItem : null;
          })
          .filter(Boolean) as SettingsMenuItem['children'];
        
        return filteredChildren.length > 0 ? { ...group, children: filteredChildren } : null;
      })
      .filter(Boolean) as SettingsMenuItem[];
  }, [searchTerm]);

  return (
    <aside className="h-full w-80 fixed top-0 left-0 bg-glass-100 backdrop-blur-xl border-r border-white/30 p-4 flex flex-col" role="navigation">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Configurações</h2>
      </div>
      <div className="px-4 mb-4">
        <GlassInput
          placeholder="Buscar configurações..."
          icon={<Search size={18} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <nav className="flex-1 overflow-y-auto space-y-2 px-4">
        {filteredMenu.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            activePath={location.pathname}
            expandedGroups={expandedSet}
            onToggle={toggleGroup}
          />
        ))}
      </nav>
    </aside>
  );
};
