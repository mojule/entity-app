import express from 'express'
import { Request, Response } from 'express-serve-static-core'
import { PassportStatic } from 'passport'
import { Route } from '../../server/routes/types'
import { delayHandler } from '../../util/delay-handler'
import { LoginOptions } from './types'

const postHandler = express.urlencoded( { extended: false } )

export const createSecurityLoginRoutes = async ( 
  passport: PassportStatic, options: LoginOptions = { loginHandlers: [] }
) => {
  const login: Route = {
    method: 'post',
    path: 'login',
    handlers: [
      postHandler,
      delayHandler,
      ...options.loginHandlers,
      passport.authenticate(
        'local',
        { successReturnToOrRedirect: '/', failureRedirect: '/login' }
      )
    ],
    roles: []
  }

  const logout: Route = {
    method: 'get',
    path: 'logout',
    handlers: [
      async ( req: Request, res: Response ) => {
        req.logout()

        res.redirect( '/' )
      }
    ],
    roles: []
  }

  return { login, logout }
}
