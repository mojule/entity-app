import { RequestHandler } from 'express'
import { randInt } from './random'

export const delayHandler: RequestHandler = ( _req, _res, next ) => {
  setTimeout( next, randInt( 250 ) )
}
