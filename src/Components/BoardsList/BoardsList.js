import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

import BoardModal from "./BoardModal"
import Board from "../Board/Board"

class BoardsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boards: [],
            show: false
        }
        this.closeBoard = this.closeBoard.bind(this)
        this.deleteBoard = this.deleteBoard.bind(this)
    }

    async componentDidMount(){
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
            let boardsRes = await axios.get("/api/user-boards")
            this.setState({
                boards: boardsRes.data
            })
        }catch(err) {
            if(err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }
    }

    AddBoard() {
        this.setState({
            show: true
        })
    }

    closeBoard() {
        this.setState({
            show: false
        })
    }

    async deleteBoard(boardId) {
        let boardRes = await axios.delete(`/api/board/${boardId}`)
        console.log(boardRes.data)
        this.setState({
            boards: boardRes.data
        })
    }

    render() {
        if(this.state.boards) {
            var board = this.state.boards.map(board => {
                return (
                    <Board key={board.board_id} board={board} deleteBoard={this.deleteBoard} />
                )
            })
        }
        return (
            <div>
                {board}
                <button onClick={() => this.AddBoard()}>Add board</button>
                <BoardModal show={this.state.show} closeBoard={this.closeBoard}/>
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