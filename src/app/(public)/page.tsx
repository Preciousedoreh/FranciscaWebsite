import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { TestimonialsSnippet } from '@/components/sections/TestimonialsSnippet';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Bringing Your Story to Life, Anonymously"
        tagline="Professional non-fiction ghostwriting services for entrepreneurs, thought leaders, and storytellers"
        primaryCTA={{ text: 'Get Started', href: '/contact' }}
        secondaryCTA={{ text: 'View My Work', href: '/portfolio' }}
      />

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-charcoal leading-relaxed mb-6">
            Hi, I'm <span className="font-semibold text-navy-600">Ifeyinwa Francisca Ubah</span>, a passionate and dedicated non-fiction ghostwriter with experience in creating engaging and impactful content across a variety of niches.
          </p>
          <p className="text-lg md:text-xl text-charcoal leading-relaxed mb-6">
            Whether you're an entrepreneur, thought leader, or someone with a powerful story to tell, I help bring your voice to life. My expertise includes business writing, personal development, blog posts & articles, social media content, memoirs, and much more.
          </p>
          <p className="text-lg md:text-xl text-charcoal leading-relaxed">
            Take a look at my work and discover how I can help you achieve your writing goals.
          </p>
        </div>
      </section>

      <ServicesOverview />

      <TestimonialsSnippet />

      <CTASection
        heading="Ready to Tell Your Story?"
        description="Let's discuss how I can help bring your vision to life"
        buttonText="Schedule a Free Consultation"
        buttonHref="/contact"
        variant="gold"
      />
    </>
  );
}
