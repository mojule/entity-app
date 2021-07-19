import { DbCollection, DbCollections } from '../../types';
import { LoginUser, SecureEntityMap, SecureUser, UserFns } from './types';
export declare const createUserFns: <EntityMap extends SecureEntityMap, D extends {
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
}>(collection: DbCollections<EntityMap, D>["user"], dbUser: SecureUser) => UserFns;
export declare const validateDbUser: (collection: DbCollection<SecureUser>, user: LoginUser) => Promise<boolean>;
export declare const hashPassword: <Entity>(entity: Entity) => Promise<Entity>;
