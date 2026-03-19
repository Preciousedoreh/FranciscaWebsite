'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;

const initialForm = {
  name: '',
  title: '',
  company: '',
  quote: '',
};

export function TestimonialSubmissionForm() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setPhoto(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setPhoto(null);
      setError('Photo must be an image file.');
      event.target.value = '';
      return;
    }

    if (file.size > MAX_PHOTO_SIZE_BYTES) {
      setPhoto(null);
      setError('Photo must be 10 MB or smaller.');
      event.target.value = '';
      return;
    }

    setError('');
    setPhoto(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim() || !form.quote.trim()) {
      setError('Name and testimonial are required.');
      return;
    }

    if (photo && photo.size > MAX_PHOTO_SIZE_BYTES) {
      setError('Photo must be 10 MB or smaller.');
      return;
    }

    const payload = new FormData();
    payload.append('name', form.name.trim());
    payload.append('title', form.title.trim());
    payload.append('company', form.company.trim());
    payload.append('quote', form.quote.trim());

    if (photo) {
      payload.append('photo', photo);
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/testimonials/submit', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || 'Unable to submit testimonial.');
      }

      setForm(initialForm);
      setPhoto(null);
      setSuccess('Your testimonial has been submitted and is awaiting review.');
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to submit testimonial.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="share-your-experience"
      className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(13,27,62,0.08)] ring-1 ring-navy-100 md:p-10"
    >
      <div className="mb-8 max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold-500">
          Share Your Experience
        </p>
        <h3 className="mb-4 text-3xl font-heading font-bold text-navy-600">
          Submit a public testimonial
        </h3>
        <p className="text-base leading-relaxed text-charcoal">
          Approved testimonials are published after review in the admin dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="testimonial-name" className="mb-2 block text-sm font-medium text-charcoal">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="testimonial-name"
            type="text"
            value={form.name}
            onChange={(event) => update('name', event.target.value)}
            required
            className="w-full rounded-xl border border-medium-gray px-4 py-3 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="testimonial-title" className="mb-2 block text-sm font-medium text-charcoal">
            Title
          </label>
          <input
            id="testimonial-title"
            type="text"
            value={form.title}
            onChange={(event) => update('title', event.target.value)}
            className="w-full rounded-xl border border-medium-gray px-4 py-3 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
            placeholder="Founder, Author, CEO"
          />
        </div>

        <div>
          <label htmlFor="testimonial-company" className="mb-2 block text-sm font-medium text-charcoal">
            Company
          </label>
          <input
            id="testimonial-company"
            type="text"
            value={form.company}
            onChange={(event) => update('company', event.target.value)}
            className="w-full rounded-xl border border-medium-gray px-4 py-3 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
            placeholder="Company or organization"
          />
        </div>

        <div>
          <label htmlFor="testimonial-photo" className="mb-2 block text-sm font-medium text-charcoal">
            Photo <span className="text-sm text-navy-400">(Optional, max 10 MB)</span>
          </label>
          <input
            id="testimonial-photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full rounded-xl border border-dashed border-medium-gray bg-navy-50 px-4 py-3 text-sm text-charcoal file:mr-4 file:rounded-lg file:border-0 file:bg-gold-400 file:px-4 file:py-2 file:font-semibold file:text-navy-800 hover:file:bg-gold-500"
          />
          {photo && (
            <p className="mt-2 text-sm text-navy-500">
              Selected: {photo.name}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="testimonial-quote" className="mb-2 block text-sm font-medium text-charcoal">
            Testimonial <span className="text-red-500">*</span>
          </label>
          <textarea
            id="testimonial-quote"
            value={form.quote}
            onChange={(event) => update('quote', event.target.value)}
            required
            rows={6}
            className="w-full rounded-xl border border-medium-gray px-4 py-3 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20"
            placeholder="Share what it was like working with Francisca."
          />
        </div>

        {(error || success) && (
          <div className="md:col-span-2">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}
          </div>
        )}

        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-navy-500">
            Submissions are saved as unpublished and only appear publicly after approval.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-xl bg-gold-400 px-6 py-3 font-semibold text-navy-800 transition hover:bg-gold-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Testimonial'}
          </button>
        </div>
      </form>
    </div>
  );
}
