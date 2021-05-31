import { Request, Response } from 'express-serve-static-core'
import { log } from '@mojule/log-iisnode'
import { SecurityEntityMap } from '../entity/types'
import { EntityDb } from '../../db/types'
import { Route } from '../../server/routes/types'
import { delayHandler } from '../../util/delay-handler'
import { UserEntity } from '../entity/user'
import { delayPromise } from '../../util/delay-promise'

export const createSecurityVerifyRoutes = async <EntityMap extends SecurityEntityMap>(
  db: EntityDb<EntityMap>
) => {
  const verify: Route = {
    method: 'get',
    path: 'verify/:secret',
    roles: [],
    handlers: [
      delayHandler,
      async (req: Request, res: Response) => {
        const start = Date.now()
        const { secret } = req.params

        try {
          if( !secret ) throw Error( 'Expected secret' )

          const query = { secret }
          const pendingUser = await db.collections.pendingUser.findOne(query)

          if (pendingUser === undefined) {
            throw Error(`No pendingUser found for secret ${secret}`)
          }

          const { name, email, password, roles } = pendingUser

          const userEntity: UserEntity = { name, email, password, roles }

          await db.collections.user.create(userEntity)
          await db.collections.pendingUser.remove(pendingUser._id)
        } catch (err) {
          log.error(err)
        }

        const elapsed = Date.now() - start

        await delayPromise( 250 - elapsed )

        res.redirect( '/verify-success' )         
      }
    ]
  }

  return { verify }
}
