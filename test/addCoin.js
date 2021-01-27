const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const db = require('../models')

chai.use(chaiHttp)
const url = 'http://localhost:4000'

let token, userId

describe('Adds new cryptocurrency: ', () => {
  before('clears the User table', async function () {
    return await db.sequelize.models.User.destroy({ where: {}, force: true })
  })

  before('clears the UserCrypto table', async function () {
    return await db.sequelize.models.UserCrypto.destroy({
      where: {},
      force: true,
    })
  })

  before('register user', async function () {
    return await db.sequelize.models.User.create({
      name: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      password: 'password123',
      favoriteCurrency: 'usd',
    })
  })

  before('logs in new user', function (done) {
    chai
      .request(url)
      .post('/users/login')
      .send({ username: 'janedoe', password: 'password123' })
      .end(function (err, res) {
        token = JSON.parse(res.text).token
        done()
      })
  })

  before('saves userId', function (done) {
    db.sequelize.models.User.findOne({
      where: { username: 'janedoe' },
    }).then((data) => {
      userId = data.dataValues.id
      done()
    })
  })

  it('it should add coins to the database', function (done) {
    chai
      .request(url)
      .post('/crypto/addCoin')
      .set('Authorization', `Bearer ${token}`)
      .send({ userId, coinSymbol: 'btc' })
      .end(function (err, res) {
        expect(res).to.have.status(201)
        done()
      })
  })

  after('clears the User table', async function () {
    return await db.sequelize.models.User.destroy({ where: {}, force: true })
  })

  after('clears the UserCrypto table', async function () {
    return await db.sequelize.models.UserCrypto.destroy({
      where: {},
      force: true,
    })
  })
})
