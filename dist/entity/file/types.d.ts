import { FileEntity, ImageFileEntity, ZipFileEntity } from '.';
import { DbRefFor } from '../../db/types';
export declare type FileEntityMap = {
    file: FileEntity;
    imageFile: ImageFileEntity;
    zipFile: ZipFileEntity;
};
export declare type FileRef = DbRefFor<FileEntityMap, 'file'>;
export declare type ImageFileRef = DbRefFor<FileEntityMap, 'imageFile'>;
export declare type ZipFileRef = DbRefFor<FileEntityMap, 'zipFile'>;
