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
app.get("/api/last-board-viewed/:boardid", c.getLastBoardViewed)
app.get("/api/user-boards", c.getUserBoards)
app.get("/api/board-cards/:boardid", c.getBoardInfo)
app.get("/api/tasks/:cardid", c.getTaskInfo)
app.get("/api/user-archived-boards", c.getUserArchivedBoards)
app.get("/api/archived-cards/:boardid", c.getArchivedCards)
app.get("/api/archived-tasks/:boardid", c.getArchivedTasks)
app.post("/api/board", c.createBoard)
app.post("/api/card", c.createCard)
app.post("/api/task", c.createTask)
app.put("/api/last-board-viewed", c.updateLastBoardViewed)
app.put("/api/board-image", c.updateBoardImage)
app.put("/api/board-name", c.updateBoardName)
app.put("/api/board-type", c.updateBoardType)
app.put("/api/card-name", c.updateCardName)
app.put("/api/task-name", c.updateTaskName)
app.put("/api/task-details", c.updateTaskDetails)
app.put("/api/board-archived", c.updateBoardArchived)
app.put("/api/card-archived", c.updateCardArchived)
app.put("/api/task-archived", c.updateTaskArchived)
app.delete("/api/board/:boardid", c.deleteBoard)
app.delete("/api/card/:boardid/:cardid", c.deleteCard)
app.delete("/api/task/:boardid/:taskid", c.deleteTask)
massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
}).catch(err => console.log(err))