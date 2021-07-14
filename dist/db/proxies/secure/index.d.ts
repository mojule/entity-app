import { EntityDb } from '../../types';
import { SecureEntityMap, LoginUser, SecureDb } from './types';
export declare const secureDbFactory: <EntityMap extends SecureEntityMap, D extends {
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
}>(db: EntityDb<EntityMap, D>, rootUser: LoginUser) => Promise<(user: LoginUser) => Promise<SecureDb<EntityMap, D>>>;
