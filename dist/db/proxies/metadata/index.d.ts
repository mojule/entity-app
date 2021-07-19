import { EntityDb } from '../../types';
import { MetadataDbItem } from './types';
import { CreateDbItem } from '../../db-memory/types';
export declare const metadataDbFactory: <TEntityMap, D extends MetadataDbItem = MetadataDbItem>(db: EntityDb<TEntityMap, D>) => EntityDb<TEntityMap, D>;
export declare const createMetadataDbItem: CreateDbItem<MetadataDbItem>;
