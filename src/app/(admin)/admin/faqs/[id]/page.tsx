'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { FormField } from '@/components/admin/FormField';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { faqsApi } from '@/lib/admin/api';
import { useAuth } from '@/lib/admin/auth-context';
import toast from 'react-hot-toast';

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'services', label: 'Services' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'process', label: 'Process' },
];

export default function EditFAQPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    question: '', answer: '', category: '', order: 0, published: false,
  });

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (isLoading) return;
    faqsApi.getOne(id).then((data) => {
      setForm({
        question: data.question || '', answer: data.answer || '',
        category: data.category || '', order: data.order || 0,
        published: data.published || false,
      });
    }).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  }, [id, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await faqsApi.update(id, form);
      toast.success('FAQ updated');
      router.push('/admin/faqs');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading...</div>;

  return (
    <>
      <AdminHeader title="Edit FAQ" />
      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <FormField label="Question" value={form.question} onChange={(e) => update('question', (e.target as HTMLInputElement).value)} required />
          <FormField label="Answer" type="textarea" value={form.answer} onChange={(e) => update('answer', (e.target as HTMLTextAreaElement).value)} required />
          <FormField label="Category" type="select" options={categoryOptions} value={form.category} onChange={(e) => update('category', (e.target as HTMLSelectElement).value)} required />
          <FormField label="Order" value={String(form.order)} onChange={(e) => update('order', Number((e.target as HTMLInputElement).value))} />
          <PublishToggle checked={form.published} onChange={(v) => update('published', v)} />
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
