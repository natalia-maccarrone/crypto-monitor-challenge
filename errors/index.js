class BadInputError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.statusCode = 400
    this.name = 'BadInputError'
    Error.captureStackTrace(this, BadInputError)
  }
}

class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message)
    this.message = message
    this.statusCode = 401
    this.name = 'InvalidCredentialsError'
    Error.captureStackTrace(this, InvalidCredentialsError)
  }
}

module.exports = {
  BadInputError,
  InvalidCredentialsError,
}
