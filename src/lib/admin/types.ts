export interface Portfolio {
  _id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  contentPreview: string;
  pdfUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientTitle: string;
  clientCompany?: string;
  clientImage: string;
  quote: string;
  rating: number;
  featured: boolean;
  published: boolean;
  projectType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
