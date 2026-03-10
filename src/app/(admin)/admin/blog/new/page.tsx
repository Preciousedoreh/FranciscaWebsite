'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { FormField } from '@/components/admin/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { TagInput } from '@/components/admin/TagInput';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { blogApi } from '@/lib/admin/api';
import { useAuth } from '@/lib/admin/auth-context';
import toast from 'react-hot-toast';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { isLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', coverImage: '',
    author: 'Ifeyinwa Francisca Ubah', tags: [] as string[], published: false,
  });

  const update = (field: string, value: unknown) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await blogApi.create(form);
      toast.success('Blog post created');
      router.push('/admin/blog');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return null;

  return (
    <>
      <AdminHeader title="New Blog Post" />
      <div className="p-6 max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <FormField label="Title" value={form.title} onChange={(e) => update('title', (e.target as HTMLInputElement).value)} required />
          <FormField label="Excerpt" type="textarea" value={form.excerpt} onChange={(e) => update('excerpt', (e.target as HTMLTextAreaElement).value)} required />
          <FormField label="Content" type="textarea" value={form.content} onChange={(e) => update('content', (e.target as HTMLTextAreaElement).value)} required />
          <ImageUpload label="Cover Image" value={form.coverImage} onChange={(url) => update('coverImage', url)} />
          <FormField label="Author" value={form.author} onChange={(e) => update('author', (e.target as HTMLInputElement).value)} />
          <TagInput label="Tags" value={form.tags} onChange={(tags) => update('tags', tags)} />
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
