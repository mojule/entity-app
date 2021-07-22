import { MetadataDbItem } from '../../db/proxies/metadata/types';
import { EntityKeys } from '../../entity/types';
import { PublicThing } from './common';
export declare type MetadataEntityMap = {
    publicThing: PublicThing;
};
export declare const metadataEntityKeys: EntityKeys<MetadataEntityMap>;
export declare const createMetadataDb: () => Promise<import("../../db/types").EntityDb<MetadataEntityMap, MetadataDbItem>>;
export declare const createDisorderedDb: () => Promise<import("../../db/types").EntityDb<MetadataEntityMap, MetadataDbItem>>;
