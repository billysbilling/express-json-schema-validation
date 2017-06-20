import ValidationError from '../src/validation-error'

describe('validation-error', () => {
  let error
  before(() => {
    error = new ValidationError('/a', 'message')
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

  it('has pointer property', () => {
    expect(error.pointer, 'to equal', '/a')
  })

  it('serializes to JSON', () => {
    expect(JSON.stringify(error), 'to equal', JSON.stringify({
      name: 'ValidationError',
      code: 'EVALIDATION',
      message: 'message',
      pointer: '/a'
    }))
  })
})
