const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function authFetch(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  if (!token) {
    window.location.href = '/admin/login';
    throw new Error('No auth token');
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
    Authorization: `Bearer ${token}`,
  };

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return res.json();
}

function createCrudApi<T>(basePath: string) {
  return {
    getAll: () => authFetch(basePath) as Promise<T[]>,
    getOne: (id: string) => authFetch(`${basePath}/${id}`) as Promise<T>,
    create: (data: Partial<T>) => authFetch(basePath, {
      method: 'POST',
      body: JSON.stringify(data),
    }) as Promise<T>,
    update: (id: string, data: Partial<T>) => authFetch(`${basePath}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }) as Promise<T>,
    delete: (id: string) => authFetch(`${basePath}/${id}`, {
      method: 'DELETE',
    }),
  };
}

export const portfolioApi = createCrudApi<import('./types').Portfolio>('/portfolio');
export const servicesApi = createCrudApi<import('./types').Service>('/services');
export const testimonialsApi = createCrudApi<import('./types').Testimonial>('/testimonials');
export const faqsApi = createCrudApi<import('./types').FAQ>('/faqs');

export const blogApi = {
  ...createCrudApi<import('./types').BlogPost>('/blog'),
  getAllAdmin: () => authFetch('/blog/admin/all') as Promise<import('./types').BlogPost[]>,
};

export const uploadApi = {
  image: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return authFetch('/upload/image', {
      method: 'POST',
      body: formData,
    });
  },
  pdf: async (file: File) => {
    const formData = new FormData();
    formData.append('pdf', file);
    return authFetch('/upload/pdf', {
      method: 'POST',
      body: formData,
    });
  },
};

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Login failed');
    }
    return res.json();
  },
};
