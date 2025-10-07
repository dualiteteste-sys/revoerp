import React, { useMemo } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { GlassCard } from '../components/ui/GlassCard';
import { settingsMenuItems } from '../config/settingsMenuConfig';

const SettingsLayout: React.FC = () => {
  const location = useLocation();

  const { activeGroup, pageTitle } = useMemo(() => {
    const pathParts = location.pathname.split('/');
    const groupSlug = pathParts[2];
    const pageSlug = pathParts[3];
    
    const group = settingsMenuItems.find(g => g.id === groupSlug);
    let title = 'Configurações';
    if (group) {
        const child = group.children.find(c => c.path.split('/')[3] === pageSlug);
        if (child) {
            title = child.label;
        } else {
            // Check nested children
            for (const sub of group.children) {
                const nestedChild = sub.children?.find(nc => nc.path.split('/')[3] === pageSlug);
                if (nestedChild) {
                    title = nestedChild.label;
                    break;
                }
            }
        }
    }

    return { activeGroup: group, pageTitle: title };
  }, [location.pathname]);

  return (
    <div>
      <Header title="Configurações" subtitle={pageTitle} />
      
      <div className="flex overflow-x-auto -mx-8 px-8 pb-4 mb-6">
        <div className="flex items-center gap-2 border-b-2 border-transparent">
          {settingsMenuItems.map(group => (
            <NavLink
              key={group.id}
              to={group.children[0].children ? group.children[0].children[0].path : group.children[0].path}
              className={({ isActive }) => 
                `flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors duration-200 border-b-2
                ${activeGroup?.id === group.id ? 'border-blue-600 text-blue-700 font-medium' : 'border-transparent text-gray-600 hover:text-blue-600'}`
              }
            >
              <group.icon size={18} />
              <span>{group.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-3">
          <GlassCard className="p-4 space-y-1 sticky top-24">
            {activeGroup?.children.map(child => {
              if (child.children) {
                return (
                  <div key={child.id}>
                    <h4 className="px-3 pt-3 pb-1 text-xs font-bold uppercase text-gray-400">{child.label}</h4>
                    {child.children.map(subChild => (
                      <NavLink
                        key={subChild.id}
                        to={subChild.path}
                        className={({ isActive }) => `block px-3 py-2 text-sm rounded-lg ${isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-white/50 text-gray-700'}`}
                      >
                        {subChild.label}
                      </NavLink>
                    ))}
                  </div>
                );
              }
              return (
                <NavLink
                  key={child.id}
                  to={child.path}
                  className={({ isActive }) => `block px-3 py-2 text-sm rounded-lg ${isActive ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-white/50 text-gray-700'}`}
                >
                  {child.label}
                </NavLink>
              );
            })}
          </GlassCard>
        </aside>
        
        <main className="col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
