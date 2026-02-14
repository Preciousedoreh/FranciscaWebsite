'use client';

import { useState } from 'react';
import { PortfolioItem } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioCardProps {
  item: PortfolioItem;
}

export function PortfolioCard({ item }: PortfolioCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColors: Record<string, string> = {
    Business: 'bg-navy-100 text-navy-700',
    'Personal Development': 'bg-gold-100 text-gold-700',
    Memoirs: 'bg-purple-100 text-purple-700',
    'Blog Posts': 'bg-blue-100 text-blue-700',
    Articles: 'bg-green-100 text-green-700',
    'Social Media': 'bg-pink-100 text-pink-700',
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="font-heading text-2xl font-bold text-navy-700">
            {item.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[item.category]}`}>
          {item.category}
        </span>

        <p className="text-charcoal leading-relaxed mb-4">
          {item.description}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gold-600 font-medium hover:text-gold-700 transition-colors inline-flex items-center gap-1"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-medium-gray">
                {item.contentPreview && (
                  <p className="text-charcoal leading-relaxed mb-4 italic">
                    {item.contentPreview}
                  </p>
                )}
                {item.pdfUrl && (
                  <a
                    href={item.pdfUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Sample PDF
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
