import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Icon identifier (e.g., "BookOpen", "FileText")',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'For homepage cards (50-80 words)',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'text',
      description: 'For services page (150-250 words)',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatToExpect',
      title: 'What to Expect',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list of deliverables/process steps',
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Example project types',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Request a Free Quote',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (1 = first)',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
    },
    prepare(selection) {
      const { title, order } = selection
      return {
        title,
        subtitle: `Order: ${order}`,
      }
    },
  },
})
