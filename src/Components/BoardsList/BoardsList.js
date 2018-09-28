import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

import Board from "../Board/Board"
import BoardModal from "./BoardModal"
import BoardsRecyclingBinModal from "../BoardsRecyclingBinModal/BoardsRecyclingBinModal"

class BoardsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boards: [],
            boardShow: false,
            recycleShow: false
        }
        this.updateBoardShow = this.updateBoardShow.bind(this)
        this.updateRecycleShow = this.updateRecycleShow.bind(this)
        this.recycleBoard = this.recycleBoard.bind(this)
        this.restoreBoard = this.restoreBoard.bind(this)
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

    updateBoardShow() {
        this.setState({
            boardShow: !this.state.boardShow
        })
    }

    updateRecycleShow() {
        this.setState({
            recycleShow: !this.state.recycleShow
        })
    }

    async recycleBoard(boardId) {
        try{
            let boardsRes = await axios.put("/api/board-archived", { archived: true, boardId, type: false})
            this.setState({
                boards: boardsRes.data
            })
        }catch(err) {
            console.log(err)
        }
    }

    async restoreBoard() {
        try{
            let boardsRes = await axios.get("/api/user-boards")
            this.setState({
                boards: boardsRes.data
            })
        }catch(err) {
            console.log(err)
        }
    }

    render() {
        if(this.state.boards) {
            var board = this.state.boards.map(board => {
                return (
                    <Board key={board.board_id} board={board} recycleBoard={this.recycleBoard} />
                )
            })
        }
        return (
            <div>
                <button onClick={this.updateRecycleShow}>Recycling Bin</button>
                {board}
                <button onClick={this.updateBoardShow}>Add board</button>
                <BoardModal show={this.state.boardShow} updateShow={this.updateBoardShow}/>
                <BoardsRecyclingBinModal show={this.state.recycleShow} updateShow={this.updateRecycleShow} restoreBoard={this.restoreBoard} />
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