'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/lib/admin/auth-context';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <AuthProvider>
        <Toaster position="top-right" />
        {children}
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="lg:ml-64">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
