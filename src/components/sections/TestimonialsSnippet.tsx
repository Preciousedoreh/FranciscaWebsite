'use client';

import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { testimonials } from '@/lib/data/testimonials';

export function TestimonialsSnippet() {
  const featuredTestimonials = testimonials.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="py-20 bg-navy-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Client Success Stories
          </h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-navy-100 max-w-2xl mx-auto">
            Hear from clients who brought their stories to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featuredTestimonials.map((testimonial, index) => (
            <AnimateOnScroll key={testimonial.id} delay={index * 0.15} direction="up">
              <TestimonialCard testimonial={testimonial} variant="featured" />
            </AnimateOnScroll>
          ))}
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" href="/testimonials">
            View All Testimonials
          </Button>
        </div>
      </div>
    </section>
  );
}
