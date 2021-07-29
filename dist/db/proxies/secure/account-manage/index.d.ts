import { EntityDb } from '../../../types';
import { SecureEntityMap } from '../types';
import { AccountFns } from './types';
export declare const accountManageFactory: <EntityMap extends SecureEntityMap, D extends {
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
}>(db: EntityDb<EntityMap, D>) => AccountFns;
