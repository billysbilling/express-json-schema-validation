var Ajv = require('ajv')
var _ = require('lodash')

function getErrorMessage (err) {
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

function jsonSchemaValidator (ajv, schema, req, res, next) {
  var valid = ajv.validate(schema, req.body)
  if (valid) {
    next()
  }

  next({
    code: 'EVALIDATION',
    errors: _.map(ajv.errors, getErrorMessage)
  })
}

module.exports = function (schemas) {
  var ajv = new Ajv({allErrors: true})
  _.each(schemas, ajv.addSchema.bind(ajv))

  return function (schema) {
    return jsonSchemaValidator.bind(null, ajv, schema)
  }
}
