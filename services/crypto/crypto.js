const coingeckoService = require('./coinGecko')
const models = require('./../../models')
const { BadInputError, InvalidCredentialsError } = require('../../errors')

const getCoinList = async (userId) => {
  try {
    const dbUser = await models.User.findOne({ where: { id: userId } })
    const favoriteCurrency = dbUser.dataValues.favoriteCurrency
    const data = await coingeckoService.getCoins()
    const coinList = data.map((coin) => {
      return {
        symbol: coin.symbol,
        price: `${
          coin.market_data.current_price[favoriteCurrency]
        } ${favoriteCurrency.toUpperCase()}`,
        name: coin.name,
        image: coin.image.large,
        last_updated: coin.last_updated,
      }
    })
    return coinList
  } catch (error) {
    throw error
  }
}

const getTopN = async (userId, n, order) => {
  try {
    if (n > 25) throw new BadInputError('N should be less to or equal than 25')
    const dbUser = await models.User.findOne({ where: { id: userId } })
    if (!dbUser) throw new BadInputError('User cannot be found')
    const favoriteCurrency = dbUser.dataValues.favoriteCurrency
    const userCryptocurrencies = await models.UserCrypto.findAll({
      where: { userId },
    })
    const userCoinSymbols = userCryptocurrencies.map((coin) => {
      return coin.dataValues.symbol
    })
    const data = await coingeckoService.getCoins()
    const coinList = data
      .filter((coin) => userCoinSymbols.includes(coin.symbol))
      .map((coin) => {
        return {
          symbol: coin.symbol,
          usd: coin.market_data.current_price.usd,
          eur: coin.market_data.current_price.eur,
          ars: coin.market_data.current_price.ars,
          name: coin.name,
          image: coin.image.large,
          last_updated: coin.last_updated,
        }
      })

    if (order === 'asc') {
      coinList.sort((a, b) => {
        return a[favoriteCurrency] - b[favoriteCurrency]
      })
    }

    if (order === 'desc') {
      coinList.sort((a, b) => {
        return b[favoriteCurrency] - a[favoriteCurrency]
      })
    }

    if (coinList.length > n) return coinList.slice(0, n)
    return coinList
  } catch (error) {
    throw error
  }
}

const addCoin = async (userId, coinSymbol) => {
  try {
    console.log(userId)
    const userHasCoin = await models.UserCrypto.findOne({
      where: { userId, symbol: coinSymbol },
    })
    console.log(userHasCoin)
    if (userHasCoin) {
      throw new BadInputError('The user already has this coin')
    }
    await models.UserCrypto.create({ userId, symbol: coinSymbol })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getCoinList,
  getTopN,
  addCoin,
}
