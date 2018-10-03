import React, { Component } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"

import { connect } from "react-redux"

class BoardModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            type: "",
            image: ""
        }
        this.updateInput = this.updateInput.bind(this)
        this.handleSelection = this.handleSelection.bind(this)
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelection(e) {
        this.setState({
            type: e.target.value,
        })
    }

    async createBoard(name, type, userId, image) {
        const defaultCards = ["To Do Eventually", "To Do Today", "Done"]
        if (!image) {
            image = "https://rajshankar.files.wordpress.com/2013/07/to-do-list1.png"
        }
        if (!type) {
            type = "Personal"
        }
        if (!name) {
            name = "Board Name"
        }
        try {
            let boardId = await axios.post("/api/board", { name, type, userId, image, defaultCards })
            this.props.history.push(`/board/${boardId.data}`)
        } catch (err) {
            console.log(err)
        }
    }

    close() {
        this.setState({
            name: "",
            type: "",
            image: ""
        })
        this.props.updateShow()
    }

    render() {
        const showHideClassName = this.props.show ? "board_display" : "board_display_none"
        return (
            <div className={showHideClassName}>
                <div className="board_modal_content">
                    <div className="close_button" onClick={() => this.close()}>X</div>
                    <div className="board_modal_input">
                        <h1>Board Info:</h1>
                        <input type="text"
                            placeholder="Enter Board Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.updateInput} />
                        <input type="text"
                            placeholder="Enter Image URL"
                            name="image"
                            value={this.state.image}
                            onChange={this.updateInput} />
                        <select onChange={this.handleSelection}>
                            <option value="Personal">Personal</option>
                            <option value="Team">Team</option>
                        </select>
                    </div>
                    <div className="confirm_button" onClick={() => this.createBoard(this.state.name, this.state.type, this.props.user.user_id, this.state.image)}>Confirm</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(BoardModal))