interface DataBase {
  on(event: 'ready', listener: Function): this
}

interface ErrorCode {
  message: string
  code: number
}

interface ErrorCodes {
  [key: string]: ErrorCode
}

interface ErrorContainer {
  [key: string]: ErrorCodes
}
