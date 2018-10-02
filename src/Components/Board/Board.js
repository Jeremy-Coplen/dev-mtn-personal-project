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
            <div className="board">
                <Link to={`/board/${board.board_id}`}>
                    <div className="board_content">
                        <img className="board_image" src={board.board_image} alt="board"/>
                        <h1 className="board_name">{board.board_name}</h1>
                        <h2 className="board_name">type: {board.board_type}</h2>
                    </div>
                </Link>
                <div className="recycle_button" onClick={() => this.props.recycleBoard(board.board_id)}>Recycle</div>
            </div>
        )
    }
}

export default Board