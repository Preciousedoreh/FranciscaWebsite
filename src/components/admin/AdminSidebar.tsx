'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  FiHome,
  FiFolder,
  FiBriefcase,
  FiMessageSquare,
  FiFileText,
  FiHelpCircle,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FiHome },
  { href: '/admin/portfolio', label: 'Portfolio', icon: FiFolder },
  { href: '/admin/services', label: 'Services', icon: FiBriefcase },
  { href: '/admin/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { href: '/admin/blog', label: 'Blog', icon: FiFileText },
  { href: '/admin/faqs', label: 'FAQs', icon: FiHelpCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const sidebar = (
    <div className="flex flex-col h-full bg-[#1B2A4A] text-white w-64">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-lg font-bold tracking-wide">
          <span className="text-[#FFD11A]">Francisca</span> Admin
        </h1>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                active
                  ? 'bg-white/10 text-[#FFD11A] border-r-3 border-[#FFD11A]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1B2A4A] text-white rounded-md"
      >
        {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 transform transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30">
        {sidebar}
      </div>
    </>
  );
}
