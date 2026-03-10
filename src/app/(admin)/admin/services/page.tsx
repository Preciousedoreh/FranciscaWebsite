'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable, Column } from '@/components/admin/DataTable';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { servicesApi } from '@/lib/admin/api';
import { Service } from '@/lib/admin/types';
import { useAuth } from '@/lib/admin/auth-context';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const columns: Column<Service>[] = [
  { key: 'title', label: 'Title' },
  { key: 'order', label: 'Order' },
  { key: 'published', label: 'Status', render: (item) => (
    <span className={`px-2 py-1 rounded-full text-xs ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
      {item.published ? 'Published' : 'Draft'}
    </span>
  )},
];

export default function ServicesListPage() {
  const { isLoading } = useAuth();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchItems = async () => {
    try { setItems(await servicesApi.getAll()); } catch { /* empty */ } finally { setLoading(false); }
  };

  useEffect(() => { if (!isLoading) fetchItems(); }, [isLoading]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await servicesApi.delete(deleteId);
      setItems(items.filter((i) => i._id !== deleteId));
      toast.success('Service deleted');
    } catch { toast.error('Failed to delete'); }
    setDeleteId(null);
  };

  if (isLoading) return null;

  return (
    <>
      <AdminHeader title="Services" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500">{items.length} services</p>
          <Link href="/admin/services/new" className="flex items-center gap-2 px-4 py-2 bg-[#FFD11A] text-[#1B2A4A] rounded-lg font-medium text-sm hover:bg-[#e6bc00] transition">
            <FiPlus size={16} /> New Service
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm">
          <DataTable columns={columns} data={items} editPath="/admin/services" onDelete={setDeleteId} loading={loading} />
        </div>
      </div>
      <DeleteConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="this service" />
    </>
  );
}
