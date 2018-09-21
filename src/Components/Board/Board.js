import React, { Component } from "react"
import axios from "axios"

import { connect } from "react-redux"
import { getUserData } from "../../Ducks/reducer"

import Card from "../Card/Card"

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cardInfo: [],
            boardImage: "",
            boardName: "",
            boardType: "",
            editingImage: false,
            editingName: false,
            editingType: false
        }
        this.updateEditing = this.updateEditing.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.handleSelection = this.handleSelection.bind(this)
    }


    async componentDidMount() {
        try {
            let userRes = await axios.get("/api/user-data")
            this.props.getUserData(userRes.data)
        } catch (err) {
            if (err.response.status === 401) {
                alert("Go Login")
                this.props.history.push("/")
            }
        }

        try {
            let boardRes = await axios.get(`/api/board-cards/${this.props.user.user_id}/${this.props.match.params.boardid}`)
            this.setState({
                cardInfo: boardRes.data[1],
                boardImage: boardRes.data[0].board_image,
                boardName: boardRes.data[0].board_name,
                boardType: boardRes.data[0].board_type
            })
        } catch (err) {
            console.log(err)
        }
    }

    updateEditing(e) {

        this.setState({
            [e.target.name]: true
        })
    }

    updateInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleKeyPress(e, edit, value) {
        if (e.key === "Enter" && this.state[e.target.name].length > 0) {
            this.setState({
                [edit]: false
            })
            if(e.target.name === "boardImage") {
                axios.put(`/api/board-image/${this.props.match.params.boardid}`, {image: value})
            }
            else if(e.target.name === "boardName") {
                axios.put(`/api/board-name/${this.props.match.params.boardid}`, {name: value})
            }
            else if(e.target.name === "boardType") {
                axios.put(`/api/board-type/${this.props.match.params.boardid}`, {type: value})
            }
        }
    }

    handleSelection(e) {
        this.setState({
            boardType: e.target.value,
            editingType: false
        })
        axios.put(`/api/board-type/${this.props.match.params.boardid}`, {type: e.target.value})
    }

    render() {
        if (this.state.cardInfo) {
            var card = this.state.cardInfo.map((card, i) => {
                return (
                    <Card key={i} card={card} />
                )
            })
        }
        return (
            <div>
                <div>
                    {
                        this.state.editingImage
                            ?
                            <input type="text"
                                name="boardImage"
                                value={this.state.boardImage}
                                onChange={this.updateInput}
                                onKeyPress={(e) => this.handleKeyPress(e, "editingImage", this.state.boardImage)} />
                            :
                            <img src={this.state.boardImage}
                                alt="board"
                                name="editingImage"
                                onClick={this.updateEditing} />
                    }
                    {
                        this.state.editingName
                            ?
                            <input type="text" 
                            name="boardName"
                            value={this.state.boardName}
                            onChange={this.updateInput} 
                            onKeyPress={(e) => this.handleKeyPress(e, "editingName", this.state.boardName)}/>
                            :
                            <button
                            name="editingName"
                            onClick={this.updateEditing}>{this.state.boardName}</button>
                    }
                    {
                        this.state.editingType
                            ?
                            <select value={this.state.boardType} onChange={this.handleSelection} >
                                <option value="Personal">Personal</option>
                                <option value="Team">Team</option>
                            </select>
                            :
                            <button
                            name="editingType"
                            onClick={this.updateEditing}>{this.state.boardType}</button>
                    }
                </div>
                {card}
                <button>Add Card</button>
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

export default connected(Board)