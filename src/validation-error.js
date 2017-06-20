export default class ValidationError extends Error {
  constructor (message, errors) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ValidationError'
    this.code = 'EVALIDATION'
    this.message = message
    this.errors = errors
  }
}
