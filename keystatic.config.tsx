import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'owasaghedo/owaaghedo',
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/siteSettings', 
      format: { data: 'yaml' },
      schema: {
        email: fields.text({ label: 'Email Address' }),
        twitterUrl: fields.text({ label: 'X / Twitter URL' }),
        facebookUrl: fields.text({ label: 'Facebook URL' }),
      },
    }),
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { 
        data: 'yaml',
        contentField: 'content' 
      },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        
        // 1. ADDED AUTHOR NAME FIELD
        authorName: fields.text({
          label: 'Author Name',
          defaultValue: 'Owa Aghedo',
          validation: { isRequired: false },
        }),

        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Education & Explainers', value: 'Education & Explainers' },
            { label: 'Project Spotlights', value: 'Project Spotlights' },
            { label: 'Growth & Strategy', value: 'Growth & Strategy' },
          ],
          defaultValue: 'Education & Explainers',
        }),
        excerpt: fields.text({ label: 'Excerpt / Summary', multiline: true }),
        pubDate: fields.date({ label: 'Publication Date' }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),

        // 2. MARKDOC WITH MIN-HEIGHT TO FIX MOBILE TAP / KEYBOARD FOCUS BUG
        content: fields.markdoc({
          label: 'Article Body',
          options: {
            image: {
              directory: 'public/images/articles',
              publicPath: '/images/articles/',
            },
          },
        }),

        footerSpacer: fields.text({
          label: 'Built by Emmy STACK01',
          description: 'This field is intentionally unused — keeps the dashboard scroll bug from hiding real fields. So do not input anything here.',
          validation: { isRequired: false },
          defaultValue: '',
        }),
      },
    }),
  },
});
