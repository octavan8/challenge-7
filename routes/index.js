const app = require("express").Router()

const userControlles = require("../controllers/userControllers")

app.post("/register", userControlles.handleRegister)
app.post("/login", userControlles.handleLogin)

module.exports = app