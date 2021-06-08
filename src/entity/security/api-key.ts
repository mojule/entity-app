import { NamedEntity } from '../common/named'
import { TaggedEntity } from '../common/tagged'
import { UserRef } from './user'

export interface ApiKeyEntity extends NamedEntity, TaggedEntity {
  user: UserRef
  secret: string 
}
