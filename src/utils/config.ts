// @ts-expect-error
import portfinder from 'portfinder-sync'

interface IENV {
  NODE_ENV: string
  PORT: number | string
  SENTRY_DSN: string
  SENTRY_ENV: string
}

// eslint-disable-next-line no-process-env
const ENV = process.env
const DEFAULT_PORT = 3000
const PORT = portfinder.getPort(ENV.PORT || DEFAULT_PORT)

const env: IENV = {
  PORT,
  NODE_ENV: ENV.NODE_ENV || 'development',
  SENTRY_DSN: ENV.SENTRY_DSN || '',
  SENTRY_ENV: ENV.SENTRY_ENV || ENV.NODE_ENV || 'development'
}

const isDev = env.NODE_ENV === 'development'

export default env

export {
  isDev
}
