import Link from 'next/link';
import { ServiceItem } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-medium-gray">
      <div className="w-12 h-12 bg-gold-400 rounded-lg flex items-center justify-center mb-4">
        <svg
          className="w-6 h-6 text-navy-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>

      <h3 className="text-xl font-heading font-semibold text-navy-600 mb-3">
        {service.title}
      </h3>

      <p className="text-charcoal leading-relaxed mb-4">
        {service.shortDescription}
      </p>

      <Link
        href={`/services#${service.slug}`}
        className="text-gold-600 font-medium hover:text-gold-700 transition-colors inline-flex items-center gap-1"
      >
        Learn More
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}
