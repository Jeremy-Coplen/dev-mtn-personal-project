import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boardInfo: {},
            cardInfo: {}
        }
    }


    async componentDidMount() {
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
        }catch(err) {
            if(err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }

        try{
            let boardCardRes = await axios.get(`/api/board-cards/${this.props.user.user_id}/${this.props.match.params.boardid}`)
            this.setState({
                boardInfo: boardCardRes.data[0],
                cardInfo: boardCardRes.data[1]
            })
        }catch(err) {
            console.log(err)
        }
    }

    render() {
        console.log(this.state.cardInfo)
        return (
            <div>
                {
                    this.state.boardInfo.data
                    ?
                        <div>
                            <img src={this.state.boardInfo.data[0].board_image} alt=""/>
                            <h1>{this.state.boardInfo.data[0].board_name}</h1>
                            <h1>{this.state.boardInfo.data[0].board_type}</h1>
                        </div>
                    :
                        null
                }
                {
                    this.state.cardInfo.data
                    ?
                        <div>
                            {
                                this.state.cardInfo.data.map(card => {
                                    return (
                                        <div key={card.card_id}>
                                            <h2>{card.card_name}</h2>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    :
                        null
                }
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