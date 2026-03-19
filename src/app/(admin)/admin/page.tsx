'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { useAuth } from '@/lib/admin/auth-context';
import { portfolioApi, servicesApi, testimonialsApi, blogApi, faqsApi } from '@/lib/admin/api';
import {
  FiFolder,
  FiBriefcase,
  FiMessageSquare,
  FiFileText,
  FiHelpCircle,
  FiPlus,
} from 'react-icons/fi';

interface Stats {
  portfolio: number;
  services: number;
  testimonials: number;
  blog: number;
  faqs: number;
}

export default function AdminDashboard() {
  const { isLoading } = useAuth();
  const [stats, setStats] = useState<Stats>({ portfolio: 0, services: 0, testimonials: 0, blog: 0, faqs: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    async function fetchStats() {
      try {
        const [portfolio, services, testimonials, blog, faqs] = await Promise.all([
          portfolioApi.getAll().catch(() => []),
          servicesApi.getAll().catch(() => []),
          testimonialsApi.getAll().catch(() => []),
          blogApi.getAllAdmin().catch(() => []),
          faqsApi.getAll().catch(() => []),
        ]);
        setStats({
          portfolio: portfolio.length,
          services: services.length,
          testimonials: testimonials.length,
          blog: blog.length,
          faqs: faqs.length,
        });
      } catch {
        // Stats will remain at 0
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, [isLoading]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-500">Loading...</div>;
  }

  const cards = [
    { label: 'Portfolio Items', count: stats.portfolio, icon: FiFolder, href: '/admin/portfolio', color: 'bg-blue-500' },
    { label: 'Services', count: stats.services, icon: FiBriefcase, href: '/admin/services', color: 'bg-green-500' },
    { label: 'Testimonials', count: stats.testimonials, icon: FiMessageSquare, href: '/admin/testimonials', color: 'bg-purple-500' },
    { label: 'Blog Posts', count: stats.blog, icon: FiFileText, href: '/admin/blog', color: 'bg-orange-500' },
    { label: 'FAQs', count: stats.faqs, icon: FiHelpCircle, href: '/admin/faqs', color: 'bg-teal-500' },
  ];

  const quickActions = [
    { label: 'New Portfolio Item', href: '/admin/portfolio/new' },
    { label: 'New Blog Post', href: '/admin/blog/new' },
    { label: 'New Service', href: '/admin/services/new' },
    { label: 'New FAQ', href: '/admin/faqs/new' },
  ];

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`${card.color} text-white p-2 rounded-lg`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">
                    {loadingStats ? '...' : card.count}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{card.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 px-4 py-3 bg-[#1B2A4A] text-white rounded-lg hover:bg-[#243556] transition-colors text-sm"
              >
                <FiPlus size={16} />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
