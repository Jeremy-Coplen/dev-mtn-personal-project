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
        this.deleteBoard = this.deleteBoard.bind(this)
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

    async componentDidUpdate(prevprops) {
        if (prevprops.show !== this.props.show) {
            try {
                let boardsRes = await axios.get("/api/user-archived-boards")
                this.setState({
                    archivedBoards: boardsRes.data
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    async restoreBoard(boardId) {
        try {
            let boardsRes = await axios.put("/api/board-archived", { archived: false, boardId, type: true })
            this.setState({
                archivedBoards: boardsRes.data
            })
            this.props.restoreBoard()
        } catch (err) {
            console.log(err)
        }
    }

    async deleteBoard(boardId) {
        try {
            let boardsRes = await axios.delete(`/api/board/${boardId}`)
            this.setState({
                archivedBoards: boardsRes.data
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        console.log(this.state.archivedBoards)
        if (this.state.archivedBoards) {
            var archivedBoards = this.state.archivedBoards.map(archivedBoard => {
                return (
                    <ArchivedBoard key={archivedBoard.board_id} archivedBoard={archivedBoard} restoreBoard={this.restoreBoard} deleteBoard={this.deleteBoard} />
                )
            })
        }
        const showHideClassName = this.props.show ? "recycling_bin_display" : "recycling_bin_display_none"
        return (
            <div className={showHideClassName}>
                <div className="recycling_bin_content">
                    <div className="close_button" onClick={() => this.props.updateShow()}>X</div>
                    {
                        this.state.archivedBoards.length !== 0
                        ?
                            <div className="archived_boards">
                                {archivedBoards}
                            </div>
                        :
                            <h1>Empty</h1>
                    }
                </div>
            </div>
        )
    }
}

export default BoardsRecyclingBinModal