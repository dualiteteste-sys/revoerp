import React from 'react';
import { PermissionGroup } from '../../../config/permissionsConfig';
import { GlassCard } from '../../ui/GlassCard';
import { GlassButton } from '../../ui/GlassButton';

interface PermissionCheckboxProps {
  id: string;
  label: string;
  helpText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const PermissionCheckbox: React.FC<PermissionCheckboxProps> = ({ id, label, helpText, checked, onChange }) => (
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
        <span className="font-medium text-gray-800 text-sm">{label}</span>
        <p className="text-xs text-gray-500">{helpText}</p>
      </div>
    </label>
  </div>
);

interface PermissionGroupCardProps {
  group: PermissionGroup;
  selectedPermissions: Set<string>;
  onPermissionChange: (permissionId: string, checked: boolean) => void;
  onSelectAll: (groupIds: string[], select: boolean) => void;
}

export const PermissionGroupCard: React.FC<PermissionGroupCardProps> = ({
  group,
  selectedPermissions,
  onPermissionChange,
  onSelectAll,
}) => {
  const groupPermissionIds = group.items.map(item => item.id);
  const areAllSelected = groupPermissionIds.every(id => selectedPermissions.has(id));

  return (
    <GlassCard className="!p-4 !bg-glass-50">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">{group.label}</h4>
        <GlassButton
          size="sm"
          variant="secondary"
          onClick={() => onSelectAll(groupPermissionIds, !areAllSelected)}
        >
          {areAllSelected ? 'Desmarcar' : 'Marcar'} todos
        </GlassButton>
      </div>
      <div className="space-y-1">
        {group.items.map(item => (
          <PermissionCheckbox
            key={item.id}
            id={item.id}
            label={item.label}
            helpText={item.helpText}
            checked={selectedPermissions.has(item.id)}
            onChange={(checked) => onPermissionChange(item.id, checked)}
          />
        ))}
      </div>
    </GlassCard>
  );
};
