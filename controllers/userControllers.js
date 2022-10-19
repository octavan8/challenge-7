const bcrypt = require("bcrypt")
require('dotenv').config()
const saltRounds = process.env.SALTROUNDS
const toNumber = +saltRounds
const {User} = require("../models")

class UserControllers {
    static async handleRegister (req,res) {
        try {
            const {fullname, username, password, role} = req.body

            const salt = bcrypt.genSaltSync(toNumber)
            const hash = bcrypt.hashSync(password, salt)

            const inputan = {
                fullname,
                username,
                password: hash,
                role
            }

            const result = await User.create(inputan)
            res.status(201).json({
                message: "Berhasil ditambah"
            })
            
        } catch (error) {
            console.log(error, "masih error")
        }
        
    }

    static async handleLogin (req, res) {
        
        try {
            const result = await User.authenticate(req.body)
            // console.log(result.dataValues);
            const result2 = await User.generateToken(req.body)
            res.status(200).json({token: result2})
        } catch (error) {
            console.log(error, "masih error")
        }
    }
}

module.exports = UserControllers