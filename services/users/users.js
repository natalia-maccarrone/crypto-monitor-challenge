const models = require('../../models')
const { BadInputError, InvalidCredentialsError } = require('../../errors')
const authService = require('./auth')

const register = async (user) => {
  try {
    const { name, lastName, username, password, favoriteCurrency } = user
    if (!name || !lastName || !username || !password || !favoriteCurrency) {
      throw new BadInputError('The request is missing some data')
    }
    if (!password.match(/[a-z]{1,}[0-9]{1,}/i) || password.length < 8) {
      throw new BadInputError(
        'Password should be more than 8 alphanumieric characters'
      )
    }
    const allowedCurrencies = ['eur', 'usd', 'ars']
    if (!allowedCurrencies.includes(favoriteCurrency))
      throw new BadInputError('Currency not allowed')
    const dbUsername = await models.User.findOne({ where: { username } })
    if (!dbUsername) {
      await models.User.create({
        name,
        lastName,
        username,
        password,
        favoriteCurrency,
      })
    } else {
      throw new BadInputError('The username already exists')
    }
  } catch (error) {
    throw error
  }
}

const login = async (credentials) => {
  try {
    const { username, password } = credentials
    const dbUser = await models.User.findOne({ where: { username } })
    if (!dbUser) throw new BadInputError('The entered username cannot be found')
    const dbPassword = dbUser.dataValues.password
    if (password != dbPassword)
      throw new InvalidCredentialsError('Invalid password')
    return authService.generateToken(dbUser.dataValues.id)
  } catch (error) {
    throw error
  }
}

module.exports = {
  register,
  login,
}
