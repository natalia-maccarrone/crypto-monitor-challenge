const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const generateToken = (userId) => {
  const token = jwt.sign(
    {
      userId,
    },
    secret,
    { expiresIn: '1d' }
  )
  return token
}

const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

const decodeToken = (token) => {
  return jwt.decode(token)
}

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
}
