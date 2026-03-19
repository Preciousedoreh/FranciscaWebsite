'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DataTable, Column } from '@/components/admin/DataTable';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { testimonialsApi } from '@/lib/admin/api';
import { Testimonial } from '@/lib/admin/types';
import { useAuth } from '@/lib/admin/auth-context';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const columns: Column<Testimonial>[] = [
  {
    key: 'clientName',
    label: 'Client',
    render: (item) => (
      <div>
        <p className="font-medium text-gray-900">{item.clientName}</p>
        {(item.clientTitle || item.clientCompany) && (
          <p className="text-xs text-gray-500">
            {[item.clientTitle, item.clientCompany].filter(Boolean).join(', ')}
          </p>
        )}
      </div>
    ),
  },
  { key: 'rating', label: 'Rating', render: (item) => `${item.rating}/5` },
  { key: 'featured', label: 'Featured', render: (item) => item.featured ? 'Yes' : 'No' },
  { key: 'published', label: 'Status', render: (item) => (
    <span className={`px-2 py-1 rounded-full text-xs ${item.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
      {item.published ? 'Published' : 'Pending Review'}
    </span>
  )},
];

export default function TestimonialsListPage() {
  const { isLoading } = useAuth();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setItems(await testimonialsApi.getAll());
    } catch {
      // Leave the table empty if the request fails.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchItems();
    }
  }, [isLoading]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await testimonialsApi.delete(deleteId);
      setItems(items.filter((item) => item._id !== deleteId));
      toast.success('Testimonial deleted');
    } catch {
      toast.error('Failed to delete');
    }

    setDeleteId(null);
  };

  if (isLoading) return null;

  return (
    <>
      <AdminHeader title="Testimonials" />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">{items.length} testimonials</p>
          <Link href="/admin/testimonials/new" className="flex items-center gap-2 rounded-lg bg-[#FFD11A] px-4 py-2 text-sm font-medium text-[#1B2A4A] transition hover:bg-[#e6bc00]">
            <FiPlus size={16} /> New Testimonial
          </Link>
        </div>
        <div className="rounded-xl bg-white shadow-sm">
          <DataTable columns={columns} data={items} editPath="/admin/testimonials" onDelete={setDeleteId} loading={loading} />
        </div>
      </div>
      <DeleteConfirmModal open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="this testimonial" />
    </>
  );
}
