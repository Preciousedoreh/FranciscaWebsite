'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/ui/FilterBar';
import { PortfolioCard } from '@/components/ui/PortfolioCard';
import { PortfolioItem } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

export function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);

  return (
    <>
      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <PortfolioCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-charcoal">
            No items found in this category. Try selecting a different filter.
          </p>
        </div>
      )}
    </>
  );
}
