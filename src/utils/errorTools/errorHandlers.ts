import { isDev } from '@utils/config'
import { Response } from 'express'
import errorContainer from './errorCodes'

class ErrorHandler extends Error {
  public statusCode: number
  public codeError: number | string

  constructor(
    statusCode: number,
    section: string,
    errorCode: string | number,
    vars: { [key: string]: string } = {},
    custom: Boolean = false
  ) {
    super()

    this.statusCode = statusCode

    if (!custom) {
      const errorData = errorContainer[section][errorCode]

      if (Object.keys(vars).length > 0) {
        for (const key in vars) {
          const val = vars[key]

          errorData.message = errorData.message.replace(`__${key}__`, val)
        }
      }

      this.message = errorData.message
      this.codeError = errorData.code
    } else {
      this.message = section
      this.codeError = errorCode
    }
  }
}

function HandleErrorResponse(err: ErrorHandler | Error, res: Response): void {
  if (isDev) console.trace(err)

  if (err instanceof ErrorHandler) {
    res.status(err.statusCode)
      .send({
        errors: [{
          message: err.message,
          code: err.codeError
        }]
      })

    if (err.codeError >= 500) throw err
  }

  res.status(500)
    .send({
      undefinedError: true,
      errors: [err]
    })

  throw err
}

function FormatValidationErrors(
  { msg, param }: { msg: string | ErrorCode, param: string }
): object {
  const error = {
    field: param,
    message: msg,
    code: 0
  }

  if (typeof msg === 'object') {
    error.message = msg.message
    error.code = msg.code
  }

  return error
}

export {
  ErrorHandler,
  HandleErrorResponse,
  FormatValidationErrors
}
