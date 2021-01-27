'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserCrypto)
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      favoriteCurrency: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    }
  )
  return User
}
