import ValidationError from '../src/validation-error'

describe('validation-error', () => {
  let error
  before(() => {
    error = new ValidationError('message', [{ a: 1 }])
  })

  it('creates an instance', () => {
    expect(error, 'to be a', ValidationError)
  })

  it('has message property', () => {
    expect(error.message, 'to equal', 'message')
  })

  it('has code property', () => {
    expect(error.code, 'to equal', 'EVALIDATION')
  })

  it('has validation errors', () => {
    expect(error.errors, 'to equal', [{ a: 1 }])
  })

  it('serializes to JSON', () => {
    expect(JSON.stringify(error), 'to equal', JSON.stringify({
      name: 'ValidationError',
      code: 'EVALIDATION',
      message: 'message',
      errors: [{
        'a': 1
      }]
    }))
  })
})
