import { SecureEntityMap, SecureUser } from '../../db/proxies/secure/types';
import { EntityKeys } from '../../entity/types';
export declare type PublicThing = {
    name: string;
    value: number;
};
export declare type EntityMap = SecureEntityMap & {
    publicThing: PublicThing;
};
export declare const entityKeys: EntityKeys<EntityMap>;
export declare const getRootUser: () => SecureUser;
export declare const createSecureMemDbLogin: () => Promise<{
    login: (user: import("../../db/proxies/secure/types").LoginUser) => Promise<import("../../db/proxies/secure/types").SecureDb<EntityMap, {
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
    }>>;
    memDb: import("../..").EntityDb<EntityMap, {
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
    }>;
}>;
