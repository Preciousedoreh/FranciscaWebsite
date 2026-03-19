// Portfolio
export type PortfolioCategory =
  | 'Business'
  | 'Personal Development'
  | 'Memoirs'
  | 'Blog Posts'
  | 'Articles'
  | 'Social Media';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  thumbnail: string;
  contentPreview?: string;
  pdfUrl?: string;
  featured: boolean;
  dateAdded: string;
}

// Services
export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  whatToExpect: string[];
  examples: string[];
  ctaText: string;
}

// Testimonials
export interface Testimonial {
  id?: string;
  _id?: string;
  quote: string;
  clientName: string;
  clientTitle?: string;
  clientCompany?: string;
  clientPhoto?: string;
  clientImage?: string;
  rating?: number;
  featured: boolean;
  published?: boolean;
  status?: 'pending' | 'published' | 'declined';
  projectType?: string;
}

// FAQ
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// Blog
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  coverImage?: string;
  tags: string[];
  featured: boolean;
}

// Navigation
export interface NavLink {
  label: string;
  href: string;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceType: string;
  message: string;
}

// Site Metadata
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  email: string;
  phone?: string;
  social: {
    linkedin: string;
    instagram: string;
    twitter: string;
  };
}
