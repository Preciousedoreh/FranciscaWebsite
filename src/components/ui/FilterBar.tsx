'use client';

import { PortfolioCategory } from '@/lib/types';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const categories: (string | PortfolioCategory)[] = [
  'All',
  'Business',
  'Personal Development',
  'Memoirs',
  'Blog Posts',
  'Articles',
  'Social Media',
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-5 py-2 rounded-full font-medium transition-colors ${
            activeFilter === category
              ? 'bg-gold-400 text-navy-800'
              : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
