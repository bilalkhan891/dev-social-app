const { check, validationResult } = require('express-validator')

module.exports = {
  validationResult, educationValidation: [
    check('title', 'Title is required').not().isEmpty(),
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From Date is required').not().isEmpty(),
  ]
}