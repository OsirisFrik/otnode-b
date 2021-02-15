import jwt, { SignOptions } from 'jsonwebtoken'
import env from './config'

interface TokenData {
  id: string
  [key: string]: unknown
}

async function createAuthToken(data: TokenData, opt: SignOptions): Promise<string> {
  try {
    return jwt.sign(data, env.TOKEN_SECRET, opt)
  } catch (err) {
    throw err
  }
}

async function validateToken(token: string): Promise<string | object> {
  try {
    return jwt.verify(token, env.TOKEN_SECRET)
  } catch (err) {
    throw err
  }
}

export {
  createAuthToken,
  validateToken
}
