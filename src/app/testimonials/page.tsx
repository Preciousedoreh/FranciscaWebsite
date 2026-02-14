import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { CTASection } from '@/components/sections/CTASection';
import { testimonials } from '@/lib/data/testimonials';

export const metadata = {
  title: 'Testimonials',
  description: 'Read what clients say about working with Ifeyinwa Francisca Ubah for ghostwriting services. Client success stories and reviews.',
};

export default function TestimonialsPage() {
  return (
    <>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Client Testimonials"
            subtitle="Hear from clients who brought their stories to life"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <AnimateOnScroll key={testimonial.id} delay={index * 0.1}>
                <TestimonialCard testimonial={testimonial} />
              </AnimateOnScroll>
            ))}
          </div>

          <div className="bg-light-gray rounded-2xl p-12">
            <h3 className="text-3xl font-heading font-bold text-navy-600 mb-6 text-center">
              Success Stories
            </h3>

            <div className="space-y-12">
              <AnimateOnScroll>
                <div className="bg-white rounded-lg p-8 border-l-4 border-gold-400">
                  <h4 className="text-2xl font-heading font-semibold text-navy-600 mb-2">
                    From Idea to Bestseller
                  </h4>
                  <p className="text-sm text-navy-500 mb-4 uppercase tracking-wide">
                    Business Leadership Book
                  </p>
                  <p className="text-charcoal leading-relaxed mb-4">
                    <strong>Challenge:</strong> A busy CEO wanted to share his leadership methodology but had no time to write and struggled to organize his thoughts into a coherent narrative.
                  </p>
                  <p className="text-charcoal leading-relaxed mb-4">
                    <strong>Approach:</strong> Through 20+ hours of interviews, I captured his voice, stories, and framework. I structured the content into a compelling narrative with actionable frameworks readers could implement immediately.
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    <strong>Outcome:</strong> The book launched to critical acclaim, hit #1 in its category on Amazon, and led to a 6-figure book deal with a major publisher for his next title. The client now commands speaking fees 3x higher than before publication.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.2}>
                <div className="bg-white rounded-lg p-8 border-l-4 border-gold-400">
                  <h4 className="text-2xl font-heading font-semibold text-navy-600 mb-2">
                    Preserving a Legacy
                  </h4>
                  <p className="text-sm text-navy-500 mb-4 uppercase tracking-wide">
                    Personal Memoir
                  </p>
                  <p className="text-charcoal leading-relaxed mb-4">
                    <strong>Challenge:</strong> A client in her 80s wanted to document her extraordinary life story for future generations but felt overwhelmed by where to start and how to structure decades of experiences.
                  </p>
                  <p className="text-charcoal leading-relaxed mb-4">
                    <strong>Approach:</strong> Over six months of gentle, empathetic interviews, I helped her recall forgotten details, organized her stories chronologically and thematically, and captured the emotional truth of her journey.
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    <strong>Outcome:</strong> The completed memoir brought her family to tears at the unveiling. Grandchildren who thought they knew her story discovered depth they'd never imagined. The book now sits in their family library as a treasured heirloom, with multiple family members requesting their own copies.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.4}>
                <div className="bg-white rounded-lg p-8 border-l-4 border-gold-400">
                  <h4 className="text-2xl font-heading font-semibold text-navy-600 mb-2">
                    Establishing Thought Leadership
                  </h4>
                  <p className="text-sm text-navy-500 mb-4 uppercase tracking-wide">
                    Content Marketing Strategy
                  </p>
                  <p className="text-charcoal leading-relaxed mb-4">
                    <strong>Challenge:</strong> A consulting firm wanted to establish thought leadership in their industry but lacked the internal resources to create consistent, high-quality content.
                  </p>
                  <p className="text-charcoal leading-relaxed mb-4">
                    <strong>Approach:</strong> I developed a content calendar and wrote 2-3 articles per week for their blog, LinkedIn, and industry publications. Each piece positioned their unique methodology while addressing client pain points.
                  </p>
                  <p className="text-charcoal leading-relaxed">
                    <strong>Outcome:</strong> Within 12 months, their organic traffic increased 300%, they secured speaking engagements at major industry conferences, and attributed $500K in new business directly to their content presence. The managing partner is now recognized as a top voice in their field.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
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
