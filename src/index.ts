import { isDev } from './utils/config'

if (!isDev) {
  require('module-alias/register')
}

import Server from './server'

const server = new Server()

server.on('ready', server.start)
