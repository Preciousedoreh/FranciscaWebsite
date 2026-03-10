'use client';

import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We start with a free consultation to understand your goals, audience, and vision for the project.',
  },
  {
    number: '02',
    title: 'Strategy & Outline',
    description:
      'I develop a detailed roadmap and content outline tailored to your objectives and timeline.',
  },
  {
    number: '03',
    title: 'Writing & Collaboration',
    description:
      'Through interviews and iterative drafts, I craft content that authentically captures your voice.',
  },
  {
    number: '04',
    title: 'Review & Refine',
    description:
      'We polish every detail together until the final piece exceeds your expectations.',
  },
];

export function ServiceProcess() {
  return (
    <section className="py-20 md:py-28 bg-light-gray">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll direction="none">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-navy-600/10 text-navy-600 text-sm font-semibold tracking-wider uppercase rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy-600 mb-4">
              A Simple, Proven Process
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
              From first conversation to final delivery, here&apos;s how we bring your words to life.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-gold-400/30" />

          {steps.map((step, index) => (
            <AnimateOnScroll key={step.number} delay={index * 0.15}>
              <div className="relative text-center">
                {/* Step number circle */}
                <div className="relative mx-auto w-16 h-16 rounded-full bg-navy-600 flex items-center justify-center mb-6 z-10">
                  <span className="text-gold-400 font-heading font-bold text-lg">
                    {step.number}
                  </span>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-navy-600/30 animate-ping opacity-20" />
                </div>

                <h3 className="text-xl font-heading font-bold text-navy-600 mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
