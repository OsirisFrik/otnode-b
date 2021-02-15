import { validateToken } from '@utils/token'
import { NextFunction, Request, Response } from 'express'

async function validateTokenMd(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const token = req.headers.authorization

    if (!token) return res.status(401).send('auth required')

    const tokenData = await validateToken(token)

    if (!tokenData) return res.status(401).send('no token data')

    return next()
  } catch (err) {
    throw err
  }
}

export {
  validateTokenMd
}
