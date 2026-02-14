'use client';

import { ServiceCard } from '@/components/ui/ServiceCard';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/lib/data/services';

export function ServicesOverview() {
  return (
    <section className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What I Offer"
          subtitle="Professional ghostwriting services tailored to your unique voice and vision"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.id} delay={index * 0.1} direction="up">
              <ServiceCard service={service} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
