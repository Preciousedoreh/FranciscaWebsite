'use client';

import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { testimonialsApi } from '@/lib/admin/api';
import { Testimonial } from '@/lib/admin/types';
import { useAuth } from '@/lib/admin/auth-context';
import { getTestimonialStatus } from '@/lib/testimonials/status';
import { FiTrash2 } from 'react-icons/fi';
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

  const updateStatus = async (
    item: Testimonial,
    status: 'published' | 'declined'
  ) => {
    setActingId(item._id);

    try {
      const updated = await testimonialsApi.update(item._id, {
        status,
        published: status === 'published',
      });
      setItems((current) =>
        current.map((existing) => (existing._id === item._id ? updated : existing))
      );
      toast.success(status === 'published' ? 'Testimonial accepted' : 'Testimonial declined');
    } catch {
      toast.error('Failed to update testimonial');
    } finally {
      setActingId(null);
    }
  };

  const handleDelete = async (item: Testimonial) => {
    setActingId(item._id);

    try {
      await testimonialsApi.delete(item._id);
      setItems((current) => current.filter((existing) => existing._id !== item._id));
      toast.success('Testimonial deleted');
    } catch {
      toast.error('Failed to delete testimonial');
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
                  const status = getTestimonialStatus(item);
                  const isPending = status === 'pending';
                  const isPublished = status === 'published';

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
                            isPublished
                              ? 'bg-green-100 text-green-700'
                              : status === 'declined'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {status === 'published'
                            ? 'Published'
                            : status === 'declined'
                              ? 'Declined'
                              : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2 pt-1">
                          {isPending ? (
                            <>
                              <button
                                type="button"
                                onClick={() => updateStatus(item, 'published')}
                                disabled={isActing}
                                className="rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                Accept
                              </button>
                              <button
                                type="button"
                                onClick={() => updateStatus(item, 'declined')}
                                disabled={isActing}
                                className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                Decline
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              disabled={isActing}
                              className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                              aria-label={`Delete testimonial from ${item.clientName}`}
                            >
                              <FiTrash2 size={16} />
                            </button>
                          )}
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
