import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  actions?: (item: T) => React.ReactNode;
  loading: boolean;
  error: string | null;
  entityName: string;
}

export const DataTable = <T extends { id: string }>({
  data,
  columns,
  actions,
  loading,
  error,
  entityName,
}: DataTableProps<T>) => {
  if (loading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
        <Loader2 className="animate-spin text-blue-500" size={40} />
        <p className="text-gray-600 font-medium">Carregando {entityName.toLowerCase()}s...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p className="font-semibold">Ocorreu um erro.</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Nenhum(a) {entityName.toLowerCase()} encontrado(a).</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            {columns.map((col) => (
              <th key={String(col.accessorKey)} className={`text-left py-4 px-2 font-medium text-gray-700 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
            {actions && <th className="text-left py-4 px-2 font-medium text-gray-700">Ações</th>}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {data.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/10 hover:bg-glass-50 hover:backdrop-blur-sm transition-all duration-200"
              >
                {columns.map((col) => (
                  <td key={`${item.id}-${String(col.accessorKey)}`} className={`py-4 px-2 text-gray-700 ${col.className || ''}`}>
                    {col.cell ? col.cell(item) : (item[col.accessorKey] as React.ReactNode) || 'N/A'}
                  </td>
                ))}
                {actions && (
                  <td className="py-4 px-2">
                    {actions(item)}
                  </td>
                )}
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};
