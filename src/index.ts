import * as dotenv from 'dotenv'
import 'module-alias/register'

dotenv.config()

import Server from './server'

const server = new Server()

server.on('ready', server.start)
