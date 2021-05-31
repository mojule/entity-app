import { NamedEntity } from '../../entity/common/named';
import { TaggedEntity } from '../../entity/common/tagged';
import { UserRef } from './user';
export interface ApiKeyEntity extends NamedEntity, TaggedEntity {
    user: UserRef;
    secret: string;
}
