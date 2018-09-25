import React, { Component } from "react"
import axios from "axios"

import ArchivedBoard from "../ArchivedBoard/ArchivedBoard"

class BoardsRecyclingBinModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            archivedBoards: []
        }
        this.restoreBoard = this.restoreBoard.bind(this)
    }

    async componentDidMount() {
            try {
                let boardsRes = await axios.get("/api/user-archived-boards")
                this.setState({
                    archivedBoards: boardsRes.data
                })
            } catch (err) {
                console.log(err)
            }
    }

    async restoreBoard(boardId) {
        try {
            let boardsRes = await axios.put("/api/board-archived", { archived: false, boardId, type: true })
            console.log(boardsRes.data)
            this.setState({
                archivedBoards: boardsRes.data
            })
            this.props.restoreBoard()
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        if (this.state.archivedBoards) {
            var archivedBoards = this.state.archivedBoards.map(archivedBoard => {
                return (
                    <ArchivedBoard key={archivedBoard.board_id} archivedBoard={archivedBoard} restoreBoard={this.restoreBoard} />
                )
            })
        }
        const showHideClassName = this.props.show ? "recycling_bin_display" : "recycling_bin_display_none"
        return (
            <div className={showHideClassName}>
                <div>
                    <button onClick={() => this.props.updateShow()}>Close</button>
                    {archivedBoards}
                </div>
            </div>
        )
    }
}

export default BoardsRecyclingBinModal