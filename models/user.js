'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt")
require('dotenv').config()
const jwt = require("jsonwebtoken")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    //Check compare password dengan yang ditabase
    checkPassword = password => bcrypt.compareSync(password, this.password)
    /* Method Authenticate, untuk login */
    static authenticate = async ({ username, password }) => {
      try {
          const user = await this.findOne({ where: { username }})
          if (!user) return Promise.reject("User not found!")
          const isPasswordValid = user.checkPassword(password)
          if (!isPasswordValid) return Promise.reject("Wrong password")
          return Promise.resolve(user)
      }
      catch(err) {
          return Promise.reject(err)
      }
    }

    static generateToken = ({fullname, username, role}) => {
      // Jangan memasukkan password ke dalam payload
      const payload = {
      fullname,
      username,
      role
      }
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const rahasia = process.env.SECRETPAY
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, rahasia, {expiresIn: '24h'})
      // console.log(payload);
      return token;
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};