import express, { Application } from 'express'
import { EventEmitter } from 'events'
import Debug from 'debug'
import morgan from 'morgan'
import cors from 'cors'

import env from '@utils/config'
import DataBase from './database'

// Routes
import Routes from '@routes/index'

const debug = Debug('otn:server')

interface Server {
  on(event: 'ready', callback: () => void): this
}

class Server extends EventEmitter {
  public app: Application = express()

  private db: DataBase = new DataBase()
  private dbReady: Boolean = false

  constructor() {
    super()

    this.db.on('ready', () => this.dbReady = true)
    this.config()
  }

  async config(): Promise<void> {
    this.app.use(morgan('dev'))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(cors())

    this.routes()

    this.ready()
  }

  routes(): void {
    this.app.use(Routes)
  }

  ready(): void {
    if (this.listenerCount('ready') > 0 && this.dbReady) this.emit('ready')
    else setTimeout(() => this.ready(), 100)
  }

  start(): void {
    this.app.listen(env.PORT, () => debug(`🚀 Server running on ${env.PORT}`))
  }
}

export default Server
