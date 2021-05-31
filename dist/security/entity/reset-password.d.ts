import { NamedEntity } from '../../entity/common/named';
import { UserRef } from './user';
export interface ResetPasswordEntity extends NamedEntity {
    user: UserRef;
    secret: string;
}
