const jest = require('jest')
const db = require('../models')

jest.mock(db, () => {
  const Sequelize = jest.fn()
})

db.describe('Login: ', () => {
  before('clears the User table', async function () {
    return await db.sequelize.models.User.destroy({ where: {}, force: true })
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

  it('should return a token', (done) => {
    chai
      .request(url)
      .post('/login')
      .send({ username: 'janedoe', password: 'password123' })
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(JSON.parse(res.text)).to.have.property('token')
        expect(JSON.parse(res.text).token).to.be.string
        done()
      })
  })

  it('should return invalid username and no token', (done) => {
    chai
      .request(url)
      .post('/login')
      .send({ username: 'invalidusername', password: 'password123' })
      .end(function (err, res) {
        expect(res).to.have.status(400)
        expect(res.text).to.not.include('token')
        expect(res).to.be.json
        expect(res.text).to.be.equal(
          '{"Error":"The entered username cannot be found"}'
        )
        done()
      })
  })

  it('should return invalid password and no token', (done) => {
    chai
      .request(url)
      .post('/login')
      .send({ username: 'janedoe', password: 'invalidpassword' })
      .end(function (err, res) {
        expect(res).to.have.status(401)
        expect(res.text).to.not.include('token')
        expect(res).to.be.json
        expect(res.text).to.be.equal('{"Error":"Invalid password"}')
        done()
      })
  })

  after('clears the User table', async function () {
    return await db.sequelize.models.User.destroy({ where: {}, force: true })
  })
})
