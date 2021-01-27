const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const db = require('../models')

chai.use(chaiHttp)
const url = 'http://localhost:4000/users'

describe('Create a new user: ', () => {
  before('clears the User table', async function () {
    return await db.sequelize.models.User.destroy({ where: {}, force: true })
  })

  it('should insert a new user into the database', (done) => {
    chai
      .request(url)
      .post('/register')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        password: 'abcd1234',
        favoriteCurrency: 'usd',
      })
      .end(function (err, res) {
        expect(res).to.have.status(201)
        done()
      })
  })

  it('should should return a missing data error', (done) => {
    chai
      .request(url)
      .post('/register')
      .send()
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res).to.be.json
        expect(res.text).to.be.equal(
          '{"Error":"The request is missing some data"}'
        )
        done()
      })
  })

  it('should should return currency not allowed error', (done) => {
    chai
      .request(url)
      .post('/register')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        password: 'abcd1234',
        favoriteCurrency: 'aaa',
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res).to.be.json
        expect(res.text).to.be.equal('{"Error":"Currency not allowed"}')
        done()
      })
  })

  it('should should return user already exists error', (done) => {
    chai
      .request(url)
      .post('/register')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        password: 'abcd1234',
        favoriteCurrency: 'usd',
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res).to.be.json
        expect(res.text).to.be.equal('{"Error":"The username already exists"}')
        done()
      })
  })

  it('should should return password is not alphanumeric error', (done) => {
    chai
      .request(url)
      .post('/register')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        password: '*********',
        favoriteCurrency: 'usd',
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.text).to.be.equal(
          '{"Error":"Password should be more than 8 alphanumieric characters"}'
        )
        done()
      })
  })

  it('should should return password is less than 8 digits long error', (done) => {
    chai
      .request(url)
      .post('/register')
      .send({
        name: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        password: 'pass12',
        favoriteCurrency: 'usd',
      })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.text).to.be.equal(
          '{"Error":"Password should be more than 8 alphanumieric characters"}'
        )
        done()
      })
  })

  after('clears the User table', async function () {
    return await db.sequelize.models.User.destroy({ where: {}, force: true })
  })
})
