import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/data/blog-posts';
import { BlogCard } from '@/components/ui/BlogCard';
import { CTASection } from '@/components/sections/CTASection';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && (p.category === post.category || p.featured))
    .slice(0, 3);

  return (
    <>
      <article className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-navy-600 hover:text-gold-600 mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy-600 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-navy-500">
              <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-600 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:text-gold-700">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </div>

          <div className="mt-8 pt-8 border-t border-medium-gray">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-navy-50 text-navy-600 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-light-gray">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-navy-600 mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        heading="Ready to Share Your Story?"
        description="Let's discuss how I can help bring your vision to life"
        buttonText="Get in Touch"
        buttonHref="/contact"
        variant="gold"
      />
    </>
  );
}
