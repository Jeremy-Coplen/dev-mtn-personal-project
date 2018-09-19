import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

class BoardsList extends Component {
    async componentDidMount(){
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
            let boardsRes = await axios.get("/api/user-boards")
            this.props.getUserData(boardsRes.data)
        }catch(err) {
            if(err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }
    }


    render() {
        console.log(this.props.user)
        const { boards } = this.props.user
        return (
            <div>
                {
                    boards
                    ?
                        boards.map(board => {
                            return (
                                <Link to={`/board/${board.b_id}`} key={board.b_id}>
                                    <div>
                                        <img src={board.board_image} alt="board"/>
                                        <h2>{board.name}</h2>
                                        <h2>type: {board.board_type}</h2>
                                    </div>
                                </Link>
                            )
                        })
                    :
                        <h1>Loading...</h1>
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

export default connected(BoardsList)