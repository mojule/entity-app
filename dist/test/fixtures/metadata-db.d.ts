import { EntityKeys } from '../../entity/types';
import { PublicThing } from './common';
export declare type MetadataEntityMap = {
    publicThing: PublicThing;
};
export declare const metadataEntityKeys: EntityKeys<MetadataEntityMap>;
export declare const createMetadataDb: () => Promise<import("../..").EntityDb<MetadataEntityMap, import("../../db/proxies/metadata/types").MetadataDbItem>>;
