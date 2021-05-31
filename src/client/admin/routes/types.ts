import { SpaRequestHandler } from '@mojule/spa-router'

export interface ClientRoute<TMeta = any> {
  method: 'get'
  path: string
  handlers: SpaRequestHandler<DocumentFragment>[]
  meta?: TMeta
}
