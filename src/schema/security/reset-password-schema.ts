import { userRefSchema } from './refs'

export const resetPasswordSchema = {
  "$id": "#/reset-password",
  "title": "Reset Password",
  "description": "Reset a user's forgotten password",
  "type": "object",
  "properties": {
    "name": {
      "title": "Name",
      "description": "Name of this reset Key",
      "type": "string"
    },    
    "user": userRefSchema,
    "secret": {
      "title": "Secret",
      "description": "Secret for forgot password",
      "type": "string",
      "default": "",
      "readOnly": true    
    }
  },
  "required": [
    "user",
    "secret"
  ]
} as const
