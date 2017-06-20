import Validator from './validator'

export default function ValidationMiddleware (schemas) {
  const validator = new Validator(schemas)

  return schema =>
    (req, res, next) => {
      const error = validator.validate(schema, req.body)
      if (error) {
        return next(error)
      }
      next()
    }
}
