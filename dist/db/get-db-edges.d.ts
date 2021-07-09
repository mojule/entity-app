import { DbRef, EntityDbReadable } from './types';
export declare const getDbEdges: <EntityMap>(db: EntityDbReadable<EntityMap, import("./types").DbItem>) => Promise<DbEdge<EntityMap>[]>;
export declare type DbEdge<EntityMap> = {
    from: DbRef<EntityMap>;
    to: DbRef<EntityMap>;
    pointer: string;
};
