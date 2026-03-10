'use client';

import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

export function ServiceHero() {
  return (
    <section className="relative overflow-hidden bg-navy-600 py-24 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimateOnScroll direction="none">
          <span className="inline-block px-4 py-1.5 bg-gold-400/20 text-gold-300 text-sm font-semibold tracking-wider uppercase rounded-full mb-6">
            What I Offer
          </span>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Words That Work
            <span className="block text-gold-400 mt-2">For You</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p className="text-lg md:text-xl text-navy-100 max-w-2xl mx-auto leading-relaxed">
            From bestselling books to scroll-stopping social media, I craft content
            that captures your voice and moves your audience to action.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
