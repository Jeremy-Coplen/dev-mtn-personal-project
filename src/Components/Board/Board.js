import React, { Component } from "react"
import { Link } from "react-router-dom"

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            board: this.props.board
        }
    }

    render() {
        const { board } = this.state
        return (
            <div>
                <Link to={`/board/${board.board_id}`}>
                    <div>
                        <img src={board.board_image} alt="board"/>
                        <h1>{board.board_name}</h1>
                        <h2>type: {board.board_type}</h2>
                    </div>
                </Link>
                <button onClick={() => this.props.deleteBoard(board.board_id)}>X</button>
            </div>
        )
    }
}

export default Board