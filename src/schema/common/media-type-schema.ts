export const mediaTypeSchema = {
  $id: '#/media-type',
  title: 'Media Type',
  description: 'Represents a media type (aka MIME)',
  type: 'string',
  pattern: '^\\w+\\/([\\w-]+\\.)*[\\w-]+(\\+[\\w]+)?(;.*)?$'
} as const
