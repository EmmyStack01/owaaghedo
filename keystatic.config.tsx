import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'REPLACE_KEYSTATIC_TEAM',
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/siteSettings/',
      schema: {
        email: fields.string({ label: 'Email Address' }),
        twitterUrl: fields.url({ label: 'X / Twitter URL' }),
        facebookUrl: fields.url({ label: 'Facebook URL' }),
      },
    }),
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Education & Explainers', value: 'Education & Explainers' },
            { label: 'Project Spotlights', value: 'Project Spotlights' },
            { label: 'Growth & Strategy', value: 'Growth & Strategy' },
          ],
          defaultValue: 'Education & Explainers',
        }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        pubDate: fields.date({ label: 'Publication Date' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        content: fields.markdoc({ label: 'Article Body' }),
      },
    }),
  },
});