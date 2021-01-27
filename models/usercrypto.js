'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserCrypto extends Model {}
  UserCrypto.init(
    {
      userId: DataTypes.INTEGER,
      symbol: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserCrypto',
      timestamps: false,
    }
  )
  return UserCrypto
}
