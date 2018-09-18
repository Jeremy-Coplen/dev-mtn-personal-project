require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")

const app = express()
app.use(express.json())

const {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING
} = process.env

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
}).catch(err => console.log(err))