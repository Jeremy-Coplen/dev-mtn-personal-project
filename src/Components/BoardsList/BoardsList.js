import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

import BoardModal from "./BoardModal"

class BoardsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            boards: [],
            show: false
        }
        this.closeBoard = this.closeBoard.bind(this)
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

    render() {
        return (
            <div>
                {
                    this.state.boards
                    ?
                        this.state.boards.map(board => {
                            return (
                                <Link to={`/board/${board.board_id}`} key={board.board_id}>
                                    <div>
                                        <img src={board.board_image} alt="board"/>
                                        <h2>{board.board_name}</h2>
                                        <h2>type: {board.board_type}</h2>
                                    </div>
                                </Link>
                            )
                        })
                    :
                        <h1>Loading...</h1>
                }
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