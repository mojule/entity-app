export const filenameSchema = {
  "$id": "#/filename",
  "title": "Filename",
  "description": "Represents a filename with no path",
  "type": "string",
  "pattern": "^(\\.+[\\w\\-]+[\\w\\-\\.]*)+|[\\w\\-]+[\\w\\-\\.]*$"
} as const
