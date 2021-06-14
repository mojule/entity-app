import { RoleMap } from '../../security/types'
import { tagsSchema } from '../common/tags-schema'
import { userRefSchema } from './refs'

export const apiKeySchema = {
  "$id": "#/api-key",
  "title": "API Key",
  "description": "Key for accessing the API",
  "type": "object",
  "properties": {
    "name": {
      "title": "Name",
      "description": "Name of this API Key",
      "type": "string"
    },
    "user": userRefSchema,
    "secret": {
      "title": "Secret",
      "description": "The API Key Secret",
      "type": "string",
      "default": "",
      "readOnly": true
    },
    "tags": tagsSchema
  },
  "required": [
    "name",
    "user",
    "secret"
  ]
} as const

export const apiKeyRoles: RoleMap = {
  "create": [
    "admin"
  ],
  "read": [
    "admin"
  ],
  "update": [
    "admin"
  ],
  "delete": [
    "admin"
  ]
} 