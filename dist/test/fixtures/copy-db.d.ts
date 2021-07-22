import { EntityKeys } from '../..';
import { DbRefFor } from '../../db/types';
export declare type CopyUser = {
    name: string;
    group: DbRefFor<CopyEntityMap, 'group'>;
};
export declare type CopyGroup = {
    name: string;
    users: DbRefFor<CopyEntityMap, 'user'>[];
};
export declare type CopyEntityMap = {
    user: CopyUser;
    group: CopyGroup;
};
export declare const copyEntityKeys: EntityKeys<CopyEntityMap>;
export declare const createSourceDb: () => Promise<import("../..").EntityDb<CopyEntityMap, import("../..").DbItem>>;
