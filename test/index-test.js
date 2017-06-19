import model from './schemas/model.json'
import Validator from '../src'

const validator = new Validator({ model })
const validate = (body, expect) =>
  new Promise((resolve, reject) => {
    validator('model')({ body }, null, resolve)
  })

describe('validator', () => {
  it('successfully validates', async () => {
    const errors = await validate({
      requiredString: 'r',
      optionalString: 'o',
      optionalEnum: 'val1'
    })

    expect(errors, 'to be undefined')
  })

  it('validates required properties', async () => {
    const errors = await validate({ optionalString: 'o' })
    expect(errors, 'to equal', [ { code: 'EVALIDATION', pointer: '/requiredString', message: 'should have required property \'requiredString\'' } ])
  })

  it('validates property types', async () => {
    const errors = await validate({ requiredString: 10 })
    expect(errors, 'to equal', [ { code: 'EVALIDATION', pointer: '/requiredString', message: 'should be string' } ])
  })

  it('validates enum properties', async () => {
    const errors = await validate({ requiredString: 'r', optionalEnum: 'invalid' })
    expect(errors, 'to equal', [ { code: 'EVALIDATION', pointer: '/optionalEnum', message: 'should be equal to one of the allowed values [val1,val2]' } ])
  })

  it('validates additional properties', async () => {
    const errors = await validate({ requiredString: 'r', extraProperty: 'invalid' })
    expect(errors, 'to equal', [ { code: 'EVALIDATION', pointer: '/extraProperty', message: 'should NOT have additional properties' } ])
  })
})