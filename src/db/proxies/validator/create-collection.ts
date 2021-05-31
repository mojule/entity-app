import { ValidateOptions, ValidateEntity } from './types'
import { DbCollection } from '../../types'
import { eachAsync } from '../../../util/each'
import { dbItemToEntity } from '../..'
import { defaultLoadPaged } from '../../default-load-paged'
import { log } from '@mojule/log-iisnode'

export const createValidatedCollection =
  async <K extends keyof TEntityMap, TEntityMap>(
    collection: DbCollection<TEntityMap[ K ]>,
    key: K & string,
    validator: ValidateEntity<TEntityMap>,
    { onCreate, onLoad, onSave }: ValidateOptions
  ) => {
    const { ids, remove, removeMany } = collection

    let {
      create, createMany, load, loadMany, save, saveMany, find, findOne
    } = collection

    const validate = async ( entity: TEntityMap[ K ] ) => {
      const err = await validator( key, entity )

      if ( err ){
        log.error(
          `Store validation failed for ${ key }`,                
          err
        )

        throw err
      }
    }

    if ( onCreate ) {
      create = async entity => {
        await validate( entity )

        return await collection.create( entity )
      }

      createMany = async entities => {
        await eachAsync( entities, validate )

        return await collection.createMany( entities )
      }
    }

    if ( onLoad ) {
      load = async id => {
        const dbEntity = await collection.load( id )
        const entity = dbItemToEntity( dbEntity )

        await validate( entity )

        return dbEntity
      }

      loadMany = async ids => {
        const dbEntities = await collection.loadMany( ids )
        const entities = dbEntities.map( dbItemToEntity )

        await eachAsync( entities, validate )

        return dbEntities
      }

      find = async criteria => {
        const dbEntities = await collection.find( criteria )

        const entities = dbEntities.map( dbItemToEntity )

        await eachAsync( entities, validate )

        return dbEntities
      }

      findOne = async criteria => {
        const dbEntity = await collection.findOne( criteria )

        if( dbEntity === undefined ) return dbEntity

        const entity = dbItemToEntity( dbEntity )

        await validate( entity )

        return dbEntity
      }
    }

    if ( onSave ) {
      save = async document => {
        const entity = dbItemToEntity( document )

        await validate( entity )

        return collection.save( document )
      }

      saveMany = async documents => {
        const entities = documents.map( dbItemToEntity )

        await eachAsync( entities, validate )

        return collection.saveMany( documents )
      }
    }

    const loadPaged = defaultLoadPaged( ids, loadMany )

    const validatedCollection: DbCollection<TEntityMap[ K ]> = {
      ids, create, createMany, load, loadMany, save, saveMany, remove,
      removeMany, find, findOne, loadPaged
    }

    return validatedCollection
  }
