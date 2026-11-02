import { SERVICES, POSTS, PRICING_PLANS, TESTIMONIALS, FAQS, SITE_INFO } from './data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function fetchServices(category?: string) {
  try {
    const url = category ? `${API_BASE_URL}/services?category=${category}` : `${API_BASE_URL}/services`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch services');
    return await res.json();
  } catch {
    if (category) {
      return SERVICES.filter((s) => s.category === category);
    }
    return SERVICES;
  }
}

export async function fetchServiceBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/services/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch service');
    return await res.json();
  } catch {
    return SERVICES.find((s) => s.slug === slug) || null;
  }
}

export async function fetchPosts() {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return await res.json();
  } catch {
    return POSTS;
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch post');
    return await res.json();
  } catch {
    return POSTS.find((p) => p.slug === slug) || null;
  }
}

export async function fetchPricingPlans() {
  try {
    const res = await fetch(`${API_BASE_URL}/pricing`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch pricing');
    return await res.json();
  } catch {
    return PRICING_PLANS;
  }
}

export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return await res.json();
  } catch {
    return TESTIMONIALS;
  }
}

export async function fetchFaqs() {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch FAQs');
    return await res.json();
  } catch {
    return FAQS;
  }
}

export async function fetchSiteSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch {
    return SITE_INFO;
  }
}

export async function submitInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  country?: string;
}) {
  const res = await fetch(`${API_BASE_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to submit inquiry');
  }
  return await res.json();
}

// ─── Admin API ────────────────────────────────────────────────────────────────
export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Invalid credentials');
  }
  return await res.json();
}

export async function fetchAdminInquiries(token: string) {
  const res = await fetch(`${API_BASE_URL}/inquiries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Unauthorized or failed to fetch');
  return await res.json();
}

export async function updateInquiryStatus(id: string, status: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/inquiries/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return await res.json();
}

// ─── AI Chat Assistant API ───────────────────────────────────────────────────
export async function sendChatMessage(message: string, history: Array<{ role: 'user' | 'model'; content: string }> = []) {
  const res = await fetch(`${API_BASE_URL}/chat/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to get AI advisor response');
  }
  return await res.json();
}

export async function bookAppointmentFromChat(data: {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  service?: string;
  preferredTime?: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE_URL}/chat/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to book appointment');
  }
  return await res.json();
}
