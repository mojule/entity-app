export const directorySchema = {
  "$id": "#/directory",
  "title": "Directory",
  "description": "Represents an absolute POSIX directory path",
  "type": "string",
  "pattern": "^\\/(((\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*)\\/)*$"
} as const
