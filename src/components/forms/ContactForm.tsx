'use client';

import { useForm, ValidationError } from '@formspree/react';
import { SERVICE_TYPES } from '@/lib/constants';

export function ContactForm() {
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID || 'placeholder'
  );

  if (state.succeeded) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-2xl font-heading font-bold text-green-800 mb-2">
          Thank You!
        </h3>
        <p className="text-green-700 leading-relaxed">
          Your message has been sent successfully. I will get back to you within 24-48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-colors"
          placeholder="John Doe"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-colors"
          placeholder="john@example.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Phone Number <span className="text-sm text-navy-400">(Optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-colors"
          placeholder="+1 (555) 123-4567"
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} />
      </div>

      <div>
        <label
          htmlFor="serviceType"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Service Type <span className="text-red-500">*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          required
          className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-colors bg-white"
        >
          <option value="">Select a service...</option>
          {SERVICE_TYPES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        <ValidationError
          prefix="Service Type"
          field="serviceType"
          errors={state.errors}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 border border-medium-gray rounded-lg focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-gold-400 text-navy-800 font-semibold py-3 px-6 rounded-lg hover:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>

      {state.errors && Object.keys(state.errors).length > 0 && !state.succeeded && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-medium">There was an error submitting the form.</p>
          <p className="text-sm">Please check your entries and try again.</p>
        </div>
      )}
    </form>
  );
}
