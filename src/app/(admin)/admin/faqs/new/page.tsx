'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function NewFAQPage() {
  const router = useRouter();
  const { isLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    question: '', answer: '', category: '', order: 0, published: false,
  });

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await faqsApi.create(form);
      toast.success('FAQ created');
      router.push('/admin/faqs');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <AdminHeader title="New FAQ" />
      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <FormField label="Question" value={form.question} onChange={(e) => update('question', (e.target as HTMLInputElement).value)} required />
          <FormField label="Answer" type="textarea" value={form.answer} onChange={(e) => update('answer', (e.target as HTMLTextAreaElement).value)} required />
          <FormField label="Category" type="select" options={categoryOptions} value={form.category} onChange={(e) => update('category', (e.target as HTMLSelectElement).value)} required />
          <FormField label="Order" value={String(form.order)} onChange={(e) => update('order', Number((e.target as HTMLInputElement).value))} />
          <PublishToggle checked={form.published} onChange={(v) => update('published', v)} />
          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-[#FFD11A] text-[#1B2A4A] font-semibold rounded-lg hover:bg-[#e6bc00] transition disabled:opacity-50">
              {saving ? 'Creating...' : 'Create'}
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
