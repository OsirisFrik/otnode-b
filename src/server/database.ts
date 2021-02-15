import Debug from 'debug'
import Mongoose, { ConnectionOptions } from 'mongoose'
import { EventEmitter } from 'events'

// Utils
import env from '@utils/config'

// Plugins
import PaginatePlugin from 'mongoose-paginate-v2'
// @ts-expect-error
import SlugPlugin from 'mongoose-slug-updater'

const debug = Debug('otn:database')

class DataBase extends EventEmitter {
  public client: Mongoose.Mongoose | null = null

  constructor(options: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: env.DB_NAME
  }) {
    super()

    debug('⏳ Waiting for DataBase connection...')

    Mongoose.connect(env.MONGO_URI, options)
      .then((client) => {
        debug('✅ DataBase connected')

        this.client = client

        this.setup()
      })
      .catch((err) => {
        debug('❌ Error on init DataBase:', err.message)

        // eslint-disable-next-line no-process-exit
        process.exit(1)
      })
  }

  setup(): void {
    this.client?.plugin(PaginatePlugin)
      .plugin(SlugPlugin)

    this.ready()
  }

  ready(): void {
    if (this.listenerCount('ready') > 0) this.emit('ready')
    else setTimeout(() => this.ready(), 100)
  }
}

export default DataBase
