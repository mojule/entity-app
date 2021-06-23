import { DbRef, EntityDb } from './types';
export declare const getDbEdges: <EntityMap>(db: EntityDb<EntityMap>) => Promise<DbEdge<EntityMap>[]>;
export declare type DbEdge<EntityMap> = {
    from: DbRef<EntityMap>;
    to: DbRef<EntityMap>;
    pointer: string;
};
