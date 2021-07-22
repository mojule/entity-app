import { EntityKeys } from '../..';
export declare type UniqueFieldA = {
    name: string;
    abbrev: string;
    title: string;
};
export declare type UniqueFieldB = {
    name: string;
};
export declare type UniqueFieldEntityMap = {
    a: UniqueFieldA;
    b: UniqueFieldB;
};
export declare const uniqueEntityKeys: EntityKeys<UniqueFieldEntityMap>;
export declare const createUniqueFieldDb: () => Promise<import("../..").EntityDb<UniqueFieldEntityMap, import("../..").DbItem> & {
    collections: import("../..").DbCollections<UniqueFieldEntityMap, import("../..").DbItem>;
}>;
