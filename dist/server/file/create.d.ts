import { EntityDb } from '../../db/types';
import { FileCreateData, FileCreateDependencies } from './types';
import { FileEntityMap } from '../../entity/file/types';
import { FileEntity, ImageFileEntity, ZipFileEntity } from '../../entity/file';
export declare const FileCreateStorageFactory: (db: EntityDb<FileEntityMap>, diskFileDeps: FileCreateDependencies<FileEntity>, imageFileDeps: FileCreateDependencies<ImageFileEntity>, zipFileDeps: FileCreateDependencies<ZipFileEntity>) => {
    diskFile: (fileData: FileCreateData) => Promise<string>;
    imageFile: (fileData: FileCreateData) => Promise<string>;
    zipFile: (fileData: FileCreateData) => Promise<string>;
};
