require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")

const c = require("./Controllers/controller")

const app = express()
app.use(express.json())

const {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING,
    ENVIRONMENT
} = process.env

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    if(ENVIRONMENT === "dev") {
        req.app.get("db").set_data().then(userData => {
            req.session.user = userData[0]
            next()
        })
    }
    else {
        next()
    }
})

app.get("/auth/callback", c.login)
app.get("/api/user-data", c.getUserData)
app.get("/logout", c.logout)
app.get("/api/user-boards", c.getUserBoards)
app.get("/api/board-cards/:userid/:boardid", c.getBoardInfo)
app.get("/api/tasks/:cardid", c.getTaskInfo)
app.post("/api/board", c.createBoard)
app.post("/api/card", c.createCard)
app.post("/api/task", c.createTask)
app.put("/api/board-image/:boardid", c.updateBoardImage)
app.put("/api/board-name/:boardid", c.updateBoardName)
app.put("/api/board-type/:boardid", c.updateBoardType)
app.put("/api/card-name/:cardid", c.updateCardName)
app.put("/api/task-name/:taskid", c.updateTaskName)
app.put("/api/task-details/:taskid", c.updateTaskDetails)
app.put("/api/task-archived/:taskid", c.updateTaskArchived)
app.delete("/api/board/:boardid", c.deleteBoard)

massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
}).catch(err => console.log(err))