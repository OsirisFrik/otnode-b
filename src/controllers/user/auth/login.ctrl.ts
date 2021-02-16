import { Request, Response } from 'express'
import { body as Body } from 'express-validator'
import { DateTime } from 'luxon'

import UserModel from '@models/User'
import { ErrorHandler, HandleErrorResponse } from '@utils/errorTools/errorHandlers'
import { createAuthToken, validateToken } from '@utils/token'
import GeneralErrors from '@utils/errorTools/errorCodes/general'

const loginFields = [
  Body(['identifier', 'password', 'keepAlive']).exists()
    .withMessage(GeneralErrors.fieldRequired)
]

// Route => /login
async function loginCtrl(req: Request, res: Response): Promise<Response | void> {
  try {
    const { identifier, password, keepAlive } = req.body

    const user = await UserModel.login(identifier, password)

    if (!user) throw new ErrorHandler(403, 'user', 'invalidCredentials')

    const expirateIn = ((keepAlive ? 720 : 48) * 60 * 60) * 1_000
    const tokenData = {
      id: user._id.toHexString(),
      created: DateTime.local().toISO()
    }
    const token = await createAuthToken(tokenData, {
      expiresIn: '1d'
    })
    const refreshToken = await createAuthToken({
      ...tokenData,
      keepAlive
    }, {
      expiresIn: keepAlive ? '30d' : '2d'
    })

    res.cookie('refresh_token', refreshToken, {
      maxAge: expirateIn
    })

    return res.status(200)
      .send({
        user,
        token
      })
  } catch (err) {
    return HandleErrorResponse(err, res)
  }
}

async function refreshLogin(req: Request, res: Response): Promise<Response | void> {
  try {
    const tokenRefresh = req.cookies.refresh_token

    if (!tokenRefresh) throw new ErrorHandler(401, 'general', 'invalidToken')

    const data = await validateToken(tokenRefresh)
    const user = await UserModel.getUser(data.id)

    if (!user) throw new ErrorHandler(403, 'general', 'invalidToken')

    const expirateIn = ((data.keepAlive ? 720 : 48) * 60 * 60) * 1_000
    const tokenData = {
      id: user._id.toHexString(),
      created: DateTime.local().toISO()
    }
    const token = await createAuthToken(tokenData, {
      expiresIn: '1d'
    })


    if (data.keepAlive) {
      const today = DateTime.utc()
      const exp = DateTime.fromSeconds(tokenRefresh.exp)
      const diff = exp.diff(today, 'days').toObject()

      if (!diff.days || diff.days < 5) {
        const refreshToken = await createAuthToken({
          ...tokenData,
          keepAlive: data.keepAlive
        }, {
          expiresIn: data.keepAlive ? '30d' : '2d'
        })

        res.cookie('refresh_token', refreshToken, {
          maxAge: expirateIn
        })
      }
    }

    return res.status(200)
      .send({
        user,
        token
      })
  } catch (err) {
    return HandleErrorResponse(err, res)
  }
}

export {
  loginCtrl,
  loginFields,
  refreshLogin
}
