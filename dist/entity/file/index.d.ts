import { FromSchema } from 'json-schema-to-ts';
import { fileSchema } from '../../schema/file/file-schema';
import { zipFileSchema } from '../../schema/file/zip-file-schema';
import { imageFileSchema } from '../../schema/file/image-file-schema';
export declare type FileEntity = FromSchema<typeof fileSchema>;
export declare type ImageFileEntity = FromSchema<typeof imageFileSchema>;
export declare type ZipFileEntity = FromSchema<typeof zipFileSchema>;
