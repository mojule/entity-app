import { DbCollections } from '../../types';
import { SecureEntityMap, SecureUser, Chmod } from './types';
export declare const createChmod: <EntityMap extends SecureEntityMap, D extends {
    [x: string]: unknown;
    _id: string;
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
    _atime: number;
    _ctime: number;
    _mtime: number;
} = {
    [x: string]: unknown;
    _id: string;
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
    _atime: number;
    _ctime: number;
    _mtime: number;
}>(collections: DbCollections<EntityMap, D>, user: SecureUser) => Promise<Chmod<EntityMap>>;
