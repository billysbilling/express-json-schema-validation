import Validator from './validator'

export default function ValidationMiddleware (schemas) {
  const validator = new Validator(schemas)

  return schema =>
    (req, res, next) => {
      const errors = validator.validate(schema, req.body)
      if (errors) {
        return next(errors)
      }
      next()
    }
}
