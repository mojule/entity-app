export interface FileMetadata {
  path: string
  mimetype: string
  size: number
}

export interface ImageFileMetadata extends FileMetadata {
  width: number
  height: number
}
