'use client';

import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { Button } from '@/components/ui/Button';

interface CTASectionProps {
  heading: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  variant?: 'gold' | 'navy';
}

export function CTASection({
  heading,
  description,
  buttonText,
  buttonHref,
  variant = 'gold',
}: CTASectionProps) {
  const bgColor = variant === 'gold' ? 'bg-gold-400' : 'bg-navy-600';
  const textColor = variant === 'gold' ? 'text-navy-800' : 'text-white';
  const descColor = variant === 'gold' ? 'text-navy-700' : 'text-navy-100';

  return (
    <section className={`py-16 md:py-20 ${bgColor}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold ${textColor} mb-4`}>
            {heading}
          </h2>
          {description && (
            <p className={`text-lg md:text-xl ${descColor} mb-8 max-w-2xl mx-auto`}>
              {description}
            </p>
          )}
          <Button
            variant={variant === 'gold' ? 'secondary' : 'primary'}
            size="lg"
            href={buttonHref}
          >
            {buttonText}
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
