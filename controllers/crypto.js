const cryptoService = require('./../services/crypto/crypto')

const getCoinList = async (req, res, next) => {
  try {
    const { userId } = res.locals
    const coinList = await cryptoService.getCoinList(userId)
    res.send(coinList)
  } catch (error) {
    res.status(error.statusCode).send({ Error: error.message })
    next(error)
  }
}

const getTopN = async (req, res, next) => {
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
    next(error)
  }
}

const addCoin = async (req, res, next) => {
  try {
    const userId = res.locals.userId
    const { coinSymbol } = req.body
    await cryptoService.addCoin(userId, coinSymbol)
    res.status(201).send('Coin added successfully')
  } catch (error) {
    res.status(error.statusCode).send({ Error: error.message })
    next(error)
  }
}

module.exports = {
  getCoinList,
  getTopN,
  addCoin,
}
