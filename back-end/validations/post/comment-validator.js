const { check, validationResult } = require('express-validator')

module.exports = {
  validationResult, commentValidate: [
    check('text', 'Text is required').not().isEmpty(),
  ]
}