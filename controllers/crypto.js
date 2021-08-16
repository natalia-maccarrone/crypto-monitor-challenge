const { BadInputError } = require('../errors')
const cryptoService = require('./../services/crypto/crypto')

const getCoinList = async (req, res) => {
  try {
    const { userId } = res.locals
    const coinList = await cryptoService.getCoinList(userId)
    res.send(coinList)
  } catch (error) {
    res.status(error.statusCode).send({ Error: error.message })
    throw error
  }
}

const getTopN = async (req, res) => {
  try {
    const { userId } = res.locals
    const { n, order } = req.params
    const coinList = await cryptoService.getTopN(userId, n, order)
    if (coinList.length === 0) {
      res.send('No cryptocurrencies found')
    } else {
      res.send(coinList)
    }
  } catch (error) {
    res.status(error.statusCode).send({ Error: error.message })
    throw error
  }
}

const addCoin = async (req, res) => {
  try {
    const userId = res.locals.userId
    const { coinSymbol } = req.body
    const allCoins = await cryptoService.getCoinList(userId)
    const allSymbols = []
    allCoins.forEach((coin) => {
      allSymbols.push(coin.symbol)
    })
    console.log(allSymbols)
    if (!allSymbols.includes(coinSymbol))
      throw new BadInputError('Coin does not exist.')
    await cryptoService.addCoin(userId, coinSymbol)
    res.status(201).send('Coin added successfully')
  } catch (error) {
    res.status(error.statusCode).send({ Error: error.message })
    throw error
  }
}

module.exports = {
  getCoinList,
  getTopN,
  addCoin,
}
