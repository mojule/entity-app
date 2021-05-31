import { IdSchema } from '../schema/types'
import { Role } from './types'
import { ActionType } from '../server/routes/types'

export const canAccessSchema = (
  schema: IdSchema, type: ActionType, currentRoles: Role[]
) => {
  const { _esRoles } = schema

  if (_esRoles === undefined) {
    if (type === 'read') return true

    return currentRoles.includes('admin')
  }

  const expectRoles = _esRoles[ type ]

  return expectRoles.every( role => currentRoles.includes( role ) )
}

export const canAccessSchemaField = () => {

}
