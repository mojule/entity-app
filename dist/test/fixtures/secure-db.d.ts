import { LoginUser, SecureEntityMap, SecureUser } from '../../db/proxies/secure/types';
import { EntityKeys } from '../../entity/types';
import { PublicThing } from './common';
export declare type PublicThingEntityMap = SecureEntityMap & {
    publicThing: PublicThing;
};
export declare const entityKeys: EntityKeys<PublicThingEntityMap>;
export declare const getRootUser: () => SecureUser;
export declare const createSecureMemDbLogin: () => Promise<{
    login: (user?: {
        [x: string]: unknown;
        password: string;
        name: string;
    } | undefined) => Promise<import("../..").EntityDb<PublicThingEntityMap, {
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
    }> & import("../..").SecureDbExternal<PublicThingEntityMap, {
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
    }> & import("../..").UserFns & import("../..").GroupFns & import("../..").AccessFns<PublicThingEntityMap> & {
        account: import("../../db/proxies/secure/account-manage/types").AccountFns;
    }>;
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
