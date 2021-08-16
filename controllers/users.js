const userService = require('./../services/users/users')

const register = async (req, res) => {
  try {
    await userService.register(req.body)
    res.status(201).send('User created successfully')
  } catch (error) {
    res.status(error.statusCode).send({ Error: error.message })
    throw error
  }
}

const login = async (req, res) => {
  try {
    const token = await userService.login(req.body)
    res.send({ token })
  } catch (error) {
    res.status(error.statusCode).send({ Error: error.message })
    throw error
  }
}

module.exports = {
  register,
  login,
}
