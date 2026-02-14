import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { services } from '@/lib/data/services';

export const metadata = {
  title: 'Services',
  description: 'Professional ghostwriting services including book writing, blog content, social media, business writing, personal development, and memoir ghostwriting.',
};

export default function ServicesPage() {
  return (
    <>
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Ghostwriting Services"
            subtitle="Comprehensive writing solutions tailored to your unique voice and goals"
          />

          <div className="space-y-20">
            {services.map((service, index) => (
              <AnimateOnScroll key={service.id} delay={index * 0.1}>
                <div
                  id={service.slug}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className="lg:w-1/3">
                    <div className="w-24 h-24 bg-gold-400 rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                      <svg
                        className="w-12 h-12 text-navy-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <h3 className="text-3xl font-heading font-bold text-navy-600 mb-4">
                      {service.title}
                    </h3>

                    <p className="text-lg text-charcoal leading-relaxed mb-6">
                      {service.fullDescription}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-navy-600 mb-3">
                        What to Expect
                      </h4>
                      <ul className="space-y-2">
                        {service.whatToExpect.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <svg
                              className="w-6 h-6 text-gold-400 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-charcoal">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-navy-600 mb-3">
                        Examples
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.examples.map((example, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-navy-50 text-navy-700 rounded-full text-sm"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="primary" href="/contact?service={service.slug}">
                      {service.ctaText}
                    </Button>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>

      <CTASection
        heading="Not Sure Which Service You Need?"
        description="Let's discuss your project and find the perfect solution together"
        buttonText="Schedule a Consultation"
        buttonHref="/contact"
        variant="navy"
      />
    </>
  );
}
