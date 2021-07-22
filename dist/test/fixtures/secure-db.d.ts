import { LoginUser, SecureEntityMap, SecureUser } from '../../db/proxies/secure/types';
import { EntityKeys } from '../../entity/types';
import { PublicThing } from './common';
export declare type PublicThingEntityMap = SecureEntityMap & {
    publicThing: PublicThing;
};
export declare const entityKeys: EntityKeys<PublicThingEntityMap>;
export declare const getRootUser: () => SecureUser;
export declare const createSecureMemDbLogin: () => Promise<{
    login: (user: {
        [x: string]: unknown;
        password: string;
        name: string;
    }) => Promise<import("../..").EntityDb<PublicThingEntityMap, {
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
    }> & import("../../db/proxies/secure/types").SecureDbExternal<PublicThingEntityMap, {
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
    }> & import("../../db/proxies/secure/types").UserFns & import("../../db/proxies/secure/types").GroupFns & import("../../db/proxies/secure/types").AccessFns<PublicThingEntityMap>>;
    memDb: import("../..").EntityDb<PublicThingEntityMap, {
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
export declare const getLoginBob: () => LoginUser;
