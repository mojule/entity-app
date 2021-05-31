import { promises } from 'fs'
import { join } from 'path'
import { FileEntity } from '../entity'

const { unlink } = promises

export const removeFs = async ( entity: FileEntity, rootPath: string ) => {
  const pathToExisting = join( rootPath, entity.meta.path )

  return unlink( pathToExisting )
}
