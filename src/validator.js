import _ from 'lodash'
import Ajv from 'ajv'
import ValidationError from './validation-error'

function getErrorData (err) {
  switch (err.keyword) {
    case 'required':
      return {
        pointer: `${err.dataPath}/${err.params.missingProperty}`,
        message: err.message
      }
    case 'enum':
      return {
        pointer: `${err.dataPath.replace(/\./g, '/')}`,
        message: `${err.message} [${err.params.allowedValues.join(',')}]`
      }
    case 'type':
      return {
        pointer: `${err.dataPath.replace(/\./g, '/')}`,
        message: err.message
      }
    case 'additionalProperties':
      return {
        pointer: `${err.dataPath}/${err.params.additionalProperty}`,
        message: err.message
      }
    default:
      return {
        message: err.message
      }
  }
}

function getError (err) {
  err = getErrorData(err)
  return new ValidationError(err.pointer, err.message)
}

export default class Validator {
  constructor (schemas) {
    this.ajv = new Ajv({ allErrors: true })
    _.each(schemas, this.ajv.addSchema.bind(this.ajv))
  }

  validate (schema, obj) {
    const valid = this.ajv.validate(schema, obj)
    if (valid) {
      return
    }

    return _.map(this.ajv.errors, getError)
  }
}
