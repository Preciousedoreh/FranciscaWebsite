'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface HeroSectionProps {
  title: string;
  tagline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export function HeroSection({ title, tagline, primaryCTA, secondaryCTA }: HeroSectionProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-navy-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 opacity-90" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl lg:text-3xl text-navy-100 mb-10 max-w-3xl mx-auto"
        >
          {tagline}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="lg" href={primaryCTA.href}>
            {primaryCTA.text}
          </Button>
          {secondaryCTA && (
            <Button variant="outline" size="lg" href={secondaryCTA.href} className="bg-white/10 border-white text-white hover:bg-white hover:text-navy-600">
              {secondaryCTA.text}
            </Button>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
