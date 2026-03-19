'use client';

import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { testimonialsApi } from '@/lib/admin/api';
import { Testimonial } from '@/lib/admin/types';
import { useAuth } from '@/lib/admin/auth-context';
import toast from 'react-hot-toast';

export default function TestimonialsListPage() {
  const { isLoading } = useAuth();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
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
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            item.published
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {item.published ? 'Published' : 'Unpublished'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => updateStatus(item, true)}
                            disabled={isActing || item.published}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                              item.published
                                ? 'bg-green-100 text-green-700'
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(item, false)}
                            disabled={isActing || !item.published}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
                              item.published
                                ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            Decline
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
    </>
  );
}
