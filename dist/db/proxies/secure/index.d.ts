import { EntityDb } from '../../types';
import { SecureEntityMap, LoginUser } from './types';
export declare const secureDbFactory: <EntityMap extends SecureEntityMap, D extends {
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
}>(db: EntityDb<EntityMap, D>, rootUser: LoginUser) => Promise<(user: LoginUser) => Promise<EntityDb<EntityMap, D> & import("./types").SecureDbExternal<EntityMap, D> & import("./types").UserFns & import("./types").GroupFns & import("./types").AccessFns<EntityMap>>>;
