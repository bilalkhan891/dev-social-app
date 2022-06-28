const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {

  const token = req.header('x-auth-token')

  // cehck if no token
  if (!token) return res.status(401).json({ msg: "No token, authorizaton denied!" })

  // check token validity
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: "No user found! invalid token passed" })
  }
}
