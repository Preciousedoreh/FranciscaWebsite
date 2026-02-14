import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Process', value: 'Process' },
          { title: 'Pricing', value: 'Pricing' },
          { title: 'Timeline', value: 'Timeline' },
          { title: 'Confidentiality', value: 'Confidentiality' },
          { title: 'Rights', value: 'Rights' },
          { title: 'Services', value: 'Services' },
          { title: 'General', value: 'General' },
        ],
      },
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
      title: 'question',
      category: 'category',
      order: 'order',
    },
    prepare(selection) {
      const { title, category, order } = selection
      return {
        title,
        subtitle: `${category} - Order: ${order}`,
      }
    },
  },
})
