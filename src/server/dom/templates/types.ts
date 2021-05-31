import { H } from '../../../dom/types'

export interface TemplateDependencies {
  document: Document
  h: H
  includeResolver: IncludeResolver
}

export type IncludeResolver = ( id: string ) => string
