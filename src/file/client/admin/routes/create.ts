import { FileEntityMap } from '../../../entity/types'
import { EntityDb } from '../../../../db/types'
import { EntityCategories } from '../../../../entity/types'
import { EntitySchemaMap, SchemaMap } from '../../../../schema/types'
import { OnCreateSubmit } from '../../../../client/admin/types'
import { SpaResponse } from '@mojule/spa-router'
import { fileEntityCategory } from '../../../entity/file-category'
import { getData } from '../../../../client/forms/get-data'

import {
  defaultHeaderContent
} from '../../../../client/admin/templates/header-content'

import {
  createDefaultOnCreateSubmit, createEntityCreateRoute
} from '../../../../client/admin/routes/entity/create'

import { TaggedEntity } from '../../../../entity/common/tagged'
import { kebabCase } from '../../../../util/lodash'
import { error } from '../../../../client/templates/error'

export const createEntityCreateRouteWithFiles = <TEntityMap extends FileEntityMap>(
  db: EntityDb<TEntityMap>,
  entityCategories: EntityCategories<TEntityMap>,
  entityCreateSchemas: EntitySchemaMap<TEntityMap>,
  commonSchemas: SchemaMap = {},
  headerContent = defaultHeaderContent,
  onCreateSubmit = createDefaultOnCreateSubmit( db )
) => {
  const onCreateSubmitFile: OnCreateSubmit<TEntityMap> = async (
    form: HTMLFormElement, entityKey: keyof TEntityMap & string,
    categorySlug: string, res: SpaResponse<DocumentFragment>
  ) => {
    const key = entityKey as keyof FileEntityMap

    if ( !fileEntityCategory.keys.includes( key ) ){
      return onCreateSubmit( form, entityKey, categorySlug, res )
    }

    const entityTypeSlug = kebabCase( entityKey )

    try {
      const fileInput = form.elements.namedItem( 'file' )

      if ( !( fileInput instanceof HTMLInputElement ) )
        throw Error( 'Expected an HTMLInputElement named file' )

      const { files } = fileInput

      if ( files === null || files.length !== 1 )
        throw Error( 'Expected HTMLInputElement to contain a single file' )

      const data = getData( form ) as TaggedEntity

      const { tags = [] } = data

      const formData = new FormData()

      formData.append( 'file', files[ 0 ] )

      tags.forEach( tag => formData.append( 'tags[]', tag ) )

      await fetch( `/api/v1/${ entityKey }/create`, {
        method: 'POST',
        body: formData
      } )
    } catch ( err ) {
      res.send( error( err ) )
      return
    }


    res.redirect( `/list/${ categorySlug }/${ entityTypeSlug }` )
  }

  const route = createEntityCreateRoute(
    db, entityCategories, entityCreateSchemas, commonSchemas, headerContent,
    onCreateSubmitFile
  )

  return route
}
