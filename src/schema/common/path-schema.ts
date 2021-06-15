export const pathSchema = {
  $id: '#/path',
  title: 'Path',
  description: 'Represents an absolute POSIX directory or file path',
  type: 'string',
  pattern: '^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)?$'
} as const
