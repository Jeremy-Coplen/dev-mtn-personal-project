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
            <div className="archived_board">
                <img src={archivedBoard.board_image} alt="board"/>
                <h1>{archivedBoard.board_name}</h1>
                <h2>type: {archivedBoard.board_type}</h2>
                <div className="restore_delete_button" onClick={() => this.props.restoreBoard(this.state.archivedBoard.board_id)}>Restore</div>
                <div className="restore_delete_button" onClick={() => this.props.deleteBoard(archivedBoard.board_id)}>Delete</div>
            </div>
        )
    }
}

export default ArchivedBoard