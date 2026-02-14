# 🚀 Setup Instructions for Developer

## ✅ What's Been Built

A complete Next.js website with Sanity CMS integration:

- ✅ **8 Pages**: Home, Portfolio, Services, Testimonials, About, Contact, Blog, FAQ
- ✅ **Sanity CMS**: Visual dashboard at `/studio` for Francisca to edit content
- ✅ **All schemas created**: Portfolio, Services, Testimonials, Blog Posts, FAQs
- ✅ **Responsive design**: Navy blue + Gold theme, mobile-first
- ✅ **Production ready**: Build successful, all pages static-generated

## 📋 Next Steps (For You)

### 1. Create Sanity Project (5 minutes)

```bash
# Go to https://www.sanity.io/manage
# Click "Create project"
# Name: "francisca-ghostwriting"
# Plan: Free
# Copy the Project ID (looks like: abc123xy)
```

### 2. Create Formspree Form (2 minutes)

```bash
# Go to https://formspree.io
# Sign up (free)
# Create new form
# Copy the Form ID (looks like: xyzabc123)
```

### 3. Configure Environment Variables

```bash
# In the FranciscaProject directory:
cp .env.local.example .env.local

# Edit .env.local:
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy        # From step 1
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FORMSPREE_ID=xyzabc123             # From step 2
```

### 4. Test Locally

```bash
npm run dev

# Visit http://localhost:3000 - Website should load
# Visit http://localhost:3000/studio - Sanity login should appear
# Log in with your Sanity account
```

### 5. Add Initial Content (Optional)

The site currently uses placeholder data from `src/lib/data/*` files.

**Option A**: Francisca adds content through Sanity Studio
- She logs into `/studio`
- Adds portfolio items, services, testimonials, etc.
- Uploads images directly

**Option B**: Migrate existing data
- The existing data in `src/lib/data/*` can be migrated
- See `scripts/migrate-to-sanity.js` for migration script
- This is optional - easier to start fresh in Sanity

### 6. Deploy to Vercel

```bash
# 1. Push code to GitHub
git add .
git commit -m "Initial commit with Sanity CMS"
git push

# 2. Go to https://vercel.com
# 3. Click "New Project"
# 4. Import your GitHub repository
# 5. Add environment variables:
#    NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xy
#    NEXT_PUBLIC_SANITY_DATASET=production
#    NEXT_PUBLIC_FORMSPREE_ID=xyzabc123

# 6. Click "Deploy"
```

**Done!** Site will be live in ~2 minutes at `https://yourproject.vercel.app`

### 7. Configure Sanity CORS

After deploying to Vercel:

```bash
# 1. Go to https://www.sanity.io/manage
# 2. Select your project
# 3. Click "API" → "CORS Origins"
# 4. Add your Vercel URL: https://yourproject.vercel.app
# 5. Check "Allow credentials"
```

This allows your deployed site to fetch from Sanity.

---

## 📱 For Francisca

### Accessing the CMS

**Production**: `https://yourproject.vercel.app/studio`
**Local**: `http://localhost:3000/studio`

### Complete Guide

Give Francisca the [SANITY_SETUP.md](./SANITY_SETUP.md) file. It has:
- Step-by-step instructions with screenshots
- How to add portfolio items
- How to write blog posts
- How to upload images
- Troubleshooting guide

---

## 📂 Project Structure

```
FranciscaProject/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── portfolio/page.tsx    # Portfolio gallery
│   │   ├── services/page.tsx     # Services page
│   │   ├── testimonials/page.tsx # Testimonials
│   │   ├── about/page.tsx        # About page
│   │   ├── contact/page.tsx      # Contact form
│   │   ├── blog/                 # Blog pages
│   │   ├── faq/page.tsx          # FAQ accordion
│   │   └── studio/[[...tool]]/   # 🎨 Sanity CMS Dashboard
│   │
│   ├── components/              # React components
│   └── lib/
│       ├── sanity/              # 🔌 Sanity client & queries
│       │   ├── client.ts        # Sanity connection
│       │   └── queries.ts       # Data queries
│       ├── data/                # OLD placeholder data (backup)
│       ├── types/               # TypeScript types
│       └── constants.ts         # Site config (name, email, social)
│
├── sanity/
│   └── schemas/                 # 📋 Content models
│       ├── portfolioItem.ts
│       ├── service.ts
│       ├── testimonial.ts
│       ├── faqItem.ts
│       └── blogPost.ts
│
├── sanity.config.ts             # Sanity configuration
├── SANITY_SETUP.md              # 📖 Guide for Francisca
└── .env.local                   # 🔐 Your credentials (don't commit!)
```

---

## 🔧 How It Works

### Current State (Before Sanity is Set Up)

- Pages use placeholder data from `src/lib/data/*`
- Everything works, but content is hardcoded
- Good for testing and development

### After Sanity Setup

- Create Sanity project → Get Project ID
- Add Project ID to `.env.local`
- Francisca logs into `/studio`
- She adds content (portfolio, blog, services, etc.)
- **Pages automatically fetch from Sanity**
- No code changes needed!

### Data Flow

```
Francisca → /studio → Sanity Cloud → Next.js → Website
(Edits)   (Dashboard)  (Storage)    (Fetches)  (Displays)
```

---

## 🎯 Key Features

### For Francisca (Non-Technical)

- ✅ Visual dashboard - no coding
- ✅ Upload images with drag & drop
- ✅ Rich text editor for blog posts
- ✅ Preview changes before publishing
- ✅ Manage order of items (services, FAQs)
- ✅ Mark items as "Featured" for homepage

### For You (Developer)

- ✅ TypeScript schemas (type-safe)
- ✅ Next.js 15 with App Router
- ✅ Server components by default
- ✅ Tailwind CSS v4 (CSS-first config)
- ✅ Framer Motion animations
- ✅ SEO optimized (sitemap, metadata)
- ✅ Production build successful

---

## 🆘 Troubleshooting

### "Can't access /studio"

**Problem**: Page shows error or doesn't load

**Solution**:
```bash
# 1. Check environment variables
cat .env.local
# Should show NEXT_PUBLIC_SANITY_PROJECT_ID

# 2. Restart dev server
npm run dev

# 3. Clear browser cache and try again
```

### "Changes in Sanity not showing"

**Problem**: Edited content in Sanity but website shows old content

**Reasons**:
1. Didn't click "Publish" button in Sanity
2. Wrong dataset (using "development" instead of "production")
3. Need to rebuild: `npm run build && npm run dev`

### "Module not found" errors

**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- **Francisca's Guide**: [SANITY_SETUP.md](./SANITY_SETUP.md)
- **Main README**: [README.md](./README.md)
- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## ✅ Checklist Before Handoff

- [ ] Sanity project created and Project ID obtained
- [ ] Formspree form created and Form ID obtained
- [ ] `.env.local` configured with both IDs
- [ ] Tested `/studio` locally and can log in
- [ ] Deployed to Vercel
- [ ] Added Vercel URL to Sanity CORS settings
- [ ] Tested adding content in Sanity Studio
- [ ] Verified content appears on website
- [ ] Gave Francisca the [SANITY_SETUP.md](./SANITY_SETUP.md) guide

---

## 🎓 Teaching Francisca

### First Session (15 minutes)

1. Show her `/studio` on the deployed site
2. Log in together
3. Click "Portfolio Item" → Add one sample
4. Upload an image
5. Click "Publish"
6. Show her it appears on the website instantly

She'll understand immediately - it's like WordPress but better!

---

**That's it!** The site is complete and production-ready. Francisca can now manage all content herself. 🎉
