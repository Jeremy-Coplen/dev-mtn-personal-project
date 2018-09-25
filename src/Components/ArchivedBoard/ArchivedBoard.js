import React, { Component } from "react"

class ArchivedBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            archivedBoard: this.props.archivedBoard
        }
    }

    render() {
        const { archivedBoard } = this.state
        return (
            <div>
                <img src={archivedBoard.board_image} alt="board"/>
                <h1>{archivedBoard.board_name}</h1>
                <h2>type: {archivedBoard.board_type}</h2>
                <button onClick={() => this.props.restoreBoard(this.state.archivedBoard.board_id)}>Restore</button>
                <button>Delete</button>
            </div>
        )
    }
}

export default ArchivedBoard