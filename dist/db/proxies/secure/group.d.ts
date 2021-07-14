import { DbCollections } from '../../types';
import { GroupFns, SecureEntityMap, SecureUser } from './types';
export declare const createGroupFns: <EntityMap extends SecureEntityMap, D extends {
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
}>(collections: DbCollections<EntityMap, D>, dbUser: SecureUser) => GroupFns;
