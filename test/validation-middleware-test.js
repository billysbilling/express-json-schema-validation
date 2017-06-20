import model from './schemas/model.json'
import ValidattionMiddleware from '../src/validation-middleware'
import ValidationError from '../src/validation-error'

const validator = new ValidattionMiddleware({ model })
const testValidate = (body, expect) =>
  new Promise((resolve, reject) => {
    validator('model')({ body }, null, resolve)
  })

describe('validation-middleware', () => {
  it('successfull validation calls next()', async () => {
    const error = await testValidate({
      requiredString: 'r',
      optionalString: 'o',
      optionalEnum: 'val1'
    })

    expect(error, 'to be undefined')
  })

  it('validation error calls next(err)', async () => {
    const errors = await testValidate({
      optionalString: 'o'
    })
    expect(errors.length, 'to equal', 1)
    expect(errors[0], 'to be a', ValidationError)
  })
})
