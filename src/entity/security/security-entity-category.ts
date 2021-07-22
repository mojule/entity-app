import { SecurityEntityMap } from './types'
import { EntityCategory } from '../../entity/types'

export const securityEntityCategory: EntityCategory<SecurityEntityMap> = {
  title: 'Security',
  keys: [ 'apiKey', 'pendingUser', 'resetPassword' ]
}