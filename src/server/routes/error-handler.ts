import { Response } from 'express-serve-static-core'
import { errorToObj } from '../../util/error'

export const errorHandler = ( res: Response, err: any = {} ) => {
  const status = typeof err.status === 'number' ? err.status : 500

  res.status( status ).json( errorToObj( err ) )
}