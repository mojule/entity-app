import { EntityDb } from '../../db/types';
import { FileEntityMap } from '../entity/types';
import { FileEntity, ImageFileEntity, ZipFileEntity } from '../entity';
import { FileCreateData, FileCreateDependencies } from './types';
export declare const FileCreateStorageFactory: (db: EntityDb<FileEntityMap>, diskFileDeps: FileCreateDependencies<FileEntity>, imageFileDeps: FileCreateDependencies<ImageFileEntity>, zipFileDeps: FileCreateDependencies<ZipFileEntity>) => {
    diskFile: (fileData: FileCreateData) => Promise<string>;
    imageFile: (fileData: FileCreateData) => Promise<string>;
    zipFile: (fileData: FileCreateData) => Promise<string>;
};
