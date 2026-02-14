import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortfolioGallery } from '@/components/sections/PortfolioGallery';
import { portfolioItems } from '@/lib/data/portfolio';

export const metadata = {
  title: 'Portfolio',
  description: 'Browse samples of professional ghostwriting work across business writing, personal development, memoirs, blog posts, and more.',
};

export default function PortfolioPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="My Portfolio"
          subtitle="Explore samples of my ghostwriting work across various niches and formats"
        />

        <PortfolioGallery items={portfolioItems} />
      </div>
    </div>
  );
}
