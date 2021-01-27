const express = require('express')
const router = express.Router()
const cryptoController = require('./../controllers/crypto')
const { authenticate, identifyUser } = require('./../middleware')

router
  .route('/coins')
  .get(authenticate, identifyUser, cryptoController.getCoinList)
router
  .route('/top/:n/:order')
  .get(authenticate, identifyUser, cryptoController.getTopN)
router
  .route('/addCoin')
  .post(authenticate, identifyUser, cryptoController.addCoin)

module.exports = router
