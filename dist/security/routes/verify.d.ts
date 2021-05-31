import { SecurityEntityMap } from '../entity/types';
import { EntityDb } from '../../db/types';
import { Route } from '../../server/routes/types';
export declare const createSecurityVerifyRoutes: <EntityMap extends SecurityEntityMap>(db: EntityDb<EntityMap>) => Promise<{
    verify: Route<any>;
}>;
