const express = require("express")
const session = require("express-session")
const flash = require("express-flash")
const route = require("./routes")
const app = express()
const port = 6060

require('dotenv').config()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false

}))

app.use(flash())

app.use(route)

app.listen(port, () => {
    console.log("Server Nyala di "+ port);
})