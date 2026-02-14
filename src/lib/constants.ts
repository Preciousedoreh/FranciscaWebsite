import { SiteConfig } from '@/lib/types';

export const siteConfig: SiteConfig = {
  name: 'Ifeyinwa Francisca Ubah',
  title: 'Ifeyinwa Francisca Ubah | Professional Ghostwriter',
  description:
    'Professional non-fiction ghostwriting services. Bringing your story to life, anonymously. Book ghostwriting, blog writing, business content, and more.',
  url: 'https://franciscaubah.com',
  ogImage: '/images/og-image.jpg',
  email: 'contact@franciscaubah.com',
  phone: undefined,
  social: {
    linkedin: 'https://linkedin.com/in/franciscaubah',
    instagram: 'https://instagram.com/franciscaubah',
    twitter: 'https://twitter.com/franciscaubah',
  },
};

export const SERVICE_TYPES = [
  'Book Ghostwriting',
  'Blog & Article Writing',
  'Social Media Content',
  'Business Writing',
  'Personal Development',
  'Memoirs & Life Stories',
  'Other',
] as const;
