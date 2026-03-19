'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { FormField } from '@/components/admin/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { testimonialsApi } from '@/lib/admin/api';
import { useAuth } from '@/lib/admin/auth-context';
import toast from 'react-hot-toast';

const ratingOptions = [
  { value: '1', label: '1 Star' },
  { value: '2', label: '2 Stars' },
  { value: '3', label: '3 Stars' },
  { value: '4', label: '4 Stars' },
  { value: '5', label: '5 Stars' },
];

export default function EditTestimonialPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    clientName: '', clientTitle: '', clientCompany: '', clientImage: '', quote: '',
    rating: 5, featured: false, published: false,
  });

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (isLoading) return;
    testimonialsApi.getOne(id).then((data) => {
      setForm({
        clientName: data.clientName || '', clientTitle: data.clientTitle || '',
        clientCompany: data.clientCompany || '',
        clientImage: data.clientImage || '', quote: data.quote || '',
        rating: data.rating || 5, featured: data.featured || false, published: data.published || false,
      });
    }).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  }, [id, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await testimonialsApi.update(id, form);
      toast.success('Testimonial updated');
      router.push('/admin/testimonials');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading...</div>;

  return (
    <>
      <AdminHeader title="Edit Testimonial" />
      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <FormField label="Client Name" value={form.clientName} onChange={(e) => update('clientName', (e.target as HTMLInputElement).value)} required />
          <FormField label="Client Title" value={form.clientTitle} onChange={(e) => update('clientTitle', (e.target as HTMLInputElement).value)} />
          <FormField label="Client Company" value={form.clientCompany} onChange={(e) => update('clientCompany', (e.target as HTMLInputElement).value)} />
          <ImageUpload label="Client Image" value={form.clientImage} onChange={(url) => update('clientImage', url)} />
          <FormField label="Quote" type="textarea" value={form.quote} onChange={(e) => update('quote', (e.target as HTMLTextAreaElement).value)} required />
          <FormField label="Rating" type="select" options={ratingOptions} value={String(form.rating)} onChange={(e) => update('rating', Number((e.target as HTMLSelectElement).value))} />
          <div className="flex gap-6">
            <PublishToggle label="Featured" checked={form.featured} onChange={(v) => update('featured', v)} />
            <PublishToggle checked={form.published} onChange={(v) => update('published', v)} />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#FFD11A] text-[#1B2A4A] font-semibold rounded-lg hover:bg-[#e6bc00] transition disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => router.back()} className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
