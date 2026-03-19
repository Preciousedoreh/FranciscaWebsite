import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { Button } from '@/components/ui/Button';
import { getTestimonials } from '@/lib/api';
import { Testimonial } from '@/lib/types';

export async function TestimonialsSnippet() {
  const apiTestimonials = await getTestimonials(true);
  const featuredTestimonials: Testimonial[] = (apiTestimonials || [])
    .filter((testimonial: Testimonial) => testimonial.published !== false)
    .slice(0, 3);

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

        {featuredTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredTestimonials.map((testimonial, index: number) => (
              <AnimateOnScroll
                key={testimonial.id || testimonial._id}
                delay={index * 0.15}
                direction="up"
              >
                <TestimonialCard testimonial={testimonial} variant="featured" />
              </AnimateOnScroll>
            ))}
          </div>
        ) : (
          <div className="mb-12 rounded-3xl border border-white/15 bg-white/10 px-8 py-10 text-center text-white">
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-navy-100">
              Approved testimonials will appear here. If you have worked with Francisca, you can submit yours now.
            </p>
          </div>
        )}

        <div className="text-center">
          <Button variant="primary" size="lg" href="/testimonials#share-your-experience">
            Share Your Experience
          </Button>
        </div>
      </div>
    </section>
  );
}
