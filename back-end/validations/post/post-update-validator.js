const { check, validationResult } = require('express-validator')

module.exports = {
  validationResult, postValidate: [
    check('text', 'Text is required').not().isEmpty(),
  ]
}