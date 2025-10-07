import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassButton } from './GlassButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <GlassButton
        icon={ChevronLeft}
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <span className="text-sm font-medium text-gray-700 px-2">
        Página {currentPage} de {totalPages}
      </span>
      <GlassButton
        icon={ChevronRight}
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
