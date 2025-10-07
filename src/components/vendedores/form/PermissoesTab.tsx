import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { VendedorFormData } from '../../../schemas/vendedorSchema';
import { permissionsConfig, PermissionItem } from '../../../config/permissionsConfig';
import { GlassButton } from '../../ui/GlassButton';

const PermissionCheckbox: React.FC<{
  id: string;
  label: string;
  helpText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ id, label, helpText, checked, onChange }) => (
  <div className="py-2">
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox mt-1"
      />
      <div>
        <span className="font-medium text-gray-800">{label}</span>
        <p className="text-xs text-gray-500">{helpText}</p>
      </div>
    </label>
  </div>
);

const PermissionGroup: React.FC<{
  label: string;
  items: PermissionItem[];
  control: Control<VendedorFormData>;
}> = ({ label, items, control }) => (
  <div className="bg-glass-50 p-4 rounded-xl border border-white/20">
    <h4 className="font-semibold text-gray-800 mb-2">{label}</h4>
    <div className="space-y-2">
      {items.map(item => (
        <Controller
          key={item.id}
          name="userPermissions"
          control={control}
          render={({ field }) => (
            <PermissionCheckbox
              id={item.id}
              label={item.label}
              helpText={item.helpText}
              checked={field.value.includes(item.id)}
              onChange={(checked) => {
                const newValue = checked
                  ? [...field.value, item.id]
                  : field.value.filter(p => p !== item.id);
                field.onChange(newValue);
              }}
            />
          )}
        />
      ))}
    </div>
  </div>
);

export const PermissoesTab: React.FC<{ control: Control<VendedorFormData> }> = ({ control }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-white/30 pb-2">Permissões do Usuário</h3>
      
      {permissionsConfig.map(tab => (
        <div key={tab.id} className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{tab.label}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tab.groups.map(group => (
              <PermissionGroup key={group.id} label={group.label} items={group.items} control={control} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
