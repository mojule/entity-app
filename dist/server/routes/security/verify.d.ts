import { SecurityEntityMap } from '../../../entity/security/types';
import { EntityDb } from '../../..';
import { Route } from '../types';
export declare const createSecurityVerifyRoutes: <EntityMap extends SecurityEntityMap>(db: EntityDb<EntityMap>) => Promise<{
    verify: Route<any>;
}>;
