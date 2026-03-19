import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { CTASection } from '@/components/sections/CTASection';
import { TestimonialSubmissionForm } from '@/components/forms/TestimonialSubmissionForm';
import { getTestimonials } from '@/lib/api';
import { Testimonial } from '@/lib/types';

export const metadata = {
  title: 'Testimonials',
  description: 'Read what clients say about working with Ifeyinwa Francisca Ubah for ghostwriting services. Client success stories and reviews.',
};

export default async function TestimonialsPage() {
  const apiTestimonials = await getTestimonials();
  const testimonials: Testimonial[] = (apiTestimonials || []).filter(
    (testimonial: Testimonial) => testimonial.published !== false
  );

  return (
    <>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Client Testimonials"
            subtitle="Hear from clients who brought their stories to life"
          />

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 mb-20 md:grid-cols-2">
              {testimonials.map((testimonial, index: number) => (
                <AnimateOnScroll key={testimonial.id || testimonial._id} delay={index * 0.1}>
                  <TestimonialCard testimonial={testimonial} />
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="mb-20 rounded-3xl bg-light-gray px-8 py-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold-500">
                No Published Testimonials Yet
              </p>
              <h3 className="mb-4 text-3xl font-heading font-bold text-navy-600">
                Be the first to share your experience
              </h3>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-charcoal">
                Client submissions are reviewed before they appear on this page.
              </p>
            </div>
          )}

          <AnimateOnScroll direction="up">
            <TestimonialSubmissionForm />
          </AnimateOnScroll>
        </div>
      </div>

      <CTASection
        heading="Ready to Become Our Next Success Story?"
        description="Let's create something remarkable together"
        buttonText="Start Your Project"
        buttonHref="/contact"
        variant="gold"
      />
    </>
  );
}
