import { SectionHeading } from '@/components/ui/SectionHeading';
import { BlogCard } from '@/components/ui/BlogCard';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { blogPosts as staticPosts } from '@/lib/data/blog-posts';
import { getBlogPosts } from '@/lib/api';

export const metadata = {
  title: 'Blog',
  description: 'Read insights, tips, and stories about ghostwriting, content creation, and the writing process from Ifeyinwa Francisca Ubah.',
};

export default async function BlogPage() {
  const apiPosts = await getBlogPosts();
  const posts = apiPosts && apiPosts.length > 0 ? apiPosts : staticPosts;

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Blog"
          subtitle="Insights, tips, and stories about ghostwriting and the writing process"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any, index: number) => (
            <AnimateOnScroll key={post.slug} delay={index * 0.1}>
              <BlogCard post={post} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
