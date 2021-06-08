import { RegisterOptions } from './types';
import { SecurityEntityMap } from '../../../entity/security/types';
import { Route } from '../types';
import { EntityDb } from '../../..';
export declare const createSecurityRegisterRoutes: <EntityMap extends SecurityEntityMap>(db: EntityDb<EntityMap>, options: RegisterOptions) => Promise<{
    register: Route<any>;
}>;
