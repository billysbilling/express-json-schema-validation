export default class ValidationError extends Error {
  constructor (pointer, message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = 'ValidationError'
    this.code = 'EVALIDATION'
    this.message = message
    this.pointer = pointer
  }
}
