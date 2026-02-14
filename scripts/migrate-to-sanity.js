/**
 * Migration Script: Import existing data into Sanity
 *
 * This script takes the data from src/lib/data/* files and imports them into Sanity CMS.
 * Run this ONCE after setting up your Sanity project to populate initial content.
 *
 * Usage:
 * 1. Make sure you've set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local
 * 2. Install Sanity CLI: npm install -g @sanity/cli
 * 3. Get a Sanity token: npx sanity manage (Settings → API → Add API token with "Editor" role)
 * 4. Set env var: export SANITY_AUTH_TOKEN=your_token_here
 * 5. Run: node scripts/migrate-to-sanity.js
 *
 * WARNING: This will ADD data to Sanity. It won't delete existing content.
 */

const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Import your existing data files
// Note: You'll need to adjust these imports based on your actual file structure
const services = require('../src/lib/data/services.ts').services
const portfolioItems = require('../src/lib/data/portfolio.ts').portfolioItems
const testimonials = require('../src/lib/data/testimonials.ts').testimonials
const faqs = require('../src/lib/data/faqs.ts').faqs
const blogPosts = require('../src/lib/data/blog-posts.ts').blogPosts

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function migrateData() {
  console.log('🚀 Starting data migration to Sanity...\n')

  try {
    // Migrate Services
    console.log('📦 Migrating services...')
    for (const [index, service] of services.entries()) {
      const doc = {
        _type: 'service',
        title: service.title,
        slug: { _type: 'slug', current: service.slug },
        icon: service.icon,
        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription,
        whatToExpect: service.whatToExpect,
        examples: service.examples,
        ctaText: service.ctaText,
        order: index + 1,
      }
      await client.create(doc)
      console.log(`  ✓ ${service.title}`)
    }

    // Migrate Portfolio Items
    console.log('\n📦 Migrating portfolio items...')
    for (const item of portfolioItems) {
      const doc = {
        _type: 'portfolioItem',
        title: item.title,
        description: item.description,
        category: item.category,
        contentPreview: item.contentPreview,
        featured: item.featured,
        dateAdded: item.dateAdded,
        // Note: Images and PDFs need to be uploaded manually through Sanity Studio
      }
      await client.create(doc)
      console.log(`  ✓ ${item.title}`)
    }

    // Migrate Testimonials
    console.log('\n📦 Migrating testimonials...')
    for (const testimonial of testimonials) {
      const doc = {
        _type: 'testimonial',
        quote: testimonial.quote,
        clientName: testimonial.clientName,
        clientTitle: testimonial.clientTitle,
        clientCompany: testimonial.clientCompany,
        rating: testimonial.rating,
        featured: testimonial.featured,
        projectType: testimonial.projectType,
      }
      await client.create(doc)
      console.log(`  ✓ ${testimonial.clientName}`)
    }

    // Migrate FAQs
    console.log('\n📦 Migrating FAQs...')
    for (const [index, faq] of faqs.entries()) {
      const doc = {
        _type: 'faqItem',
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: index + 1,
      }
      await client.create(doc)
      console.log(`  ✓ ${faq.question.substring(0, 50)}...`)
    }

    // Migrate Blog Posts
    console.log('\n📦 Migrating blog posts...')
    for (const post of blogPosts) {
      const doc = {
        _type: 'blogPost',
        title: post.title,
        slug: { _type: 'slug', current: post.slug },
        excerpt: post.excerpt,
        // Convert simple content string to Sanity block content
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: post.content }],
          },
        ],
        category: post.category,
        publishedDate: post.publishedDate,
        readingTime: post.readingTime,
        tags: post.tags,
        featured: post.featured,
      }
      await client.create(doc)
      console.log(`  ✓ ${post.title}`)
    }

    console.log('\n✅ Migration complete!')
    console.log('\n📝 Next steps:')
    console.log('1. Visit https://yoursite.com/studio to view your content')
    console.log('2. Upload images for portfolio items and blog posts')
    console.log('3. Upload PDF files for portfolio samples')
    console.log('4. Review and edit content as needed')

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message)
    console.error(error)
    process.exit(1)
  }
}

migrateData()
