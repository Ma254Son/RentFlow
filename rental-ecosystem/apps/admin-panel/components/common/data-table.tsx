'use client';

import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  onRowClick?: (item: T) => void;
  striped?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

export function DataTable<T extends { id: string }>({
  columns,
  data,
  actions,
  emptyState,
  onRowClick,
  striped = true,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  let sortedData = [...data];
  if (sortKey && sortDirection) {
    sortedData.sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-12 text-center">
        {emptyState || (
          <>
            <p className="text-muted-foreground">No data available</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full">
        <thead className="border-b border-border bg-muted/30">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={cn('px-6 py-3 text-left text-xs font-semibold text-foreground', column.width)}
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(String(column.key))}
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    {column.label}
                    {sortKey === column.key ? (
                      sortDirection === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-right text-xs font-semibold text-foreground">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedData.map((item, idx) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={cn(
                'transition-colors hover:bg-muted/50',
                striped && idx % 2 === 1 && 'bg-muted/20',
                onRowClick && 'cursor-pointer'
              )}
            >
              {columns.map((column) => (
                <td key={String(column.key)} className={cn('px-6 py-4 text-sm text-foreground', column.width)}>
                  {column.render ? column.render((item as any)[String(column.key)], item) : String((item as any)[String(column.key)])}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-right">
                  <div onClick={(e) => e.stopPropagation()}>{actions(item)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
