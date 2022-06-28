const { check, validationResult } = require('express-validator')

module.exports = {
  validationResult, experienceValidation: [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
  ]
}