import { EntityDb } from '../../../db/types';
import { Route } from '../types';
import { ForgotPasswordOptions } from './types';
import { SecurityEntityMap } from '../../../entity/security/types';
export declare const createSecurityForgotRoutes: <EntityMap extends SecurityEntityMap>(db: EntityDb<EntityMap>, options: ForgotPasswordOptions) => Promise<{
    forgotPassword: Route<any>;
    resetPassword: Route<any>;
    changePassword: Route<any>;
}>;
