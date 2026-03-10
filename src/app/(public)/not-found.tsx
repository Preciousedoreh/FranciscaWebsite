import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-9xl font-heading font-bold text-navy-600 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-navy-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-charcoal mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" href="/">
            Go to Homepage
          </Button>
          <Button variant="outline" href="/contact">
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
}
