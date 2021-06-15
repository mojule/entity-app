export const tagsSchema = {
  $id: '#/tags',
  title: 'Tags',
  type: 'array',
  items: {
    title: 'Tag',
    type: 'string',
    pattern: '^[\\w\\-]{1,40}$'
  },
  uniqueItems: true
} as const
