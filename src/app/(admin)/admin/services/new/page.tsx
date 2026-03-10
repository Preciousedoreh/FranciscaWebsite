'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { FormField } from '@/components/admin/FormField';
import { TagInput } from '@/components/admin/TagInput';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { servicesApi } from '@/lib/admin/api';
import { useAuth } from '@/lib/admin/auth-context';
import toast from 'react-hot-toast';

export default function NewServicePage() {
  const router = useRouter();
  const { isLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', icon: '', features: [] as string[], order: 0, published: false,
  });

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await servicesApi.create(form);
      toast.success('Service created');
      router.push('/admin/services');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <AdminHeader title="New Service" />
      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <FormField label="Title" value={form.title} onChange={(e) => update('title', (e.target as HTMLInputElement).value)} required />
          <FormField label="Description" type="textarea" value={form.description} onChange={(e) => update('description', (e.target as HTMLTextAreaElement).value)} required />
          <FormField label="Icon (emoji or icon name)" value={form.icon} onChange={(e) => update('icon', (e.target as HTMLInputElement).value)} placeholder="e.g. pen, book, edit" />
          <TagInput label="Features" value={form.features} onChange={(tags) => update('features', tags)} />
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
