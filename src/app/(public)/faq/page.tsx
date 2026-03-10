import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTASection } from '@/components/sections/CTASection';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { faqs as staticFaqs } from '@/lib/data/faqs';
import { getFAQs } from '@/lib/api';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about ghostwriting services, pricing, timelines, and the writing process.',
};

export default async function FAQPage() {
  const apiFaqs = await getFAQs();
  const faqs = apiFaqs && apiFaqs.length > 0 ? apiFaqs : staticFaqs;

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
