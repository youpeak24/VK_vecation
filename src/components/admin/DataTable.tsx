import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Filter } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  title?: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T | ((row: T) => string);
  actions?: React.ReactNode;
  rowsPerPage?: number;
}

export function DataTable<T extends { id?: string | number }>({
  title,
  description,
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  actions,
  rowsPerPage = 10
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Filtered Data based on Search Term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((item) => {
      if (typeof searchKey === 'function') {
        return searchKey(item).toLowerCase().includes(term);
      }
      if (typeof searchKey === 'string') {
        const val = item[searchKey];
        return String(val || '').toLowerCase().includes(term);
      }
      // Default: inspect all string/number fields of item
      return Object.values(item).some(val => 
        String(val || '').toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchKey]);

  // Sorted Data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;

    return [...filteredData].sort((a: any, b: any) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginated Slices
  const totalPages = Math.ceil(sortedData.length / rowsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleSort = (colKey: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortColumn === colKey) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else setSortColumn(null);
    } else {
      setSortColumn(colKey);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          {title && (
            <h3 className="font-heading font-bold text-lg text-[#071B35]">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative min-w-[240px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0866D9]/20 focus:border-[#0866D9] transition-all"
            />
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-heading font-bold uppercase tracking-wider text-slate-600">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key, col.sortable)}
                  className={`py-3.5 px-4 ${col.sortable ? 'cursor-pointer hover:bg-slate-100/70 select-none' : ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <ArrowUpDown size={12} className={sortColumn === col.key ? 'text-[#0866D9]' : 'text-slate-400'} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-10 text-slate-400 text-xs">
                  No records found matching your query.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => (
                <tr key={row.id || rIdx} className="hover:bg-slate-50/60 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3.5 px-4 align-middle">
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">{sortedData.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}</span> to{' '}
          <span className="font-semibold text-slate-700">
            {Math.min(currentPage * rowsPerPage, sortedData.length)}
          </span>{' '}
          of <span className="font-semibold text-slate-700">{sortedData.length}</span> records
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="px-2 text-xs font-semibold text-slate-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
