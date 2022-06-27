const { check, validationResult } = require('express-validator')

module.exports = {
  validationResult,
  profileValidation: [
    check('status', 'Status is required!').not().isEmail(),
    check('skills', 'Skills is required').not().isEmpty()
  ]
}