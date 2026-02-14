// Portfolio Items
export const portfolioItemsQuery = `*[_type == "portfolioItem"] | order(dateAdded desc) {
  _id,
  title,
  description,
  category,
  thumbnail,
  contentPreview,
  "pdfUrl": pdfFile.asset->url,
  featured,
  dateAdded
}`

export const featuredPortfolioQuery = `*[_type == "portfolioItem" && featured == true] | order(dateAdded desc) {
  _id,
  title,
  description,
  category,
  thumbnail,
  contentPreview,
  "pdfUrl": pdfFile.asset->url,
  featured,
  dateAdded
}`

// Services
export const servicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  icon,
  shortDescription,
  fullDescription,
  whatToExpect,
  examples,
  ctaText,
  order
}`

// Testimonials
export const testimonialsQuery = `*[_type == "testimonial"] {
  _id,
  quote,
  clientName,
  clientTitle,
  clientCompany,
  clientPhoto,
  rating,
  featured,
  projectType
}`

export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] {
  _id,
  quote,
  clientName,
  clientTitle,
  clientCompany,
  clientPhoto,
  rating,
  featured,
  projectType
}`

// FAQs
export const faqsQuery = `*[_type == "faqItem"] | order(order asc) {
  _id,
  question,
  answer,
  category,
  order
}`

// Blog Posts
export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedDate desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  coverImage,
  publishedDate,
  readingTime,
  tags,
  featured
}`

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  coverImage,
  publishedDate,
  readingTime,
  tags,
  featured
}`

export const relatedBlogPostsQuery = `*[_type == "blogPost" && slug.current != $slug && (category == $category || featured == true)] | order(publishedDate desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  coverImage,
  publishedDate,
  readingTime,
  tags
}`
