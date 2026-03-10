'use client';

import Link from 'next/link';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { _id: string }> {
  columns: Column<T>[];
  data: T[];
  editPath: string;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export function DataTable<T extends { _id: string }>({
  columns,
  data,
  editPath,
  onDelete,
  loading,
}: DataTableProps<T>) {
  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center py-12 text-gray-500">No items found. Create your first one!</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th key={String(col.key)} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {col.label}
              </th>
            ))}
            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-700">
                  {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key as string] ?? '')}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`${editPath}/${item._id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <FiEdit2 size={16} />
                  </Link>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
