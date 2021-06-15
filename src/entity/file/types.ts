import { FileEntity, ImageFileEntity, ZipFileEntity } from '.'
import { DbRefFor } from '../../db/types'

export type FileEntityMap = {
  file: FileEntity
  imageFile: ImageFileEntity
  zipFile: ZipFileEntity
}

export type FileRef = DbRefFor<FileEntityMap,'file'>
export type ImageFileRef = DbRefFor<FileEntityMap,'imageFile'>
export type ZipFileRef = DbRefFor<FileEntityMap,'zipFile'>
