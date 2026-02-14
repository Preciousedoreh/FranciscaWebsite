import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'clientTitle',
      title: 'Client Title',
      type: 'string',
      description: 'e.g., "CEO", "Life Coach"',
    }),
    defineField({
      name: 'clientCompany',
      title: 'Client Company',
      type: 'string',
    }),
    defineField({
      name: 'clientPhoto',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: '1-5 stars',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'e.g., "Book Ghostwriting", "Blog Writing"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'projectType',
      media: 'clientPhoto',
    },
  },
})
