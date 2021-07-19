import { SecureEntityMap, SecureUser } from '../../db/proxies/secure/types';
import { EntityKeys } from '../../entity/types';
import { PublicThing } from './common';
export declare type EntityMap = SecureEntityMap & {
    publicThing: PublicThing;
};
export declare const entityKeys: EntityKeys<EntityMap>;
export declare const getRootUser: () => SecureUser;
export declare const createSecureMemDbLogin: () => Promise<{
    login: (user: import("../../db/proxies/secure/types").LoginUser) => Promise<import("../..").EntityDb<EntityMap, {
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
    }> & import("../../db/proxies/secure/types").SecureDbExternal<EntityMap, {
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
    }> & import("../../db/proxies/secure/types").UserFns & import("../../db/proxies/secure/types").GroupFns & import("../../db/proxies/secure/types").AccessFns<EntityMap>>;
    memDb: import("../..").EntityDb<EntityMap, {
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
    }>;
}>;
