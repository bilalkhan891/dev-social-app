const express = require('express')
const router = express.Router()
const User = require("../../models/User")
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { validationResult, validateUsers } = require("../../validations/users-validation")
const jwd = require('jsonwebtoken')
const config = require('config')

// @route   GET api/users
// @desc    Test route
// @access  Public
router.post('/', validateUsers, async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    // See if user exists
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists." }] })
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name, email, password, avatar
    })

    // Encrypt password
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    }
    jwd.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })

  } catch (error) {
    console.log(error)
    res.json({ error })
  }

})

module.exports = router

