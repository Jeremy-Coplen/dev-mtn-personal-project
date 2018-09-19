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
            req.session.user.boards = boardsRes
            res.status(200).send(req.session.user)
        }catch(err) {
            console.log(err)
        }
    },

    getBoardCardInfo: async (req, res) => {
        const db = req.app.get("db")
        const results = []

        try {
            let boardRes = await db.get_one_board([Number(req.params.userid), Number(req.params.boardid)])
            results.push({type: "board", data: boardRes})
            let cardsRes = await db.get_board_cards([Number(req.params.boardid)])
            results.push({type: "cards", data: cardsRes})
            res.status(200).send(results)
        }catch(err) {
            console.log(err)
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        try {
            res.redirect("http://localhost:3000/#/")
        }catch(err){
            console.log(err)
        }
        
    }
}