'use client';

import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { testimonialsApi } from '@/lib/admin/api';
import { Testimonial } from '@/lib/admin/types';
import { useAuth } from '@/lib/admin/auth-context';
import toast from 'react-hot-toast';

export default function TestimonialsListPage() {
  const { isLoading } = useAuth();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actingId, setActingId] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setItems(await testimonialsApi.getAll());
    } catch {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchItems();
    }
  }, [isLoading]);

  const updateStatus = async (item: Testimonial, published: boolean) => {
    setActingId(item._id);

    try {
      const updated = await testimonialsApi.update(item._id, { published });
      setItems((current) =>
        current.map((existing) => (existing._id === item._id ? updated : existing))
      );
      toast.success(published ? 'Testimonial accepted' : 'Testimonial declined');
    } catch {
      toast.error('Failed to update testimonial');
    } finally {
      setActingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setActingId(deleteId);

    try {
      await testimonialsApi.delete(deleteId);
      setItems((current) => current.filter((item) => item._id !== deleteId));
      toast.success('Testimonial deleted');
    } catch {
      toast.error('Failed to delete testimonial');
    } finally {
      setActingId(null);
      setDeleteId(null);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <AdminHeader title="Testimonials" />
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {items.length} testimonials awaiting moderation or already published
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center text-gray-500">No testimonials found.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const isActing = actingId === item._id;

                  return (
                    <tr key={item._id} className="border-b border-gray-100 align-top hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <p className="font-medium text-gray-900">{item.clientName}</p>
                        {(item.clientTitle || item.clientCompany) && (
                          <p className="text-xs text-gray-500">
                            {[item.clientTitle, item.clientCompany].filter(Boolean).join(', ')}
                          </p>
                        )}
                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
                          {item.quote}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">{item.rating}/5</td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs ${
                            item.published
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {item.published ? 'Published' : 'Unpublished'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          {item.published ? (
                            <button
                              type="button"
                              onClick={() => updateStatus(item, false)}
                              disabled={isActing}
                              className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Decline
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => updateStatus(item, true)}
                              disabled={isActing}
                              className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Accept
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => setDeleteId(item._id)}
                            disabled={isActing}
                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <DeleteConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="this testimonial"
      />
    </>
  );
}
