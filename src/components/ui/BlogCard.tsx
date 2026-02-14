import Link from 'next/link';
import { BlogPost } from '@/lib/types';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="h-48 bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center p-6">
        <h3 className="font-heading text-2xl font-bold text-white text-center line-clamp-2">
          {post.title}
        </h3>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-semibold">
            {post.category}
          </span>
          <span className="text-sm text-navy-400">{post.readingTime}</span>
        </div>

        <p className="text-charcoal leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-navy-500">
          <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span className="text-gold-600 font-medium hover:text-gold-700 transition-colors inline-flex items-center gap-1">
            Read More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
