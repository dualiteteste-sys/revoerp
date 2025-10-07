import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSidebar } from '../../../contexts/SidebarContext';
import { MenuItem as MenuItemType } from '../../../config/menuConfig';

interface SidebarItemProps {
  item: MenuItemType;
  activePath: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, activePath }) => {
  const { closeMobileMenu } = useSidebar();

  if (!item.path) return null;

  return (
    <NavLink
      to={item.path}
      onClick={closeMobileMenu}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
        activePath === item.path ? 'bg-blue-600 text-white font-medium' : 'text-gray-600 hover:bg-blue-500/20'
      }`}
    >
      {item.icon && <item.icon size={18} className="flex-shrink-0" />}
      <span>{item.label}</span>
    </NavLink>
  );
};
