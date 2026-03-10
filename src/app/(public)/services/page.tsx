import { CTASection } from '@/components/sections/CTASection';
import { services } from '@/lib/data/services';
import { ServiceHero } from '@/components/sections/ServiceHero';
import { ServiceGrid } from '@/components/sections/ServiceGrid';
import { ServiceProcess } from '@/components/sections/ServiceProcess';

export const metadata = {
  title: 'Services',
  description: 'Professional ghostwriting services including book writing, blog content, social media, business writing, personal development, and memoir ghostwriting.',
};

export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      <ServiceGrid services={services} />
      <ServiceProcess />
      <CTASection
        heading="Ready to Bring Your Vision to Life?"
        description="Every great story starts with a conversation. Let's start yours today."
        buttonText="Schedule a Free Consultation"
        buttonHref="/contact"
        variant="navy"
      />
    </>
  );
}
