import { FromSchema } from 'json-schema-to-ts';
import { DbItem } from '../../types';
import { metadataDbItemSchema } from './schema';
export declare type Metadata = FromSchema<typeof metadataDbItemSchema>;
export declare type MetadataDbItem = DbItem & Metadata;
