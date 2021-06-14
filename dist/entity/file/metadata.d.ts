import { FromSchema } from 'json-schema-to-ts';
import { fileMetadataSchema } from '../../schema/file/common/file-metadata-schema';
import { imageFileMetadataSchema } from '../../schema/file/common/image-file-metadata-schema';
export declare type FileMetadata = FromSchema<typeof fileMetadataSchema>;
export declare type ImageFileMetadata = FromSchema<typeof imageFileMetadataSchema>;
