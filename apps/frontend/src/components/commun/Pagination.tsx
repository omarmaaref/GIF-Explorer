// src/components/Pagination.tsx
import React from "react";

interface PaginationInterface {
  page: number;
  size: number;
  onPrev(): void;
  onNext(): void;
  onSizeChange(size: number): void;
}
const pageSizeOptions = ['6','12','24','32'];
export const Pagination: React.FC<PaginationInterface> = ({ page, size, onPrev, onNext, onSizeChange}) => (
<div className="flex justify-center items-center space-x-4">
  <button
    onClick={onPrev}
    disabled={page === 1}
    className="
      px-4 py-2 
      bg-blue-600 text-white rounded 
      hover:bg-blue-700 
      disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed
    "
  >
    Prev
  </button>

  <span className="text-gray-700 font-medium">
    Page {page}
  </span>

  <button
    onClick={onNext}
    className="
      px-4 py-2 
      bg-blue-600 text-white rounded 
      hover:bg-blue-700
    "
  >
    Next
  </button>
      <div className="flex items-center gap-2">
      <label htmlFor="pageSize" className="text-sm text-gray-700">
        Page size:
      </label>
      <select
        id="pageSize"
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
</div>

);
