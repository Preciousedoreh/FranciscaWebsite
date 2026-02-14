import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief 1-2 sentence summary',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Business', value: 'Business' },
          { title: 'Personal Development', value: 'Personal Development' },
          { title: 'Memoirs', value: 'Memoirs' },
          { title: 'Blog Posts', value: 'Blog Posts' },
          { title: 'Articles', value: 'Articles' },
          { title: 'Social Media', value: 'Social Media' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contentPreview',
      title: 'Content Preview',
      type: 'text',
      description: 'First 200 chars of content for expand view',
      rows: 4,
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF Sample',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, category } = selection
      return {
        ...selection,
        subtitle: category,
      }
    },
  },
})
