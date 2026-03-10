'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { Button } from '@/components/ui/Button';
import { ServiceItem } from '@/lib/types';

const iconPaths: Record<string, string> = {
  BookOpen:
    'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  FileText:
    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Share2:
    'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
  Briefcase:
    'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  TrendingUp:
    'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  Heart:
    'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
};

interface ServiceGridProps {
  services: ServiceItem[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <AnimateOnScroll key={service.id} delay={index * 0.08}>
                <div
                  id={service.slug}
                  className="group relative h-full"
                >
                  {/* Card */}
                  <div
                    className={`relative h-full rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      isExpanded
                        ? 'border-gold-400 bg-navy-600 shadow-2xl shadow-navy-600/20'
                        : 'border-medium-gray bg-white hover:border-gold-400 hover:shadow-xl hover:shadow-gold-400/10'
                    }`}
                    onClick={() => toggleExpand(service.id)}
                  >
                    {/* Top accent bar */}
                    <div
                      className={`absolute top-0 left-6 right-6 h-1 rounded-b-full transition-colors duration-300 ${
                        isExpanded ? 'bg-gold-400' : 'bg-medium-gray group-hover:bg-gold-400'
                      }`}
                    />

                    <div className="p-8">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                          isExpanded
                            ? 'bg-gold-400'
                            : 'bg-navy-50 group-hover:bg-gold-50'
                        }`}
                      >
                        <svg
                          className={`w-7 h-7 transition-colors duration-300 ${
                            isExpanded
                              ? 'text-navy-800'
                              : 'text-navy-600 group-hover:text-gold-600'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={iconPaths[service.icon] || iconPaths.BookOpen}
                          />
                        </svg>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-heading font-bold mb-3 transition-colors duration-300 ${
                          isExpanded ? 'text-white' : 'text-navy-600'
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* Short description */}
                      <p
                        className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${
                          isExpanded ? 'text-navy-100' : 'text-charcoal/70'
                        }`}
                      >
                        {service.shortDescription}
                      </p>

                      {/* Expand indicator */}
                      <div
                        className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                          isExpanded ? 'text-gold-400' : 'text-navy-600 group-hover:text-gold-600'
                        }`}
                      >
                        <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 mt-6 border-t border-navy-400">
                              {/* Full description */}
                              <p className="text-navy-100 text-sm leading-relaxed mb-6">
                                {service.fullDescription}
                              </p>

                              {/* What to expect */}
                              <h4 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-3">
                                What to Expect
                              </h4>
                              <ul className="space-y-2 mb-6">
                                {service.whatToExpect.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <svg
                                      className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-navy-100 text-sm">{item}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Examples */}
                              <h4 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-3">
                                Examples
                              </h4>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {service.examples.map((example, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-navy-500 text-navy-100 rounded-full text-xs"
                                  >
                                    {example}
                                  </span>
                                ))}
                              </div>

                              {/* CTA */}
                              <Button
                                variant="primary"
                                size="sm"
                                href={`/contact?service=${service.slug}`}
                                className="w-full"
                              >
                                {service.ctaText}
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
