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
function handleError (err, req, res, next) {
  switch(err.code) {
    'EVALIDATION':
      res.status(422).json(err)
  }
}
```

Validate errors:
```
const validator = new Validator({ model })
const error = validator.validate('model', object)
if (error) {
  // ValidationError
}
```

Error format:
```
ValidationError({
  code: 'EVALIDATION',
  errors: [{
    pointer: '/id' // invalid property pointer,
    message: 'validation error' // validation message
  }]
})
```
