const axios = require('axios')
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

const getCoins = async () => {
  try {
    const { data } = await axios.get(`${COINGECKO_API_URL}/coins`)
    return data
  } catch (error) {
    throw error
  }
}

module.exports = { getCoins }
