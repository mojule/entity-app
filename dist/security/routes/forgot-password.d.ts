import { EntityDb } from '../../db/types';
import { Route } from '../../server/routes/types';
import { SecurityEntityMap } from '../entity/types';
import { ForgotPasswordOptions } from './types';
export declare const createSecurityForgotRoutes: <EntityMap extends SecurityEntityMap>(db: EntityDb<EntityMap>, options: ForgotPasswordOptions) => Promise<{
    forgotPassword: Route<any>;
    resetPassword: Route<any>;
    changePassword: Route<any>;
}>;
