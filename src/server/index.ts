import express, { Application } from 'express'
import { EventEmitter } from 'events'

class Server extends EventEmitter {
  public add: Application = express()

  constructor() {
    super()
  }
}
