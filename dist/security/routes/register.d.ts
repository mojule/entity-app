import { SecurityEntityMap } from '../entity/types';
import { EntityDb } from '../../db/types';
import { RegisterOptions } from './types';
import { Route } from '../../server/routes/types';
export declare const createSecurityRegisterRoutes: <EntityMap extends SecurityEntityMap>(db: EntityDb<EntityMap>, options: RegisterOptions) => Promise<{
    register: Route<any>;
}>;
