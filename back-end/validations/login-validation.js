const { check, validationResult } = require('express-validator')

module.exports = {
  validationResult, authValidation: [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ]
}