import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

import Card from "../Card/Card"

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardInfo: {},
            cardInfo: []
        }
    }


    async componentDidMount() {
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
        } catch (err) {
            if (err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }

        try {
            let boardRes = await axios.get(`/api/board-cards/${this.props.user.user_id}/${this.props.match.params.boardid}`)
            this.setState({
                boardInfo: boardRes.data[0],
                cardInfo: boardRes.data[1]
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        if(this.state.cardInfo) {
          var card = this.state.cardInfo.map((card, i) => {
                return (
                    <Card key={i} card={card}/>
                )
            })
        }
        return (
            <div>
                {
                    this.state.boardInfo
                        ?
                        <div>
                            <img src={this.state.boardInfo.board_image} alt="board" />
                            <h1>{this.state.boardInfo.board_name}</h1>
                            <h1>{this.state.boardInfo.board_type}</h1>
                        </div>
                        :
                        null
                }
                {card}
                <button>Add Card</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const actionOutputs = {
    getUserData: getUserData
}

const connected = connect(mapStateToProps, actionOutputs)

export default connected(Board)