# express-json-schema-validation
Express JSON Schema validation middleware

## How to use:

`npm i express-json-schema-validation`

Define your schema with JSON Schema http://json-schema.org

`model.json` :

```
{
  "title": "model",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    }
  }
  "required": ["id"],
  "additionalProperties": false
}

```

Use it in express router:

```
import model from './schemas/model.json'
import { ValidationMiddleware, Validator } from 'express-json-schema-validation'

const validate = new ValidationMiddleware({ model })
const router = new Router()
router.post('/models', validate('model'), ModelController.get)
```

Handle validation errors in express error handler:

```
function handleErrors (errors, req, res, next) {
  res.status(422).json(errors)
}
```

Validate errors:
```
const validator = new Validator({ model })
const errors = validator.validate('model', object)
if (errors) {
  // ValidationErrors
}
```

Error format:
```
ValidationError({
  code: 'EVALIDATION',
  pointer: '/id' // invalid property pointer,
  message: 'validation error' // validation message
})
```
