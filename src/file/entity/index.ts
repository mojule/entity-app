import { FileMetadata, ImageFileMetadata } from './metadata'
import { NamedEntity } from '../../entity/common/named'
import { TaggedEntity } from '../../entity/common/tagged'
import { DbRef } from '../../db/types'
import { FileEntityMap } from './types'

export interface FileEntity extends NamedEntity, TaggedEntity {
  meta: FileMetadata
}

export interface ImageFileEntity extends FileEntity {
  meta: ImageFileMetadata
}

export interface ZipFileEntity extends FileEntity {
  paths: string[]
  files: FileRef[]
  images: ImageFileRef[]
}

export interface FileRef extends DbRef<FileEntityMap> {
  _collection: 'file'
}

export interface ImageFileRef extends DbRef<FileEntityMap> {
  _collection: 'imageFile'
}

export interface ZipFileRef extends DbRef<FileEntityMap> {
  _collection: 'zipFile'
}
