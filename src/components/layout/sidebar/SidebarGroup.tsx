import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../../config/menuConfig';
import { SidebarItem } from './SidebarItem';

interface SidebarGroupProps {
  item: MenuItemType;
  isExpanded: boolean;
  onToggle: () => void;
  activePath: string;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({ item, isExpanded, onToggle, activePath }) => {
  const isParentActive = item.children?.some(child => child.path === activePath);

  return (
    <div className="px-3">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors duration-200 select-none
          ${(isParentActive && !isExpanded) ? 'bg-blue-200/[.85] text-blue-700 font-semibold' : 'text-gray-700 hover:bg-white/20'}`}
      >
        {item.icon && <item.icon size={20} className="flex-shrink-0" />}
        <span className="flex-1 text-left">{item.label}</span>
        <motion.div animate={{ rotate: isExpanded ? 0 : -90 }}><ChevronDown size={18} /></motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pl-7 pt-2 flex flex-col gap-1"
          >
            {item.children?.map(child => (
              <SidebarItem key={child.id} item={child} activePath={activePath} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
