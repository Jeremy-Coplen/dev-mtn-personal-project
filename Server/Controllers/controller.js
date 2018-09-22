require("dotenv").config()
const axios = require('axios')

const {
    REACT_APP_CLIENT_ID,
    REACT_APP_DOMAIN,
    CLIENT_SECRET
} = process.env

module.exports = {
    login: async (req, res) => {
        const db = req.app.get("db")
        const { code } = req.query

        const payload = {
            client_id: REACT_APP_CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
            grant_type: "authorization_code",
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }

        try {
            let tokenRes = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
            let userRes = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${tokenRes.data.access_token}`)

            const { email, name, picture, sub } = userRes.data
            let foundUser = await db.find_user([sub])
            if(foundUser[0]) {
                req.session.user = foundUser[0]
            } 
            else {
                let createdUser = await db.create_user([name, email, picture, sub])
                req.session.user = createdUser[0]
            }
            console.log()

        }catch(err) {
            console.log(err)
        }
        res.redirect("/#/dashboard")
    },

    logout: (req, res) => {
        req.session.destroy()
        try {
            res.redirect("http://localhost:3000/#/")
        }catch(err){
            console.log(err)
        }
        
    },

    getUserData: (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
        } 
        else {
            res.status(401).send("Go login")
        }
    },

    getUserBoards: async (req, res) => {
        const db = req.app.get("db")

        try {
            let boardsRes = await db.get_user_boards([req.session.user.user_id])
            res.status(200).send(boardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    getBoardInfo: async (req, res) => {
        const db = req.app.get("db")
        const results = []
        try {
            let boardRes = await db.get_one_board([Number(req.params.boardid), Number(req.params.userid)])
            results.push(boardRes[0])
            let cardsRes = await db.get_board_cards([Number(req.params.boardid)])
            results.push(cardsRes)
            res.status(200).send(results)
        }catch(err) {
            console.log(err)
        }
    },

    getTaskInfo: async (req, res) => {
        const db = req.app.get("db")

        try{
            let tasksRes = await db.get_card_tasks([Number(req.params.cardid)])
            res.status(200).send(tasksRes)
        }catch(err) {
            console.log(err)
        }
    },

    createBoard: async (req, res) => {
        const db = req.app.get("db")
        const { name, type, userId, image } = req.body

        try{
            let boardId = await db.create_board([name, type, userId, image])
            res.status(200).send(boardId[0].board_id.toString())
        }catch(err) {
            console.log(err)
        }
    },

    createCard: async (req, res) => {
        const db = req.app.get("db")
        const {boardId, name} = req.body

        try{
            let card = await db.create_card([boardId, name])
            res.status(200).send(card[0])
        }catch(err) {
            console.log(err)
        }
    },

    createTask: async (req, res) => {
        const db = req.app.get("db")
        const { name, cardId } = req.body

        try{
            let task = await db.create_task([name, cardId, `${name} Details`])
            res.status(200).send(task[0])
        }catch(err) {
            console.log(err)
        }
    },

    updateBoardImage: (req, res) => {
        const db = req.app.get("db")

        db.update_board_image([req.body.image, Number(req.params.boardid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateBoardName: (req, res) => {
        const db = req.app.get("db")

        db.update_board_name([req.body.name, Number(req.params.boardid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateBoardType: (req, res) => {
        const db = req.app.get("db")

        db.update_board_type([req.body.type, Number(req.params.boardid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateCardName: (req, res) => {
        const db = req.app.get("db")

        db.update_card_name([req.body.name, Number(req.params.cardid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateTaskName: (req, res) => {
        const db = req.app.get("db")

        db.update_task_name([req.body.name, Number(req.params.taskid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateTaskDetails: (req, res) => {
        const db = req.app.get("db")

        db.update_task_details([req.body.details, Number(req.params.taskid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateTaskArchived: (req, res) => {
        const db = req.app.get("db")
        
        db.update_task_archived([req.body.archived, Number(req.params.taskid)])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    }
}