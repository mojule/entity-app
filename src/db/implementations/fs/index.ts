import { EntityDb, DbCollections } from '../../types'
import { createCollection } from './create-collection'
import { promises, MakeDirectoryOptions } from 'fs'
import { kebabCase } from '../../../util/lodash'
import { defaultDrop } from '../../default-drop'
import { EntityKeys } from '../../../entity/types'
import { posix } from 'path'
import { eachEntityKey } from '../../../entity/each-entity-key'
import { FsOptions } from './types'

const { mkdir } = promises

const mkdirSafe = async ( path: string, options?: MakeDirectoryOptions ) => {
  try {
    await mkdir( path, options )
  } catch ( err ) {
    if ( err.code !== 'EEXIST' ) throw err
  }
}

const initCollections = async <TEntityMap>(
  path: string, keys: EntityKeys<TEntityMap>
) => {
  const collections: DbCollections<TEntityMap> = <any>{}

  await eachEntityKey( keys, async key => {
    const collectionPath = posix.join( path, key )

    await mkdirSafe( collectionPath )

    collections[ key ] = createCollection( collectionPath )
  } )

  return collections
}

export const createFsDb = async <TEntityMap>(
  name: string, keys: EntityKeys<TEntityMap>,
  { dataPath }: FsOptions = { dataPath: './data/fs' }
) => {
  name = kebabCase( name )

  const path = posix.join( dataPath, name )

  await mkdirSafe( path )

  const drop = async () => defaultDrop( db )()
  const close = async () => { }

  const collections = await initCollections( path, keys )

  const db: EntityDb<TEntityMap> = { drop, close, collections }

  return db
}
