'use client';

import { useAuth } from '@/lib/admin/auth-context';
import { FiLogOut } from 'react-icons/fi';

export function AdminHeader({ title }: { title: string }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.name || user?.email}</span>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
