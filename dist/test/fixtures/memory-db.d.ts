import { EntityKeys } from '../..';
export declare type MemUser = {
    name: string;
    group: string;
};
export declare type MemGroup = {
    name: string;
    users: string[];
};
export declare type MemEntityMap = {
    user: MemUser;
    group: MemGroup;
};
export declare const memEntityKeys: EntityKeys<MemEntityMap>;
export declare const testMemUser: MemUser;
export declare const createMemDb: () => Promise<import("../..").EntityDb<MemEntityMap, import("../..").DbItem>>;
export declare const createMemDbWithUser: () => Promise<{
    db: import("../..").EntityDb<MemEntityMap, import("../..").DbItem>;
    _id: string;
}>;
export declare const multipleUsers: {
    name: string;
    group: string;
}[];
