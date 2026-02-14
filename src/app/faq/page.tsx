import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { faqs } from '@/lib/data/faqs';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ghostwriting services, pricing, timelines, and the writing process.',
};

export default function FAQPage() {
  return (
    <>
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about working with a ghostwriter"
          />

          <AnimateOnScroll>
            <FAQAccordion items={faqs} />
          </AnimateOnScroll>
        </div>
      </div>

      <CTASection
        heading="Still Have Questions?"
        description="I'm here to help. Let's schedule a free consultation to discuss your project"
        buttonText="Contact Me"
        buttonHref="/contact"
        variant="navy"
      />
    </>
  );
}
