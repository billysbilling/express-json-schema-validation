import model from './schemas/model.json'
import { Validator } from '../src'
import ValidationError from '../src/validation-error'

const validator = new Validator({ model })

describe('validator', () => {
  it('successfully validates', () => {
    const error = validator.validate('model', {
      requiredString: 'r',
      optionalString: 'o',
      optionalEnum: 'val1'
    })

    expect(error, 'to be undefined')
  })

  it('validates required properties', async() => {
    const errors = validator.validate('model', {
      optionalString: 'o'
    })
    expect(errors, 'to equal', [ new ValidationError('/requiredString', 'should have required property \'requiredString\'') ])
  })

  it('validates property types', async() => {
    const errors = validator.validate('model', {
      requiredString: 10
    })
    expect(errors, 'to equal', [ new ValidationError('/requiredString', 'should be string') ])
  })

  it('validates enum properties', async() => {
    const error = validator.validate('model', {
      requiredString: 'r',
      optionalEnum: 'invalid'
    })
    expect(error, 'to equal', [ new ValidationError('/optionalEnum', 'should be equal to one of the allowed values [val1,val2]') ])
  })

  it('validates additional properties', async() => {
    const error = validator.validate('model', {
      requiredString: 'r',
      extraProperty: 'invalid'
    })
    expect(error, 'to equal', [ new ValidationError('/extraProperty', 'should NOT have additional properties') ])
  })

  it('returns multiple errors', async() => {
    const errors = validator.validate('model', {
      requiredString: 11,
      optionalString: 10
    })
    expect(errors, 'to equal', [
      new ValidationError('/requiredString', 'should be string'),
      new ValidationError('/optionalString', 'should be string')
    ])
  })
})
