# Francisca Ubah Ghostwriting Portfolio

A professional portfolio website for Ifeyinwa Francisca Ubah with **Sanity CMS integration** for easy content management.

## 🎯 Overview

This website showcases Francisca's ghostwriting services with **8 pages** and a **visual CMS dashboard** so she can manage all content without coding.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (Navy blue + Gold theme)
- **Animations**: Framer Motion
- **CMS**: Sanity.io (Content Management)
- **Forms**: Formspree
- **Fonts**: Playfair Display + Inter

## ✨ Features

✅ **8 Pages**: Home, Portfolio, Services, Testimonials, About, Contact, Blog, FAQ
✅ **CMS Dashboard**: Francisca can edit everything at `/studio`
✅ **Image Management**: Upload and manage images through Sanity
✅ **No Coding Required**: All content editable through visual interface
✅ **Responsive Design**: Works perfectly on all devices
✅ **SEO Optimized**: Sitemap, metadata, Open Graph tags
✅ **Contact Form**: Integrated with Formspree

---

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.local.example .env.local
# Edit .env.local with your Sanity Project ID and Formspree ID
```

3. **Run development server:**
```bash
npm run dev
```

4. **Access the CMS at:** http://localhost:3000/studio

---

## 📖 Documentation

- **📘 For Francisca (Content Editor)**: See [SANITY_SETUP.md](./SANITY_SETUP.md) - Complete guide to managing content
- **👨‍💻 For Developers**: See inline code comments and this README

---

## 🎯 Quick Setup Checklist

### 1. Create Sanity Project
- Go to https://www.sanity.io/manage
- Create new project: "francisca-ghostwriting"
- Copy Project ID

### 2. Create Formspree Form
- Go to https://formspree.io
- Create new form
- Copy Form ID

### 3. Configure Environment
Edit `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
```

### 4. Start Adding Content
- Run: `npm run dev`
- Visit: http://localhost:3000/studio
- Log in with your Sanity account
- Start adding portfolio items, services, testimonials, etc.

---

## 🚢 Deployment (Vercel Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import repository
4. Add environment variables
5. Deploy!

Your site will be live with automatic deployments on every push.

---

## 📞 Support

- **CMS Questions**: See [SANITY_SETUP.md](./SANITY_SETUP.md)
- **Technical Issues**: Contact your developer
- **Sanity Help**: https://www.sanity.io/docs

---

**Built for Francisca Ubah** 🎨
