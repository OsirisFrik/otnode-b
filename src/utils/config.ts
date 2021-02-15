// @ts-expect-error
import portfinder from 'portfinder-sync'

interface IENV {
  NODE_ENV: string
  PORT: number | string
  SENTRY_DSN: string
  SENTRY_ENV: string
  MONGO_URI: string
  TOKEN_SECRET: string

  // Optionals
  DB_NAME?: string
}

// eslint-disable-next-line no-process-env
const ENV = process.env
const DEFAULT_PORT = 3000
const PORT = portfinder.getPort(ENV.PORT || DEFAULT_PORT)

const env: IENV = {
  PORT,
  NODE_ENV: ENV.NODE_ENV || 'development',
  SENTRY_DSN: ENV.SENTRY_DSN || '',
  SENTRY_ENV: ENV.SENTRY_ENV || ENV.NODE_ENV || 'development',
  MONGO_URI: ENV.MONGO_URI || 'mongodb://localhost:27017',
  DB_NAME: ENV.DB_NAME,
  TOKEN_SECRET: ENV.TOKEN_SECRET || 'hfbo8wygf8h3oq8rh'
}

const isDev = env.NODE_ENV === 'development'

export default env

export {
  isDev
}
