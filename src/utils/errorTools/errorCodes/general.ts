const GeneralErrors: ErrorCodes = {
  fieldRequired: {
    message: 'Field is required',
    code: 1001
  },
  tokenRequired: {
    message: 'User token is required',
    code: 1002
  },
  invalidToken: {
    message: 'Invalid token',
    code: 1003
  },
  expiredToken: {
    message: 'Token expired',
    code: 1004
  },
  notFound: {
    message: 'Request not found',
    code: 1005
  },
  scopeRequired: {
    message: 'Scope required',
    code: 1006
  }
}

export default GeneralErrors
