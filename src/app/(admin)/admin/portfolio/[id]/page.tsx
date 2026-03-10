'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { FormField } from '@/components/admin/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { portfolioApi } from '@/lib/admin/api';
import { useAuth } from '@/lib/admin/auth-context';
import toast from 'react-hot-toast';

const categories = [
  { value: 'ghostwriting', label: 'Ghostwriting' },
  { value: 'editing', label: 'Editing' },
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'content-strategy', label: 'Content Strategy' },
  { value: 'book-writing', label: 'Book Writing' },
  { value: 'blog-writing', label: 'Blog Writing' },
];

export default function EditPortfolioPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '', description: '', category: '', thumbnail: '',
    contentPreview: '', pdfUrl: '', featured: false, published: false,
  });

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (isLoading) return;
    portfolioApi.getOne(id).then((data) => {
      setForm({
        title: data.title || '', description: data.description || '',
        category: data.category || '', thumbnail: data.thumbnail || '',
        contentPreview: data.contentPreview || '', pdfUrl: data.pdfUrl || '',
        featured: data.featured || false, published: data.published || false,
      });
    }).catch(() => toast.error('Failed to load')).finally(() => setLoading(false));
  }, [id, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await portfolioApi.update(id, form);
      toast.success('Portfolio item updated');
      router.push('/admin/portfolio');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading...</div>;

  return (
    <>
      <AdminHeader title="Edit Portfolio Item" />
      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <FormField label="Title" value={form.title} onChange={(e) => update('title', (e.target as HTMLInputElement).value)} required />
          <FormField label="Description" type="textarea" value={form.description} onChange={(e) => update('description', (e.target as HTMLTextAreaElement).value)} required />
          <FormField label="Category" type="select" options={categories} value={form.category} onChange={(e) => update('category', (e.target as HTMLSelectElement).value)} required />
          <ImageUpload label="Thumbnail" value={form.thumbnail} onChange={(url) => update('thumbnail', url)} />
          <FormField label="Content Preview" type="textarea" value={form.contentPreview} onChange={(e) => update('contentPreview', (e.target as HTMLTextAreaElement).value)} />
          <FormField label="PDF URL" value={form.pdfUrl} onChange={(e) => update('pdfUrl', (e.target as HTMLInputElement).value)} placeholder="Upload PDF or paste URL" />
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
