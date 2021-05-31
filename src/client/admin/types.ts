import { ObjectMap } from '../../util/types'
import { SpaResponse } from '@mojule/spa-router'

export interface DocumentTargets extends ObjectMap<HTMLElement> {
  main: HTMLElement
}

export type EntityTemplates<TEntityMap> = {
  [ key in keyof TEntityMap ]: EntityTemplate<TEntityMap[ key ]>
}

export type EntityTemplate<TEntity> =
  ( model: TEntity ) => Node

export type OnCreateSubmit<TEntityMap> = (
  form: HTMLFormElement, entityKey: keyof TEntityMap & string,
  categorySlug: string, res: SpaResponse<DocumentFragment>
) => Promise<void>

