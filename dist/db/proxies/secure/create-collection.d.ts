import { EntityDb, DbCollection } from '../../types';
import { SecureEntityMap, SecureUser } from './types';
export declare const createSecureCollection: <K extends keyof EntityMap, EntityMap extends SecureEntityMap, D extends {
    [x: string]: unknown;
    _id: string;
    _atime: number;
    _ctime: number;
    _mtime: number;
    _ver: number;
    _mode: number;
    _owner: {
        [x: string]: unknown;
        _id: string;
        _collection: "user";
    };
    _group: {
        [x: string]: unknown;
        _id: string;
        _collection: "group";
    };
} = {
    [x: string]: unknown;
    _id: string;
    _atime: number;
    _ctime: number;
    _mtime: number;
    _ver: number;
    _mode: number;
    _owner: {
        [x: string]: unknown;
        _id: string;
        _collection: "user";
    };
    _group: {
        [x: string]: unknown;
        _id: string;
        _collection: "group";
    };
}>(db: EntityDb<EntityMap, D>, key: K, user: {
    [x: string]: unknown;
    isRoot?: boolean | undefined;
    password: string;
    name: string;
} & D) => Promise<DbCollection<EntityMap[K], D>>;
