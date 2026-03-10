const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchAPI(endpoint: string) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    // Backend not available, fall back to static data
    return null;
  }
}

// Portfolio
export async function getPortfolioItems(category?: string) {
  const query = category ? `?category=${category}` : '';
  return fetchAPI(`/portfolio${query}`);
}

export async function getPortfolioItem(id: string) {
  return fetchAPI(`/portfolio/${id}`);
}

// Services
export async function getServices() {
  return fetchAPI('/services');
}

// Testimonials
export async function getTestimonials(featured?: boolean) {
  const query = featured ? '?featured=true' : '';
  return fetchAPI(`/testimonials${query}`);
}

// Blog
export async function getBlogPosts(tag?: string) {
  const query = tag ? `?tag=${tag}` : '';
  return fetchAPI(`/blog${query}`);
}

export async function getBlogPost(slug: string) {
  return fetchAPI(`/blog/${slug}`);
}

// FAQs
export async function getFAQs(category?: string) {
  const query = category ? `?category=${category}` : '';
  return fetchAPI(`/faqs${query}`);
}
