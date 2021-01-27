const authService = require('./../services/users/auth')

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    authService.verifyToken(token)
    next()
  } catch (error) {
    res.status(401).send('Invalid token')
    throw error
  }
}

const identifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const payload = authService.decodeToken(token)
    res.locals = { userId: payload.userId }
    next()
  } catch (error) {
    throw error
  }
}

module.exports = { authenticate, identifyUser }
