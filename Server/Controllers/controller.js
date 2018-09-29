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

    getLastBoardViewed: async (req, res) => {
        const db = req.app.get("db")

        try {
            let boardRes = await db.get_one_board([Number(req.params.boardid), req.session.user.user_id])
            res.status(200).send(boardRes[0])
        }catch(err) {
            console.log(err)
        }
    },

    getUserBoards: async (req, res) => {
        const db = req.app.get("db")

        try {
            let boardsRes = await db.get_user_boards([req.session.user.user_id, false])
            res.status(200).send(boardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    getUserArchivedBoards: async (req, res) => {
        const db = req.app.get("db")

        try{
            let boardsRes = await db.get_user_boards([req.session.user.user_id, true])
            res.status(200).send(boardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    getArchivedCards: async (req, res) => {
        const db = req.app.get("db")

        try{
            let cardsRes = await db.get_board_cards([Number(req.params.boardid), true])
            res.status(200).send(cardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    getArchivedTasks: async (req, res) => {
        const db = req.app.get("db")

        try{
            let tasksRes = await db.get_archived_tasks([Number(req.params.boardid)])
            res.status(200).send(tasksRes)
        }catch(err) {
            console.log(err)
        }
    },

    getBoardInfo: async (req, res) => {
        const db = req.app.get("db")
        const results = []
        try {
            let boardRes = await db.get_one_board([Number(req.params.boardid), req.session.user.user_id])
            results.push(boardRes[0])
            let cardsRes = await db.get_board_cards([Number(req.params.boardid), false])
            results.push(cardsRes)
            res.status(200).send(results)
        }catch(err) {
            console.log(err)
        }
    },

    getTaskInfo: async (req, res) => {
        const db = req.app.get("db")

        try{
            let tasksRes = await db.get_card_tasks([Number(req.params.cardid), false])
            res.status(200).send(tasksRes)
        }catch(err) {
            console.log(err)
        }
    },

    createBoard: async (req, res) => {
        const db = req.app.get("db")
        const { name, type, userId, image, defaultCards } = req.body

        try{
            let boardId = await db.create_board([name, type, userId, image])
            await db.create_default_cards([boardId[0].board_id, defaultCards[0], boardId[0].board_id, defaultCards[1], boardId[0].board_id, defaultCards[2]])
            await db.add_to_boards_users([boardId[0].board_id, userId])
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
        const { image, boardId } = req.body

        db.update_board_image([image, boardId])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateBoardName: (req, res) => {
        const db = req.app.get("db")
        const { name, boardId } = req.body

        db.update_board_name([name, boardId])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateBoardType: (req, res) => {
        const db = req.app.get("db")
        const { type, boardId } = req.body

        db.update_board_type([type, boardId])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateCardName: (req, res) => {
        const db = req.app.get("db")
        const { name, cardId } = req.body

        db.update_card_name([name, cardId])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateTaskName: (req, res) => {
        const db = req.app.get("db")
        const { name, taskId } = req.body

        db.update_task_name([name, taskId])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateTaskDetails: (req, res) => {
        const db = req.app.get("db")
        const { details, taskId } = req.body

        db.update_task_details([details, taskId])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateLastBoardViewed: (req, res) => {
        const db = req.app.get("db")
        const { boardId } = req.body

        db.update_last_board_viewed([boardId, req.session.user.user_id])
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },

    updateBoardArchived: async (req, res) => {
        const db = req.app.get("db")
        const { archived, boardId, type } = req.body

        try{
            await db.update_board_archived([archived, boardId])
            let boardsRes = await db.get_user_boards([req.session.user.user_id, type])
            res.status(200).send(boardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    updateCardArchived: async (req, res) => {
        const db = req.app.get("db")
        const { archived, cardId, boardId, type } = req.body

        try{
            await db.update_card_archived([archived, cardId])
            let cardsRes = await db.get_board_cards([boardId, type])
            res.status(200).send(cardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    updateTaskArchived: async (req, res) => {
        const db = req.app.get("db")
        const { archived, taskId, cardId, type, boardId } = req.body
        
        try{
            await db.update_task_archived([archived, taskId])
            if(cardId) {
                let tasksRes = await db.get_card_tasks([cardId, type])
                res.status(200).send(tasksRes)
            }
            else if(boardId) {
                let tasksRes = await db.get_archived_tasks([boardId])
                res.status(200).send(tasksRes)
            }
        }catch(err) {
            console.log(err)
        }
        
    },

    deleteBoard: async (req, res) => {
        const db = req.app.get("db")

        try {
            await db.delete_board([Number(req.params.boardid)])
            let boardsRes = await db.get_user_boards([req.session.user.user_id, true])
            res.status(200).send(boardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    deleteCard: async (req, res) => {
        const db = req.app.get("db")

        try {
            await db.delete_card([Number(req.params.cardid)])
            let cardsRes = await db.get_board_cards([Number(req.params.boardid), true])
            res.status(200).send(cardsRes)
        }catch(err) {
            console.log(err)
        }
    },

    deleteTask: async (req, res) => {
        const db = req.app.get("db")

        try {
            await db.delete_task([Number(req.params.taskid)])
            let tasksRes = await db.get_archived_tasks([Number(req.params.boardid)])
            res.status(200).send(tasksRes)
        }catch(err) {
            console.log(err)
        }
    }
}